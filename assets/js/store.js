// Local-first persistent store (localStorage). All app data lives on the user's device.
import { HABITS, EXAM, SUBJECTS, chaptersOf, syllabusOf, BRANCHES, round2 } from './data.js';
import { dateKey, addDays, parseKey, startOfDay, daysBetween } from './utils.js';

const KEY = 'ygb:v1';
const OLD_KEY = 'ygb.v1'; // the first version of YourGATEBuddy (before the redesign); imported once, then left untouched

function defaults() {
  return {
    v: 1,
    profile: { name: '', branch: '', examDate: EXAM.date, startDate: dateKey(), dailyTarget: 6, targetScore: 60, onboarded: false }, // targetScore: marks out of 100
    settings: { theme: 'system', provider: 'gemini', geminiKey: '', geminiModel: 'auto', apiKey: '', model: 'gpt-4o-mini', pomoFocus: 25, pomoBreak: 5, sound: true },
    tasks: {}, // { 'YYYY-MM-DD': [{id,title,subject,mins,done,priority}] }
    journal: {}, // { 'YYYY-MM-DD': 'text' }
    habits: { defs: HABITS.map((h) => ({ ...h })), log: {} }, // log: { date: [habitIds] }
    sessions: [], // {id,date,subject,minutes,note,source,at}
    timer: null,
    reminders: [],
    notes: [],
    resources: [], // user-added
    library: {}, // curated id -> 'todo' | 'doing' | 'done'
    quizzes: [],
    syllabus: { status: {}, topics: {}, material: {}, doneAt: {}, noteIds: {} }, // status/material/doneAt: 'subject::chapterId'; topics: 'subject::chapterId::topic' → true
    goals: { weekly: { hours: 42, chapters: 4, questions: 300 }, items: [] }, // items: {id,title,target,progress,unit,deadline,subject,done,createdAt}
  };
}

const MERGE_KEYS = ['profile', 'settings', 'habits', 'syllabus', 'goals'];
function load() {
  const d = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return migrateOld(d);
    const s = JSON.parse(raw);
    for (const k of Object.keys(s)) {
      if (MERGE_KEYS.includes(k) && s[k] && typeof s[k] === 'object') d[k] = { ...d[k], ...s[k] };
      else d[k] = s[k];
    }
    // Google retired the 2.5 models; move anyone who picked one back to Auto.
    if (/^gemini-2\./.test(d.settings.geminiModel || '')) d.settings.geminiModel = 'auto';
    return d;
  } catch {
    return d;
  }
}

