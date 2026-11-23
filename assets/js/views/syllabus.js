// Study Material: the learner's GATE paper, subject → topic, with a week-by-week study plan, sub-topic checklists,
// progress tracking, offline key notes, AI-written study notes, an AI doubt solver and links to topic tests.
// (In code a syllabus topic is a "chapter" and its sub-topics are the chapter's "topics".)
import { S, commit, syllabusStats, chapterKey, isDoneStatus } from '../store.js';
import { icon } from '../icons.js';
import { esc, uid, dateKey, addDays, timeAgo, fmtDate, parseKey, daysBetween } from '../utils.js';
import { SUBJECTS, BRANCH, EXAM, chaptersOf, chapterById, subjectById, WEIGHT_LABEL, LIBRARY } from '../data.js';
import { chapterCount, subjectCount } from '../content.js';
import { runAI, hasAI, friendlyError, AIError } from '../ai.js';
import { toast, confirmDialog } from '../ui.js';
import { md } from '../md.js';
import { keyNotes, keyNotesMarkdown } from '../keynotes.js';

const STATUSES = [
  { id: '', label: 'Not started', color: 'var(--muted)' },
  { id: 'reading', label: 'Studying', color: 'var(--info)' },
  { id: 'done', label: 'Done', color: 'var(--good)' },
  { id: 'revised', label: 'Revised', color: 'var(--accent)' },
];
const statusOf = (id) => STATUSES.find((s) => s.id === (id || '')) || STATUSES[0];
const syl = () => S().syllabus;
const href = (sub, ch) => `#/syllabus?subject=${encodeURIComponent(sub)}${ch ? `&chapter=${encodeURIComponent(ch)}` : ''}`;
const WEIGHT_WORD = { H: 'High', M: 'Medium', L: 'Low' };
const LOADING_LINES = ['Going through the GATE syllabus…', 'Picking out exam-relevant concepts…', 'Collecting formulas and results…', 'Listing common traps…', 'Adding PYQ themes…', 'Writing a quick-revision box…'];

// Module-level so a generation keeps going (and is saved) if the user navigates away.
let generating = null; // { key, controller }
let lastError = null; // { key, message, code }
let doubt = { key: '', q: '', busy: false, answer: null, error: '' };

export function setStatus(sub, ch, status) {
  const k = chapterKey(sub, ch);
  const was = syl().status[k];
  if (status) syl().status[k] = status; else delete syl().status[k];
  syl().doneAt ||= {};
  if (isDoneStatus(status) && !isDoneStatus(was)) syl().doneAt[k] = Date.now();
  if (!isDoneStatus(status)) delete syl().doneAt[k];
}

function chStats(sub, c) {
  const k = chapterKey(sub, c.id);
  const done = c.topics.filter((t) => syl().topics?.[`${k}::${t}`]).length;
  return { k, done, total: c.topics.length, status: syl().status[k] || '' };
}

/* ---------------- Study plan ---------------- */
// Spreads the unfinished topics over the weeks left before the exam, leaving the final stretch for revision and
// practice papers. Subjects with more marks per topic, high-weightage topics and weak subjects come first.
export function buildPlan() {
  const today = parseKey(dateKey());
  const exam = parseKey(S().profile.examDate || EXAM.date);
  const daysLeft = Math.max(0, daysBetween(today, exam));
  const weeksLeft = Math.ceil(daysLeft / 7);
  const revisionWeeks = weeksLeft >= 12 ? 4 : weeksLeft >= 6 ? 2 : weeksLeft >= 2 ? 1 : 0;
  const learnWeeks = Math.max(1, weeksLeft - revisionWeeks);

  const acc = {};
  for (const q of S().quizzes) {
    for (const [k, v] of Object.entries(q.bySubject || {})) {
      acc[k] ||= { c: 0, t: 0 };
      acc[k].c += v.c || 0;
      acc[k].t += (v.c || 0) + (v.w || 0);
    }
  }
  const W = { H: 1.5, M: 1, L: 0.6 };
  const pending = [];
  SUBJECTS.forEach((s) => {
    const list = chaptersOf(s.id);
    const a = acc[s.id]?.t >= 3 ? acc[s.id].c / acc[s.id].t : null;
    const subjPriority = ((s.marks || 5) / list.length) * (a === null ? 1.2 : 1.6 - a);
    list.forEach((c, i) => {
      if (!isDoneStatus(syl().status[chapterKey(s.id, c.id)])) pending.push({ s, c, i, weak: a !== null && a < 0.6, priority: subjPriority * (W[c.weight] || 1) });
    });
  });
  // Keep a subject's topics together (in syllabus order) and order subjects by their best pending topic.
  const best = {};
  pending.forEach((x) => { best[x.s.id] = Math.max(best[x.s.id] || 0, x.priority); });
  pending.sort((x, y) => best[y.s.id] - best[x.s.id] || x.i - y.i);

  const perWeek = Math.max(1, Math.ceil(pending.length / learnWeeks));
  const weeks = [];
  for (let w = 0; w * perWeek < pending.length; w++) {
    const start = addDays(today, w * 7);
    const end = addDays(start, 6) > exam ? exam : addDays(start, 6);
    weeks.push({ n: w + 1, start, end, items: pending.slice(w * perWeek, (w + 1) * perWeek) });
  }
  const revStart = addDays(today, weeks.length * 7) > addDays(exam, -revisionWeeks * 7) ? addDays(today, weeks.length * 7) : addDays(exam, -revisionWeeks * 7);
  return { daysLeft, revisionWeeks, pending, perWeek, weeks, exam, revStart, heavy: weeksLeft > 0 && pending.length / learnWeeks > 10 };
}

