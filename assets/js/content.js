// Offline question bank (no internet or AI needed) and helpers that turn it into quiz questions.
//
// The bank is split into lazily-imported modules in ./quizbank/, one per subject, like the key notes:
//   ga.js and em.js are shared by every paper; everything else is <paper>-<subjectId>.js (subject ids repeat across papers).
// Each module exports Q = { '<chapter id>': [item, …] } where an item is
//   [question, [A, B, C, D], index of correct option, explanation, marks (1 or 2, default 1), papers (optional)]
// papers limits a shared item to some papers: 'EE EC' (only these) or '!CS' (all except these).
// Explanations must not refer to "option A/B…" because options are shuffled.
//
// loadBank() fetches the current paper's modules; app.js awaits it before mounting views that show counts, so
// chapterCount()/subjectCount() can stay synchronous.
import { BRANCH, SUBJECTS, chaptersOf, chapterById } from './data.js';

const SHARED = new Set(['ga', 'em']);
const files = {};
let bank = { paper: '', items: [], counts: {}, complete: false };
let pending = null;

const fileFor = (paper, sub) => (SHARED.has(sub) ? sub : `${paper.toLowerCase()}-${sub}`);

function loadFile(f) {
  if (!files[f]) {
    files[f] = import(`./quizbank/${f}.js`).then((m) => m.Q || {}).catch((e) => {
      console.warn('Question bank', f, e);
      delete files[f]; // let a later visit retry (e.g. after a network blip)
      return null;
    });
  }
  return files[f];
}

function forPaper(tag, paper) {
  if (!tag) return true;
  const t = String(tag).trim();
  const list = t.replace(/^!/, '').split(/[\s,]+/);
  return t.startsWith('!') ? !list.includes(paper) : list.includes(paper);
}

/** Loads the offline questions for the current paper (cached). Resolves to the number of questions. */
export function loadBank() {
  const paper = BRANCH.id;
  if (bank.paper === paper && bank.complete) return Promise.resolve(bank.items.length);
  if (pending?.paper === paper) return pending.p;
  const subs = SUBJECTS.map((s) => s.id);
  const p = Promise.all(subs.map((sub) => loadFile(fileFor(paper, sub)).then((Q) => [sub, Q]))).then((parts) => {
    if (pending?.paper === paper) pending = null;
    if (BRANCH.id !== paper) return 0; // the paper changed while loading
    const items = [];
    const counts = {};
    let complete = true;
    for (const [sub, Q] of parts) {
      if (!Q) { complete = false; continue; }
      for (const [ch, list] of Object.entries(Q)) {
        if (!chapterById(sub, ch)) continue;
        for (const it of list) {
          if (!forPaper(it[5], paper)) continue;
          items.push({ sub, ch, it });
          counts[`${sub}::${ch}`] = (counts[`${sub}::${ch}`] || 0) + 1;
          counts[sub] = (counts[sub] || 0) + 1;
        }
      }
    }
    bank = { paper, items, counts, complete };
    return items.length;
  });
  pending = { paper, p };
  return p;
}

const current = () => (bank.paper === BRANCH.id ? bank : { items: [], counts: {} });
export const bankReady = () => bank.paper === BRANCH.id && bank.complete;

/** Converts a bank entry into the quiz player's question shape (options shuffled). */
export function toMCQ({ sub, ch, it }) {
  const [stem, opts, ans, explanation, marks] = it;
  let options = [...opts];
  let answer = ans;
  // Shuffle option order so the correct letter isn't predictable — unless an option refers to the others ("All of these", "Both…").
  if (!options.some((o) => /\b(all of|none of|both|neither|all of these|all three)\b/i.test(o))) {
    const order = options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    options = order.map((i) => opts[i]);
    answer = order.indexOf(ans);
  }
  return { stem, statements: [], ask: '', options, answer, explanation: explanation || '', concept: chapterById(sub, ch)?.name || '', subject: sub, chapter: ch, marks: marks === 2 ? 2 : 1, passage: '' };
}

/** Number of offline questions for a chapter / subject of the current paper (0 until loadBank() has finished). */
export const chapterCount = (sub, id) => current().counts[`${sub}::${id}`] || 0;
export const subjectCount = (sub) => current().counts[sub] || 0;

export async function chapterQuestions(sub, id) {
  await loadBank();
  return current().items.filter((x) => x.sub === sub && x.ch === id).map(toMCQ);
}

/** All bank questions for a subject of the current paper, each tagged with its chapter. */
export async function subjectQuestions(sub) {
  await loadBank();
  return current().items.filter((x) => x.sub === sub).map(toMCQ);
}

/** Every offline question for the current paper (used by the practice papers). */
export async function paperQuestions() {
  await loadBank();
  return current().items.map(toMCQ);
}

export { chaptersOf };