/* ---------- One-time import from the first YourGATEBuddy (localStorage 'ygb.v1') ---------- */
const OLD_EM = ['linear-algebra', 'calculus', 'differential-equations', 'complex-variables', 'probability', 'numerical-methods'];
function migrateOld(d) {
  let o;
  try { o = JSON.parse(localStorage.getItem(OLD_KEY) || 'null'); } catch { o = null; }
  if (!o || !o.profile) return d;
  try {
    const p = o.profile;
    const branch = BRANCHES.some((b) => b.id === p.branch) ? p.branch : 'CS';
    Object.assign(d.profile, { name: p.name || '', branch, examDate: /^\d{4}-\d{2}-\d{2}$/.test(p.examDate || '') ? p.examDate : d.profile.examDate, onboarded: true });
    if (o.settings && ['light', 'dark', 'system'].includes(o.settings.theme)) d.settings.theme = o.settings.theme;
    if (o.settings && 'sound' in o.settings) d.settings.sound = !!o.settings.sound;

    // Ticked topics ("CS:algo:2" → time) become finished chapters: the old topic list is the new chapter list, in the same order.
    for (const [k, when] of Object.entries(o.studied || {})) {
      const [b, sub, idx] = k.split(':');
      if (b !== branch) continue;
      const subject = syllabusOf(branch).find((x) => x.id === sub);
      const chId = sub === 'em' ? OLD_EM[Number(idx)] : subject?.chapters[Number(idx)]?.id;
      if (!subject || !chId || !subject.chapters.some((c) => c.id === chId)) continue;
      const key = `${sub}::${chId}`;
      d.syllabus.status[key] = 'done';
      d.syllabus.doneAt[key] = Date.parse(when) || Date.now();
    }

    // Quiz attempts (old marking had no negatives; re-scored with GATE 1-mark marking: +1 / −⅓).
    d.quizzes = (o.attempts || []).filter((a) => a && Array.isArray(a.items)).map((a, i) => {
      const items = a.items;
      const bySubject = {};
      let correct = 0, wrong = 0, skipped = 0;
      for (const it of items) {
        const k = it.subject || a.subject || 'mixed';
        bySubject[k] ||= { c: 0, w: 0, s: 0 };
        if (it.chosen === null || it.chosen === undefined) { skipped++; bySubject[k].s++; }
        else if (it.chosen === it.a) { correct++; bySubject[k].c++; }
        else { wrong++; bySubject[k].w++; }
      }
      const q = {
        id: a.id || `old${i}`, at: Date.parse(a.date) || Date.now(), mode: a.mode === 'ai' ? 'ai' : 'chapter', subject: a.subject || 'mixed', chapter: '',
        topic: a.mode === 'saved' ? 'Saved questions' : a.subject === 'mixed' ? 'Smart mix' : '', total: items.length, correct, wrong, skipped,
        score: round2(correct - wrong / 3), maxScore: items.length, timeSec: a.seconds || 0, bySubject,
      };
      if (i < 30) {
        q.questions = items.map((it) => ({ stem: String(it.q || ''), statements: [], ask: '', options: (it.o || []).map(String), answer: it.a, explanation: String(it.ex || ''), concept: '', subject: it.subject || a.subject, marks: 1, passage: '' }));
        q.answers = items.map((it) => (it.chosen === undefined ? null : it.chosen));
      }
      return q;
    });

    // Reminders: old ones were "these weekdays at this time".
    d.reminders = (o.reminders || []).filter((r) => r && r.time).map((r) => {
      const days = Array.isArray(r.days) ? [...new Set(r.days)].sort() : [];
      const repeat = days.length === 7 || !days.length ? 'daily' : days.join() === '1,2,3,4,5' ? 'weekdays' : 'weekly';
      return { id: r.id || Math.random().toString(36).slice(2, 10), title: r.title || 'Study reminder', time: r.time, repeat, days: repeat === 'weekly' ? days : [1], date: dateKey(), emoji: '⏰', note: '', enabled: r.enabled !== false };
    });

    // Saved (bookmarked) questions become one revision note.
    if (Array.isArray(o.saved) && o.saved.length) {
      const body = o.saved.map((x) => [`### ${x.q}`, ...(x.o || []).map((opt, j) => `- ${j === x.a ? `==${opt}==` : opt}`), x.ex ? `> ${x.ex}` : '', ''].join('\n')).join('\n');
      const now = Date.now();
      d.notes.push({ id: 'saved-questions', title: 'Saved questions', subject: 'ga', tags: ['saved-questions'], pinned: true, body, createdAt: now, updatedAt: now, openedAt: now, revisions: 0, nextRevision: dateKey(addDays(new Date(), 1)) });
    }

    const first = d.quizzes.reduce((m, q) => Math.min(m, q.at), Date.now());
    d.profile.startDate = dateKey(new Date(first));
    d.migratedFrom = 'ygb.v1';
  } catch (e) {
    console.warn('Could not import data from the previous version', e);
  }
  return d;
}

let state = load();
if (state.migratedFrom && !localStorage.getItem(KEY)) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}
const subs = new Set();

export const S = () => state;
export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}
export function commit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
    window.dispatchEvent(new CustomEvent('ygb:toast', { detail: { msg: 'Storage is full — export a backup and delete old data.', type: 'bad' } }));
  }
  subs.forEach((fn) => fn(state));
}
export function replaceAll(next) {
  const d = defaults();
  state = { ...d, ...next, profile: { ...d.profile, ...(next.profile || {}) }, settings: { ...d.settings, ...(next.settings || {}) }, syllabus: { ...d.syllabus, ...(next.syllabus || {}) }, goals: { ...d.goals, ...(next.goals || {}) } };
  commit();
}
export function resetAll() {
  state = defaults();
  commit();
}
/** A copy of all data without secrets (API keys never leave this device). */
export function snapshot() {
  const copy = JSON.parse(JSON.stringify(state));
  copy.settings.apiKey = '';
  copy.settings.geminiKey = '';
  return copy;
}
export function exportJSON() {
  const copy = snapshot();
  copy.exportedAt = new Date().toISOString();
  return JSON.stringify(copy, null, 2);
}
/** True when this device holds no meaningful study data yet. */
export function isBlank(st = state) {
  const tasks = Object.values(st.tasks || {}).some((l) => l && l.length);
  return !tasks && !(st.sessions || []).length && !(st.notes || []).length && !(st.quizzes || []).length && !(st.reminders || []).length && !(st.resources || []).length && !Object.keys(st.library || {}).length && !Object.keys(st.syllabus?.status || {}).length && !Object.keys(st.syllabus?.material || {}).length && !(st.goals?.items || []).length;
}
export function dataSummary(st = state) {
  const mins = (st.sessions || []).reduce((a, s) => a + (s.minutes || 0), 0);
  return `${(mins / 60).toFixed(1).replace(/\.0$/, '')}h studied · ${(st.sessions || []).length} sessions · ${(st.notes || []).length} notes · ${(st.quizzes || []).length} quizzes · ${Object.values(st.syllabus?.status || {}).filter((v) => v === 'done' || v === 'revised').length} chapters done`;
}