function planCard() {
  const plan = buildPlan();
  const f = (d) => fmtDate(dateKey(d), { day: 'numeric', month: 'short' });
  const head = `<div class="card-head"><h3>${icon('calendar', 17)} Your study plan</h3>${plan.daysLeft ? `<span class="tag">${plan.daysLeft} days to GATE · ${f(plan.exam)}</span>` : ''}</div>`;
  if (!plan.daysLeft) {
    return `<div class="card" id="plan">${head}<p class="hint" style="margin-bottom:12px">Your exam date (${esc(fmtDate(S().profile.examDate, { day: 'numeric', month: 'long', year: 'numeric' }))}) has passed or is today. Set your next exam date to get a fresh week-by-week plan.</p>
      <a class="btn sm" href="#/profile">${icon('calendar', 14)} Update exam date</a></div>`;
  }
  if (!plan.pending.length) {
    return `<div class="card" id="plan">${head}<p style="margin-bottom:12px"><b>Syllabus complete. 🎉</b> <span class="muted">With ${plan.daysLeft} days to go, spend your time on revision and timed practice papers.</span></p>
      <div class="row wrap"><a class="btn accent sm" href="#/quiz?mode=mock">${icon('trophy', 14)} Practice paper</a><a class="btn sm" href="#/notes?filter=due">${icon('revise', 14)} Revise notes</a></div></div>`;
  }
  const [cur, ...rest] = plan.weeks;
  const row = ({ s, c, weak }) => {
    const st = statusOf(syl().status[chapterKey(s.id, c.id)]);
    return `<div class="li syl-topic">
      <button class="status-pill" data-cycle="${esc(c.id)}" data-sub="${esc(s.id)}" style="--c:${st.color}" title="Change status">${st.label}</button>
      <a class="li-main" href="${href(s.id, c.id)}" style="text-decoration:none;color:inherit"><div class="li-title">${esc(c.name)}</div>
        <div class="li-sub"><span class="dot" style="background:${s.color}"></span>${esc(s.short)} · <span class="w-tag w-${c.weight}">${WEIGHT_WORD[c.weight]}</span>${weak ? ' · <span style="color:var(--bad);font-weight:700">weak area</span>' : ''}</div></a>
      <a class="icon-btn sm bare" href="${href(s.id, c.id)}" aria-label="Open">${icon('right', 16)}</a></div>`;
  };
  const subjectsIn = (items) => [...new Set(items.map((x) => x.s.id))].map((id) => {
    const names = items.filter((x) => x.s.id === id).map((x) => esc(x.c.name));
    return `<b>${esc(subjectById(id).short)}</b>: ${names.join(', ')}`;
  }).join(' · ');
  return `<div class="card" id="plan">
    ${head}
    <p class="hint" style="margin:-4px 0 12px">${plan.pending.length} topics left, about <b>${plan.perWeek}</b> a week${plan.revisionWeeks ? `, then ${plan.revisionWeeks} week${plan.revisionWeeks > 1 ? 's' : ''} of revision and practice papers` : ''}. High-weightage subjects and your weak areas come first. The plan updates as you mark topics done.</p>
    ${plan.heavy ? `<div class="notice" style="margin-bottom:12px">${icon('alert', 18)}<div class="hint">That's a heavy pace. Focus on high-weightage topics first and practise them with quizzes rather than aiming to cover everything in depth.</div></div>` : ''}
    <div class="row between" style="margin:4px 0 2px"><b>This week</b><span class="hint">${f(cur.start)} – ${f(cur.end)}</span></div>
    <div class="list">${cur.items.map(row).join('')}</div>
    <div class="row wrap" style="margin-top:12px">
      <a class="btn accent sm" href="${href(cur.items[0].s.id, cur.items[0].c.id)}">${icon('play', 14)} Start with ${esc(cur.items[0].c.name)}</a>
      <a class="btn sm ghost" href="#/reminders">${icon('bell', 14)} Set a study reminder</a>
    </div>
    ${rest.length || plan.revisionWeeks ? `<details class="plan-ahead" style="margin-top:14px">
      <summary class="hint" style="cursor:pointer"><b>Coming up</b> · ${rest.length} more week${rest.length === 1 ? '' : 's'}${plan.revisionWeeks ? ' + revision' : ''}</summary>
      <div class="list" style="margin-top:6px">
        ${rest.map((w) => `<div class="li" style="align-items:flex-start"><span class="tag">Wk ${w.n}</span><div class="li-main"><div class="li-sub">${f(w.start)} – ${f(w.end)}</div><div class="hint" style="color:var(--ink-2)">${subjectsIn(w.items)}</div></div></div>`).join('')}
        ${plan.revisionWeeks ? `<div class="li" style="align-items:flex-start"><span class="tag" style="color:var(--good)">Revise</span><div class="li-main"><div class="li-sub">${f(plan.revStart)} – ${f(plan.exam)}</div><div class="hint" style="color:var(--ink-2)">Full-syllabus revision, timed practice papers and your mistake-book notes.</div></div></div>` : ''}
      </div></details>` : ''}
  </div>`;
}

/* ---------------- AI notes ---------------- */
function str(v, max = 2000) {
  return String(v ?? '').trim().slice(0, max);
}
function list(v, max = 20) {
  return (Array.isArray(v) ? v : []).map((x) => str(typeof x === 'object' ? Object.values(x).join(': ') : x, 1200)).filter(Boolean).slice(0, max);
}
function clean(raw) {
  const d = raw && typeof raw === 'object' ? raw : {};
  return {
    title: str(d.title, 200),
    overview: str(d.overview, 1500),
    sections: (Array.isArray(d.sections) ? d.sections : []).map((s) => ({ heading: str(s?.heading, 200), points: list(s?.points, 14) })).filter((s) => s.heading || s.points.length).slice(0, 10),
    formulas: list(d.formulas),
    keyTerms: (Array.isArray(d.keyTerms) ? d.keyTerms : []).map((t) => ({ term: str(t?.term, 120), meaning: str(t?.meaning, 600) })).filter((t) => t.term).slice(0, 15),
    examPoints: list(d.examPoints || d.ncertLines),
    mistakes: list(d.mistakes),
    pyqThemes: list(d.pyqThemes),
    mnemonic: str(d.mnemonic, 600),
    quickRevision: list(d.quickRevision),
  };
}

function aiMarkdown(d) {
  const out = [];
  const block = (title, items) => items.length && out.push(`## ${title}`, ...items.map((x) => `- ${x}`), '');
  if (d.overview) out.push(d.overview, '');
  for (const s of d.sections) out.push(`## ${s.heading || 'Notes'}`, ...s.points.map((p) => `- ${p}`), '');
  block('Formulas & key results', d.formulas);
  block('Key terms', d.keyTerms.map((t) => `**${t.term}**: ${t.meaning}`));
  block('What GATE likes to ask', d.examPoints || []);
  block('Common mistakes', d.mistakes);
  block('Asked before (PYQ themes)', d.pyqThemes);
  if (d.mnemonic) out.push('## Memory hook', `> ${d.mnemonic}`, '');
  block('Quick revision', d.quickRevision);
  return out.join('\n').trim();
}

