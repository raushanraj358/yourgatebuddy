// Static, offline key notes per syllabus topic (a "chapter" in code). One lazily-imported module per subject in ./keynotes/,
// each exporting CONTENT = { '<chapter id>': { overview, sections: [[title, [points]]], formulas: [], exam: [], traps: [] } }.
//
// General Aptitude and Engineering Mathematics are shared by every paper (ga.js, em.js; em.js also covers CS's maths chapters).
// Every other subject is per paper (<paper>-<subjectId>.js, e.g. ee-ps.js), because subject ids repeat across papers with
// different meanings (ps is Power Systems in EE but Probability & Statistics in DA).
import { BRANCH, SUBJECTS } from './data.js';

const SHARED = new Set(['ga', 'em']);
const cache = {};

const fileFor = (sub) => (SHARED.has(sub) ? sub : `${BRANCH.id.toLowerCase()}-${sub}`);

export async function subjectNotes(sub) {
  if (!SUBJECTS.some((s) => s.id === sub)) return {};
  const f = fileFor(sub);
  if (!cache[f]) {
    cache[f] = import(`./keynotes/${f}.js`).then((m) => m.CONTENT || {}).catch(() => {
      delete cache[f]; // let a later visit retry (e.g. after a network blip)
      return {};
    });
  }
  return cache[f];
}

export async function keyNotes(sub, ch) {
  return (await subjectNotes(sub))[ch] || null;
}

export function keyNotesMarkdown(n) {
  if (!n) return '';
  const out = [];
  const block = (title, items) => {
    if (items?.length) out.push(`## ${title}`, ...items.map((x) => `- ${x}`), '');
  };
  if (n.overview) out.push(n.overview, '');
  for (const [title, points] of n.sections || []) block(title, points);
  block('Formulas & key results', n.formulas);
  block('What GATE likes to ask', n.exam);
  block('Common traps', n.traps);
  return out.join('\n').trim();
}