/* ---------------- Derived metrics ---------------- */

export function minutesOn(key) {
  return state.sessions.reduce((a, s) => (s.date === key ? a + s.minutes : a), 0);
}
export function minutesByDay() {
  const m = {};
  for (const s of state.sessions) m[s.date] = (m[s.date] || 0) + s.minutes;
  return m;
}
export function lastNDays(n, end = new Date()) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) out.push(dateKey(addDays(end, -i)));
  return out;
}
export function minutesInRange(fromKey, toKey) {
  return state.sessions.reduce((a, s) => (s.date >= fromKey && s.date <= toKey ? a + s.minutes : a), 0);
}
export function studyStreak(minMinutes = 30) {
  const by = minutesByDay();
  let d = new Date();
  // Today doesn't break the streak until it's over.
  if ((by[dateKey(d)] || 0) < minMinutes) d = addDays(d, -1);
  let n = 0;
  while ((by[dateKey(d)] || 0) >= minMinutes) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}
export function bestStreak(minMinutes = 30) {
  const by = minutesByDay();
  const keys = Object.keys(by).filter((k) => by[k] >= minMinutes).sort();
  let best = 0, cur = 0, prev = null;
  for (const k of keys) {
    cur = prev && daysBetween(parseKey(prev), parseKey(k)) === 1 ? cur + 1 : 1;
    best = Math.max(best, cur);
    prev = k;
  }
  return best;
}
export function tasksFor(key) {
  return state.tasks[key] || (state.tasks[key] = []);
}
export function daysToExam() {
  return Math.max(0, daysBetween(new Date(), parseKey(state.profile.examDate)));
}
export function journeyProgress() {
  const start = parseKey(state.profile.startDate || dateKey());
  const end = parseKey(state.profile.examDate);
  const total = Math.max(1, daysBetween(start, end));
  return Math.min(1, Math.max(0, daysBetween(start, new Date()) / total));
}
export function quizAccuracy(days = 30) {
  const since = Date.now() - days * 864e5;
  let c = 0, t = 0;
  for (const q of state.quizzes) {
    if (q.at < since) continue;
    c += q.correct;
    t += q.correct + q.wrong;
  }
  return t ? Math.round((c / t) * 100) : null;
}
export function notesDue() {
  const today = dateKey();
  return state.notes.filter((n) => n.nextRevision && n.nextRevision <= today);
}
export function habitDoneCount(key) {
  return (state.habits.log[key] || []).length;
}
export { startOfDay };

/* ---------------- GATE syllabus progress (current paper) ---------------- */
export const isDoneStatus = (st) => st === 'done' || st === 'revised';
export const chapterKey = (sub, id) => `${sub}::${id}`;
/** Per-subject chapter coverage: { physics: { total, done, reading, revised, topicsDone, topicsTotal }, … , all: {…} } */
export function syllabusStats() {
  const out = {};
  const all = { total: 0, done: 0, reading: 0, revised: 0, topicsDone: 0, topicsTotal: 0 };
  const st = state.syllabus.status || {};
  const tp = state.syllabus.topics || {};
  for (const s of SUBJECTS) {
    const o = { total: 0, done: 0, reading: 0, revised: 0, topicsDone: 0, topicsTotal: 0 };
    for (const c of chaptersOf(s.id)) {
      const k = chapterKey(s.id, c.id);
      o.total++;
      if (isDoneStatus(st[k])) o.done++;
      if (st[k] === 'reading') o.reading++;
      if (st[k] === 'revised') o.revised++;
      o.topicsTotal += c.topics.length;
      o.topicsDone += c.topics.filter((t) => tp[`${k}::${t}`]).length;
    }
    out[s.id] = o;
    for (const f of Object.keys(all)) all[f] += o[f];
  }
  out.all = all;
  return out;
}
/** Chapters marked done/revised since a date key (for weekly goals). */
export function chaptersDoneSince(fromKey) {
  const since = parseKey(fromKey).getTime();
  return Object.entries(state.syllabus.doneAt || {}).filter(([k, t]) => t >= since && isDoneStatus(state.syllabus.status[k])).length;
}
export function questionsSince(fromKey) {
  const since = parseKey(fromKey).getTime();
  return state.quizzes.reduce((a, q) => (q.at >= since ? a + q.correct + q.wrong : a), 0);
}