async function generate(sub, ch) {
  const key = chapterKey(sub, ch);
  if (generating) return toast('Already writing notes for another topic. Please wait.', 'info');
  const controller = new AbortController();
  generating = { key, controller };
  lastError = null;
  window.dispatchEvent(new Event('ygb:syllabus'));
  const c = chapterById(sub, ch);
  try {
    const raw = await runAI('material', { paper: BRANCH.name, subject: subjectById(sub).name, chapter: c.name, topic: c.topics.join(', ') }, { signal: controller.signal });
    const data = clean(raw);
    if (!data.overview && !data.sections.length) throw new AIError('The AI returned empty notes. Please try again.', 'EMPTY');
    syl().material[key] = { data, at: Date.now() };
    if (!syl().status[key]) setStatus(sub, ch, 'reading');
    commit();
    if (!location.hash.includes(`chapter=${encodeURIComponent(ch)}`)) toast('AI study notes ready', 'good', c.name);
  } catch (e) {
    if (e.name !== 'AbortError') {
      lastError = { key, message: friendlyError(e), code: e.code };
      if (!location.hash.includes(`chapter=${encodeURIComponent(ch)}`)) toast(lastError.message, 'bad');
    }
  } finally {
    generating = null;
    window.dispatchEvent(new Event('ygb:syllabus'));
  }
}

