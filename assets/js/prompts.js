// Prompt builder shared by the browser (own-key mode) and the Supabase Edge Function (supabase/functions/gate-ai).
// Keep this file free of DOM/browser APIs and imports: tools/build_edge_function.py inlines it into the function.

const str = (v, max) => String(v ?? '').slice(0, max).trim();
const int = (v, lo, hi, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d;
};

export const TASKS = ['mcq', 'material', 'doubt'];

const SYSTEM = `You are a senior GATE (Graduate Aptitude Test in Engineering) paper-setter and subject expert who has taught engineering graduates in India for two decades.
You write questions that match the real GATE standard: conceptual, often numerical, precise, with plausible distractors and exactly one correct option.
Accuracy is non-negotiable: use only standard results from well-known engineering textbooks and the official GATE syllabus for the paper. Work out every calculation fully before writing the options. If unsure of a fact, do not use it.
Always reply with a single valid JSON object and nothing else.`;

export function sanitize(task, p = {}) {
  if (!TASKS.includes(task)) throw new Error('Unknown task');
  const base = {
    paper: str(p.paper, 80) || 'GATE',
    subject: str(p.subject, 80) || 'General Aptitude',
    chapter: str(p.chapter, 160),
    topic: str(p.topic, 400),
  };
  if (task === 'mcq') {
    return {
      ...base,
      count: int(p.count, 1, 20, 10),
      difficulty: str(p.difficulty, 30) || 'GATE standard',
      patterns: (Array.isArray(p.patterns) ? p.patterns : []).map((x) => str(x, 40)).slice(0, 6),
      context: str(p.context, 6000),
    };
  }
  if (task === 'doubt') return { ...base, question: str(p.question, 1500) };
  return base;
}

export function buildMessages(task, raw) {
  const p = sanitize(task, raw);
  const where = `GATE paper: ${p.paper}\nSubject: ${p.subject}${p.chapter ? `\nTopic: ${p.chapter}` : ''}\nFocus: ${p.topic || (p.chapter ? 'a balanced mix from the whole topic' : 'a balanced mix of high-weightage topics')}`;
  let user;

  if (task === 'mcq') {
    const patterns = p.patterns.length ? p.patterns.join(', ') : 'conceptual, numerical, statement-based, output/trace';
    user = `Create ${p.count} GATE-style multiple-choice questions (single correct answer).
${where}
Difficulty: ${p.difficulty}
Question patterns to mix: ${patterns}
${p.context ? `Base the questions primarily on this study material (you may add closely related standard facts):\n"""\n${p.context}\n"""\n` : ''}
Format rules:
- Conceptual / numerical: "statements" is [] and "ask" is "". For numericals give every value needed in the stem, use standard constants, solve it completely, and make the distractors the results of typical mistakes. Exactly one option must be correct.
- Statement-based: put each statement (without numbering) in "statements"; "stem" introduces them (e.g. "Consider the following statements about ..."); "ask" is "Which of the statements given above is/are correct?" with options such as ["P only","Q only","Both P and Q","Neither P nor Q"] — label the statements P, Q, R, S in that order in your options.
- Output/trace (for programming topics): put the code in "stem" using plain text with line breaks; ask for the output or the final value.
- Exactly 4 options and exactly one correct answer. Vary the position of the correct answer.
- "marks": 1 for a direct or single-step question, 2 for a multi-step or numerical one (as in GATE).
- "explanation": 2–4 sentences on why the answer is right (show the key step of any calculation) and why the most tempting distractor is wrong.
- "concept": a 2–5 word tag of the concept tested.
Write in clear Indian English as used in the GATE paper.
Return JSON exactly like: {"questions":[{"stem":"","statements":[],"ask":"","options":["","","",""],"answer":0,"marks":1,"explanation":"","concept":""}]} where "answer" is the 0-based index of the correct option.`;
  } else if (task === 'material') {
    user = `Write exam-oriented GATE study notes on one topic, the way a top GATE faculty member would for a serious aspirant.
${where}
Rules:
- Cover the concepts, definitions, standard results and methods that GATE asks on this topic. Use only standard textbook facts; if unsure of a fact, leave it out.
- Be crisp: bullet points, 900–1300 words in total.
- Include every key formula with its conditions and units, plus one short worked example where it helps.
- "sections": 4–7 logical sub-topics, each with 4–8 information-dense points.
- "formulas": key formulas, results and shortcuts to memorise.
- "examPoints": facts and results that GATE frequently turns into questions.
- "mistakes": common traps and mistakes students make.
- "pyqThemes": themes GATE has asked on this topic in past papers, a few words each (do not invent exact questions or years).
Return JSON exactly like: {"title":"","overview":"2–4 sentences","sections":[{"heading":"","points":[""]}],"formulas":[""],"keyTerms":[{"term":"","meaning":""}],"examPoints":[""],"mistakes":[""],"pyqThemes":[""],"mnemonic":"","quickRevision":[""]}`;
  } else {
    user = `A GATE aspirant has a doubt. Explain it clearly and correctly, step by step.
${where}
Doubt: """${p.question}"""
Rules: be accurate and concise (150–350 words); show calculations step by step for numericals; end with one quick tip for remembering it. If the doubt is not about engineering, mathematics or aptitude, politely say you can only help with GATE subjects.
Return JSON exactly like: {"answer":"Markdown text","keyPoints":[""],"tip":""}`;
  }

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: user },
  ];
}