async function askDoubt(sub, ch, question) {
  doubt = { key: chapterKey(sub, ch), q: question, busy: true, answer: null, error: '' };
  window.dispatchEvent(new Event('ygb:syllabus'));
  try {
    const raw = await runAI('doubt', { paper: BRANCH.name, subject: subjectById(sub).name, chapter: chapterById(sub, ch).name, question });
    const answer = str(raw?.answer, 6000);
    if (!answer) throw new AIError('The AI returned an empty answer. Please try again.', 'EMPTY');
    doubt.answer = { answer, keyPoints: list(raw?.keyPoints, 8), tip: str(raw?.tip, 400) };
  } catch (e) {
    doubt.error = friendlyError(e);
  }
  doubt.busy = false;
  window.dispatchEvent(new Event('ygb:syllabus'));
}

function sourcesFor() {
  const items = LIBRARY.filter((r) => r.cat === 'Standard Books').slice(0, 4).concat(LIBRARY.filter((r) => ['gate-papers', 'nptel'].includes(r.id)));
  return `<div class="list">${items.map((r) => {
    const ico = r.type === 'book' ? 'book' : r.type === 'pdf' ? 'file' : r.type === 'video' ? 'video' : 'globe';
    const body = `<span class="stat-ico" style="width:30px;height:30px">${icon(ico, 15)}</span><div class="li-main"><div class="li-title">${esc(r.title)}</div><div class="li-sub">${esc(r.desc)}</div></div>`;
    return r.url ? `<a class="li" href="${esc(r.url)}" target="_blank" rel="noopener" style="text-decoration:none">${body}${icon('external', 14)}</a>` : `<div class="li">${body}</div>`;
  }).join('')}</div><a class="btn sm ghost" href="#/resources" style="margin-top:8px">All resources ${icon('right', 14)}</a>`;
}

export function mount(el, params, { setSub }) {
  const sub = SUBJECTS.some((s) => s.id === params.subject) ? params.subject : null;
  const ch = sub && chapterById(sub, params.chapter) ? params.chapter : null;
  let loadTimer = null;
  let tab = null; // topic page: 'notes' (offline key notes) | 'ai'
  let kn; // undefined while loading, null if this topic has no key notes
  const keyNote = () => S().notes.find((n) => n.subject === sub && n.title === `${chapterById(sub, ch).name} (key notes)` && (n.tags || []).includes('key-notes'));

  /* ---------------- All subjects ---------------- */
  function overview() {
    const st = syllabusStats();
    const a = st.all;
    const notes = Object.keys(syl().material).length;
    const next = SUBJECTS.flatMap((s) => chaptersOf(s.id).map((c) => ({ s, c })))
      .filter(({ s, c }) => c.weight === 'H' && !isDoneStatus(syl().status[chapterKey(s.id, c.id)]))
      .sort((x, y) => (y.s.marks || 0) - (x.s.marks || 0)).slice(0, 6);
    return `
    <div class="card syl-hero">
      <div style="flex:1 1 260px">
        <span class="eyebrow">GATE · ${esc(BRANCH.id)} · ${esc(BRANCH.name)}</span>
        <h2 class="serif" style="font-size:30px;margin:4px 0">${a.done} of ${a.total} topics covered</h2>
        <p class="hint">Open a subject, study a topic with its key notes (or detailed AI notes), tick off its sub-topics, then take the topic test. <a href="#/profile">Change paper</a></p>
      </div>
      <div style="flex:1 1 240px">
        <div class="progress good" style="height:10px"><i style="width:${a.total ? (a.done / a.total) * 100 : 0}%"></i></div>
        <p class="hint" style="margin-top:8px">${a.reading} studying · ${a.revised} revised · ${a.topicsDone}/${a.topicsTotal} sub-topics ticked · ${notes} AI note${notes === 1 ? '' : 's'}</p>
      </div>
    </div>
    <div class="grid g-3" style="margin-top:18px;align-items:start">
      <div class="span-2">${planCard()}</div>
      <div class="card">
        <div class="card-head"><h3>${icon('flame', 17)} High-weightage, not done</h3></div>
        ${next.length ? `<div class="list">${next.map(({ s, c }) => `
          <a class="li" href="${href(s.id, c.id)}" style="text-decoration:none"><span class="dot" style="background:${s.color}"></span>
            <div class="li-main"><div class="li-title">${esc(c.name)}</div><div class="li-sub">${esc(s.short)} · ~${s.marks} marks</div></div>${icon('right', 16)}</a>`).join('')}</div>`
          : `<div class="notice info">${icon('trophy', 18)}<div>All high-weightage topics are done. Keep revising!</div></div>`}
      </div>
    </div>
    <h3 class="serif" style="font-size:24px;margin:26px 0 12px">Subjects</h3>
    <div class="syl-grid">
      ${SUBJECTS.map((s) => {
        const x = st[s.id];
        return `<a class="syl-card subj-card" href="${href(s.id)}" style="--c:${s.color}">
          <div class="row between"><span class="subj-ico">${icon(s.icon, 20)}</span><span class="hint">${x.done}/${x.total} topics</span></div>
          <h4>${esc(s.name)}</h4>
          <div class="progress"><i style="width:${x.total ? (x.done / x.total) * 100 : 0}%;background:${s.color}"></i></div>
          <span class="hint">~${s.marks} marks in GATE · ${x.topicsDone}/${x.topicsTotal} sub-topics</span>
        </a>`;
      }).join('')}
    </div>`;
  }

  /* ---------------- One subject ---------------- */
  function chapterRow(c) {
    const x = chStats(sub, c);
    const stt = statusOf(x.status);
    const mat = syl().material[x.k];
    const n = chapterCount(sub, c.id);
    return `<div class="li syl-topic">
      <button class="status-pill" data-cycle="${esc(c.id)}" style="--c:${stt.color}" title="Change status">${stt.label}</button>
      <a class="li-main" href="${href(sub, c.id)}" style="text-decoration:none;color:inherit"><div class="li-title">${esc(c.name)}</div>
        <div class="li-sub"><span class="w-tag w-${c.weight}" title="${WEIGHT_LABEL[c.weight]}">${WEIGHT_WORD[c.weight]}</span> ${x.done}/${x.total} sub-topics · Key notes${n ? ` · ${n} offline Q${n === 1 ? '' : 's'}` : ''}${mat ? ` · ${icon('sparkles', 11)} AI notes` : ''}</div></a>
      <a class="icon-btn sm bare" href="${href(sub, c.id)}" aria-label="Open">${icon('right', 16)}</a>
    </div>`;
  }
  function subjectView() {
    const s = subjectById(sub);
    const st = syllabusStats()[sub];
    const n = subjectCount(sub);
    return `
    <a class="btn sm ghost" href="#/syllabus">${icon('left', 14)} All subjects</a>
    <div class="grid g-3" style="margin-top:12px;align-items:start">
      <div class="card span-2">
        <div class="card-head"><h3><span class="subj-ico sm" style="--c:${s.color}">${icon(s.icon, 15)}</span> ${esc(s.name)}</h3><span class="tag">${st.done}/${st.total} done · ~${s.marks} marks</span></div>
        <div class="progress" style="margin-bottom:6px"><i style="width:${st.total ? (st.done / st.total) * 100 : 0}%;background:${s.color}"></i></div>
        <p class="hint" style="margin-bottom:6px">Tap a status to change it. Weightage shows how often GATE has asked from the topic recently.</p>
        <div class="list">${chaptersOf(sub).map(chapterRow).join('')}</div>
      </div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>${icon('target', 17)} Practise ${esc(s.short)}</h3></div>
          <div class="stack" style="gap:8px">
            ${n ? `<a class="btn block" href="#/quiz?mode=chapter&subject=${sub}">${icon('check', 15)} Offline test · ${n} Qs</a>` : ''}
            <a class="btn ${n ? '' : 'accent'} block" href="#/quiz?mode=ai&subject=${sub}">${icon('sparkles', 15)} AI quiz</a>
            <a class="btn block" href="#/quiz?mode=mock">${icon('trophy', 15)} GATE practice paper</a>
          </div>
        </div>
        <div class="card"><div class="card-head"><h3>${icon('library', 17)} Read from</h3></div>${sourcesFor()}</div>
      </div>
    </div>`;
  }

  /* ---------------- One topic ---------------- */
  function chapterView() {
    const s = subjectById(sub);
    const c = chapterById(sub, ch);
    const all = chaptersOf(sub);
    const idx = all.findIndex((x) => x.id === ch);
    const prev = all[idx - 1];
    const next = all[idx + 1];
    const x = chStats(sub, c);
    const mat = syl().material[x.k];
    const busy = generating?.key === x.k;
    const err = lastError?.key === x.k ? lastError : null;
    const qCount = chapterCount(sub, ch);

    let body;
    if (tab === 'notes') {
      if (kn === undefined) body = `<div class="stack" style="padding:8px 0"><div class="skeleton"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div></div>`;
      else if (!kn) {
        body = `<div class="empty" style="padding:28px 8px"><div class="em-icon">${icon('book', 24)}</div><h4>Key notes didn't load</h4>
          <p>Check your connection and open the topic again, or read the AI notes.</p>
          <button class="btn accent" data-tab="ai" style="margin-top:14px">${icon('sparkles', 15)} Go to AI notes</button></div>`;
      } else {
        const saved = keyNote();
        body = `<div class="notice info" style="margin-bottom:16px">${icon('book', 18)}<div class="hint">Ready-made key notes for quick revision, no AI or internet needed. Read them alongside a standard textbook.</div></div>
          <article class="md">${md(keyNotesMarkdown(kn))}</article>
          <hr class="divider">
          <div class="row wrap">
            ${saved ? `<a class="btn" href="#/notes?id=${esc(saved.id)}">${icon('notes', 15)} Open in my notes</a>` : `<button class="btn" data-savekey>${icon('notes', 15)} Save to my notes</button>`}
            <span class="spacer"></span>
            <button class="btn ghost" data-tab="ai">${icon('sparkles', 15)} ${mat ? 'Read AI notes' : 'Get detailed AI notes'}</button>
          </div>`;
      }
    } else if (busy) {
      body = `<div class="loader"><div class="orbit"></div>
        <div><h3 class="serif" style="font-size:26px">Writing your study notes</h3><p class="muted" id="loadLine">${LOADING_LINES[0]}</p></div>
        <div style="width:min(420px,100%)" class="stack"><div class="skeleton"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div></div>
        <p class="hint">This takes 15–40 seconds. You can keep using the app; we'll save the notes here.</p>
        <button class="btn ghost" data-cancel>Cancel</button></div>`;
    } else if (mat) {
      body = `<div class="notice info" style="margin-bottom:16px">${icon('info', 18)}<div class="hint">AI-written notes, ${timeAgo(mat.at)}. Cross-check anything surprising against a standard textbook.</div></div>
        <article class="md">${md(aiMarkdown(mat.data))}</article>
        <hr class="divider">
        <div class="row wrap">
          ${mat.noteId && S().notes.some((n) => n.id === mat.noteId) ? `<a class="btn" href="#/notes?id=${esc(mat.noteId)}">${icon('notes', 15)} Open in my notes</a>` : `<button class="btn" data-savenote>${icon('notes', 15)} Save to my notes</button>`}
          <span class="spacer"></span>
          <button class="btn ghost" data-generate>${icon('revise', 15)} Rewrite</button>
        </div>`;
    } else {
      body = `<div class="empty" style="padding:28px 8px">
        <div class="em-icon">${icon('sparkles', 24)}</div>
        <h4>Detailed AI notes for this topic</h4>
        <p>Exam-focused notes with concepts, formulas, key terms, common mistakes, PYQ themes and a quick-revision box.</p>
        ${err ? `<div class="notice" style="margin:14px auto 0;max-width:520px;text-align:left">${icon('alert', 18)}<div>${esc(err.message)}${['NO_KEY', 'AUTH', 'MODEL'].includes(err.code) ? ` <a href="#/settings" style="font-weight:700">Open Settings →</a>` : ''}</div></div>` : ''}
        ${hasAI()
          ? `<div class="row wrap" style="justify-content:center;margin-top:16px"><button class="btn accent" data-generate>${icon('sparkles', 16)} Generate AI notes</button></div>`
          : `<div class="notice info" style="margin:14px auto 0;max-width:520px;text-align:left">${icon('key', 18)}<div>To generate notes, add a free Google Gemini key in <a href="#/settings" style="font-weight:700">Settings</a>.</div></div>`}
      </div>`;
    }

    const d = doubt.key === x.k ? doubt : { q: '', busy: false, answer: null, error: '' };
    return `
    <div class="row wrap" style="gap:8px"><a class="btn sm ghost" href="${href(sub)}">${icon('left', 14)} ${esc(s.name)}</a></div>
    <div class="grid g-3" style="margin-top:12px;align-items:start">
      <div class="card span-2">
        <div class="syl-topic-head">
          <span class="tag"><span class="dot" style="background:${s.color}"></span>${esc(s.short)} · <span class="w-tag w-${c.weight}">${WEIGHT_LABEL[c.weight]}</span></span>
          <h2 class="serif">${esc(c.name)}</h2>
          <div class="seg" role="group" aria-label="Topic status">${STATUSES.map((t) => `<button class="${x.status === t.id ? 'on' : ''}" data-status="${t.id}">${t.label}</button>`).join('')}</div>
        </div>
        <div class="seg" role="tablist" aria-label="Notes" style="margin-bottom:16px">
          <button role="tab" aria-selected="${tab === 'notes'}" class="${tab === 'notes' ? 'on' : ''}" data-tab="notes">${icon('book', 13)} Key notes</button>
          <button role="tab" aria-selected="${tab === 'ai'}" class="${tab === 'ai' ? 'on' : ''}" data-tab="ai">${icon('sparkles', 13)} AI notes${mat ? ' ✓' : busy ? ' …' : ''}</button>
        </div>
        ${body}
      </div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>${icon('target', 17)} Practise</h3></div>
          <div class="stack" style="gap:8px">
            ${qCount ? `<a class="btn accent block" href="#/quiz?mode=chapter&subject=${sub}&chapter=${encodeURIComponent(ch)}">${icon('check', 15)} Topic test · ${qCount} Q${qCount === 1 ? '' : 's'} (offline)</a>` : ''}
            <a class="btn ${qCount ? '' : 'accent'} block" href="#/quiz?mode=ai&subject=${sub}&chapter=${encodeURIComponent(ch)}">${icon('sparkles', 15)} AI quiz on this topic</a>
            <a class="btn block" href="#/study?subject=${sub}&start=1">${icon('timer', 15)} Start a focus session</a>
          </div>
        </div>
        <div class="card">
          <div class="card-head"><h3>${icon('tracker', 17)} Sub-topics</h3><span class="hint">${x.done}/${x.total}</span></div>
          <div class="list">${c.topics.map((t, i) => {
            const on = syl().topics?.[`${x.k}::${t}`];
            return `<div class="li ${on ? 'done' : ''}"><button class="check ${on ? 'on' : ''}" data-topic="${i}" aria-label="Mark sub-topic done">${icon('check', 14)}</button><div class="li-main"><div class="li-title">${esc(t)}</div></div></div>`;
          }).join('')}</div>
        </div>
        <div class="card">
          <div class="card-head"><h3>${icon('brain', 17)} Ask a doubt</h3></div>
          <form id="doubtForm" class="stack" style="gap:8px">
            <textarea class="textarea" name="q" rows="3" maxlength="1500" placeholder="e.g. Why does the time constant decide how fast a capacitor charges?" ${d.busy ? 'disabled' : ''}>${esc(d.q)}</textarea>
            <button class="btn primary" ${d.busy || !hasAI() ? 'disabled' : ''}>${d.busy ? 'Thinking…' : `${icon('sparkles', 15)} Explain`}</button>
            ${!hasAI() ? `<p class="hint">Add a free Gemini key in <a href="#/settings">Settings</a> to ask doubts.</p>` : ''}
          </form>
          ${d.error ? `<div class="notice" style="margin-top:10px">${icon('alert', 18)}<div>${esc(d.error)}</div></div>` : ''}
          ${d.answer ? `<article class="md doubt-answer">${md(d.answer.answer)}${d.answer.keyPoints.length ? `<ul>${d.answer.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>` : ''}${d.answer.tip ? `<blockquote>${esc(d.answer.tip)}</blockquote>` : ''}</article>` : ''}
        </div>
        <div class="row between">
          ${prev ? `<a class="btn sm ghost" href="${href(sub, prev.id)}" title="${esc(prev.name)}">${icon('left', 14)} Previous</a>` : '<span></span>'}
          ${next ? `<a class="btn sm ghost" href="${href(sub, next.id)}" title="${esc(next.name)}">Next ${icon('right', 14)}</a>` : ''}
        </div>
      </div>
    </div>`;
  }

  function draw() {
    clearInterval(loadTimer);
    if (ch) {
      setSub(`${subjectById(sub).name} · ~${subjectById(sub).marks} marks`);
      el.innerHTML = chapterView();
      if (generating?.key === chapterKey(sub, ch)) {
        let i = 0;
        loadTimer = setInterval(() => {
          const line = el.querySelector('#loadLine');
          if (line) line.textContent = LOADING_LINES[++i % LOADING_LINES.length];
        }, 2600);
      }
    } else if (sub) {
      setSub(`${chaptersOf(sub).length} topics · notes, sub-topics and progress`);
      el.innerHTML = subjectView();
    } else {
      setSub(`${BRANCH.name} (${BRANCH.id}) · subject by subject`);
      el.innerHTML = overview();
    }
  }

  function saveKeyNote() {
    if (!kn || keyNote()) return draw();
    const now = Date.now();
    S().notes.push({
      id: uid(), title: `${chapterById(sub, ch).name} (key notes)`, subject: sub, tags: ['key-notes'], pinned: false,
      body: keyNotesMarkdown(kn), createdAt: now, updatedAt: now, openedAt: now,
      revisions: 0, nextRevision: dateKey(addDays(new Date(), 1)),
    });
    commit();
    toast('Saved to Notes', 'good', 'Added to your revision schedule.');
    draw();
  }

  function saveNote() {
    const c = chapterById(sub, ch);
    const k = chapterKey(sub, ch);
    const mat = syl().material[k];
    if (!mat) return;
    const now = Date.now();
    const note = { id: uid(), title: `${c.name} (AI notes)`, subject: sub, tags: ['study-material'], pinned: false, body: aiMarkdown(mat.data), createdAt: now, updatedAt: now, openedAt: now, revisions: 0, nextRevision: dateKey(addDays(new Date(), 1)) };
    S().notes.push(note);
    mat.noteId = note.id;
    commit();
    toast('Saved to Notes', 'good', 'Added to your revision schedule.');
    draw();
  }

  el.addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const d = b.dataset;
    if (d.tab) { tab = d.tab; draw(); }
    else if (d.cycle !== undefined) {
      const s = d.sub || sub;
      const k = chapterKey(s, d.cycle);
      const i = STATUSES.findIndex((x) => x.id === (syl().status[k] || ''));
      setStatus(s, d.cycle, STATUSES[(i + 1) % STATUSES.length].id);
      commit();
      draw();
    } else if (d.status !== undefined) {
      setStatus(sub, ch, d.status);
      commit();
      if (isDoneStatus(d.status)) toast('Topic marked ' + statusOf(d.status).label.toLowerCase(), 'good', 'Take a quiz on it to lock it in.');
      draw();
    } else if (d.topic !== undefined) {
      const c = chapterById(sub, ch);
      const tk = `${chapterKey(sub, ch)}::${c.topics[Number(d.topic)]}`;
      syl().topics ||= {};
      if (syl().topics[tk]) delete syl().topics[tk]; else syl().topics[tk] = true;
      const x = chStats(sub, c);
      if (x.done === x.total && !isDoneStatus(x.status)) { setStatus(sub, ch, 'done'); toast('All sub-topics ticked: topic done!', 'good'); }
      else if (x.done && !x.status) setStatus(sub, ch, 'reading');
      commit();
      draw();
    } else if ('generate' in d) {
      if (syl().material[chapterKey(sub, ch)] && !(await confirmDialog('Rewrite these notes? The current version will be replaced.', 'Rewrite'))) return;
      tab = 'ai';
      generate(sub, ch);
    } else if ('cancel' in d) generating?.controller.abort();
    else if ('savenote' in d) saveNote();
    else if ('savekey' in d) saveKeyNote();
  });

  el.addEventListener('submit', (e) => {
    if (e.target.id !== 'doubtForm') return;
    e.preventDefault();
    const q = e.target.q.value.trim();
    if (q.length < 8) return toast('Write your doubt in a little more detail', 'info');
    askDoubt(sub, ch, q);
  });

  const onChange = () => el.isConnected && draw();
  window.addEventListener('ygb:syllabus', onChange);
  if (ch) {
    const k = chapterKey(sub, ch);
    tab = generating?.key === k || lastError?.key === k ? 'ai' : 'notes';
    keyNotes(sub, ch).then((n) => {
      kn = n;
      if (el.isConnected) draw();
    });
  }
  draw();
  if (!sub && params.view === 'plan') setTimeout(() => el.querySelector('#plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  return () => {
    clearInterval(loadTimer);
    window.removeEventListener('ygb:syllabus', onChange);
  };
}
