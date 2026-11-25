// FAQs: about YourGATEBuddy and about the GATE exam. Static content; answers support **bold** via md().
import { icon } from '../icons.js';
import { esc } from '../utils.js';
import { md } from '../md.js';
import { config } from '../config.js';
import { CONTACT } from './contact.js';

const FAQS = () => [
  {
    id: 'app', title: 'About YourGATEBuddy', icon: 'info', items: [
      ['What is YourGATEBuddy?', 'A free study companion for GATE aspirants in **CS, EE, EC, ME, CE, IN, CH and DA**. It brings together your paper\'s full syllabus with key notes, offline topic tests, AI quizzes and notes, timed practice papers, weekly goals, a daily tracker, a focus timer, reminders and a notebook with spaced revision, all in one place.'],
      ['Is it free?', 'Yes. Every feature is free to use. The built-in AI has a small daily allowance so the shared free quota lasts for everyone (see the AI questions below).'],
      ['Do I need an account?', 'No. Everything works as a guest, and your data stays in this browser. Sign in with Google (or an email link) from **Profile** only if you want your progress saved to your account and synced across devices.'],
      ['How do I change my GATE paper?', 'Open **Profile** and pick a different paper under **GATE paper**. The syllabus, key notes, question bank and practice papers switch to that paper. Your progress on each paper is kept.'],
      ['Can I use it on my phone?', 'Yes. The site works in any modern mobile browser. Use your browser\'s **Add to Home Screen** option to open it like an app.'],
      ['How do I report a problem or suggest a feature?', `Open the **Contact** page (in the menu and the footer), choose what your message is about and send it. You can also email **${CONTACT.email}**, or follow and message us on Instagram and X (formerly Twitter) at **@${CONTACT.instagram.handle}**.`],
      ['Is YourGATEBuddy affiliated with GATE, IISc or the IITs?', 'No. It is an independent study tool. Always check exam dates, eligibility and rules on the official website of the organising institute for your GATE year.'],
    ],
  },
  {
    id: 'quiz', title: 'Quizzes & study material', icon: 'target', items: [
      ['What is the offline topic test?', 'A ready-made question bank with **at least 30 GATE-style questions on every syllabus topic** of every paper, including General Aptitude and Engineering Mathematics. It needs no AI and no internet once the page has loaded. Choose a set of **5 to 30 questions** under **Quiz → Topic test**, or start one from any topic page in **Study Material**. Questions and answer options are shuffled each time.'],
      ['How is the quiz scored?', 'Just like GATE MCQs: a **1-mark** question gives **+1** for a correct answer and **−⅓** for a wrong one; a **2-mark** question gives **+2** and **−⅔**. Unattempted questions score zero.'],
      ['What is the difference between practice mode and exam mode?', 'In **practice mode** you see the answer and explanation right after each question. In **exam mode** you answer everything first, can mark questions for review, and see the full analysis after you submit.'],
      ['What is a practice paper?', 'A timed test in GATE proportions: General Aptitude, Engineering Mathematics and your core subjects, at GATE pace (about 2.8 minutes a question) with GATE marking. The **full-length paper** has 65 questions, like the real exam.'],
      ['Where do my mistakes go?', 'After a quiz, tap **Save mistakes to Notes**. Your wrong and skipped questions become a note that is scheduled for revision the next day.'],
      ['What are key notes and AI notes?', 'Every syllabus topic has **key notes**: a short, offline summary with formulas, what GATE likes to ask and common traps. **AI notes** are longer and generated on demand. Both can be saved to your notebook.'],
    ],
  },
  {
    id: 'ai', title: 'AI features', icon: 'sparkles', items: [
      ['How many AI requests do I get?', `Guests get **${config().aiGuestLimit} a day** and signed-in users get **${config().aiDailyLimit} a day**. Each AI quiz, AI notes page or doubt you ask uses one request. The count resets every day.`],
      ['How can I get unlimited AI?', 'Add your own free Google Gemini key under **Settings → AI quiz engine → Advanced**. Requests then go straight from your browser to Google, and the daily allowance no longer applies. Your key stays on this device; it is never synced or included in exports.'],
      ['Can AI answers be wrong?', 'Yes, occasionally, especially in long numericals. Always cross-check formulas, values and derivations with a standard textbook before you rely on them.'],
      ['How do I ask a doubt?', 'Open any topic in **Study Material** and type your question in the doubt box. The answer comes with key points and an exam tip.'],
    ],
  },
  {
    id: 'data', title: 'Your data & sync', icon: 'cloud', items: [
      ['Where is my data stored?', 'As a guest, everything stays in this browser\'s local storage. When you sign in, the same data is also saved to your account so it is available on your other devices.'],
      ['What happens if I clear my browser data?', 'Guest data is deleted with it. To be safe, sign in, or use **Export backup** under **Settings → Your data** from time to time.'],
      ['I used the site as a guest, then signed in. Will I lose my progress?', 'No. If both this device and your account have data, you are asked which one to keep.'],
      ['Can I move my data to another device without an account?', 'Yes. Use **Export backup** under **Settings → Your data** to download a JSON file, then **Import backup** on the other device.'],
      ['How do I delete my data?', 'To clear this device, use **Reset everything** under **Settings → Your data**. To remove your synced data, go to **Profile → Delete my data from the cloud**.'],
    ],
  },
  {
    id: 'gate', title: 'About the GATE exam', icon: 'book', items: [
      ['What is GATE?', 'The **Graduate Aptitude Test in Engineering** is a national exam conducted jointly by **IISc Bengaluru and seven IITs** (Bombay, Delhi, Guwahati, Kanpur, Kharagpur, Madras and Roorkee). One of them organises it each year. The score is used for M.Tech/ME and direct PhD admissions, some scholarships, and recruitment by many PSUs.'],
      ['What is the exam pattern?', 'A **3-hour** computer-based test with **65 questions** worth **100 marks**. **General Aptitude** carries **15 marks** (10 questions) in every paper. In most papers **Engineering Mathematics** carries about **13 marks** and the core subject the remaining **72**. A virtual on-screen calculator is provided.'],
      ['What types of questions are asked?', 'Three types: **MCQ** (one correct option out of four), **MSQ** (one or more correct options) and **NAT** (numerical answer typed in, no options). Questions carry 1 or 2 marks.'],
      ['Is there negative marking?', 'Only for **MCQs**: a wrong answer loses **⅓ mark** on a 1-mark question and **⅔ mark** on a 2-mark question. **MSQ and NAT** questions have **no negative marking** and no partial credit.'],
      ['Who is eligible?', 'Candidates in the **third or a higher year** of an undergraduate degree, or who have completed one, in engineering, technology, architecture, science, commerce or arts (as listed in the brochure). There is **no age limit**. **Always confirm in the current year\'s information brochure.**'],
      ['Can I write two papers?', 'Yes. You may appear in **two papers** from the allowed combinations listed in the brochure (for example CS with DA). Each paper is scored separately.'],
      ['What are GATE marks, normalised marks and the GATE score?', 'Your raw marks are out of 100. For papers held in more than one session (such as CS and CE), marks are **normalised** across sessions. The **GATE score** (out of 1000) is calculated from your marks and the paper\'s toppers and qualifying marks, and is what institutes and PSUs use.'],
      ['How long is the GATE score valid?', 'The score is valid for **3 years** from the date the result is announced.'],
      ['When is GATE 2027?', 'The app pre-fills **6 February 2027**, because GATE is usually held over the first two weekends of February. Update your exam date in **Profile** once the organising institute announces the schedule.'],
    ],
  },
];

export function mount(el) {
  const sections = FAQS();
  let q = '';
  let open = null; // section filter

  const item = ([ques, ans]) => `
    <details class="faq-item">
      <summary><span>${esc(ques)}</span>${icon('right', 16)}</summary>
      <div class="faq-a md">${md(ans)}</div>
    </details>`;

  const draw = () => {
    const needle = q.trim().toLowerCase();
    const shown = sections
      .filter((s) => !open || s.id === open)
      .map((s) => ({ ...s, items: s.items.filter(([a, b]) => !needle || (a + ' ' + b).toLowerCase().includes(needle)) }))
      .filter((s) => s.items.length);
    el.querySelector('#faqList').innerHTML = shown.length
      ? shown.map((s) => `
        <section class="card faq-sec">
          <div class="card-head"><h3>${icon(s.icon, 17)} ${esc(s.title)}</h3></div>
          ${s.items.map(item).join('')}
        </section>`).join('')
      : `<div class="card"><p class="muted">No questions match “${esc(q)}”. Try another word.</p></div>`;
    el.querySelectorAll('[data-sec]').forEach((b) => b.classList.toggle('on', (b.dataset.sec || null) === open));
    if (needle) el.querySelectorAll('.faq-item').forEach((d) => (d.open = true));
  };

  el.innerHTML = `
    <div class="stack" style="gap:16px;max-width:860px">
      <div class="faq-search"><span class="faq-search-ico">${icon('search', 17)}</span><input class="input" id="faqQ" type="search" placeholder="Search the FAQs" autocomplete="off" aria-label="Search the FAQs"></div>
      <div class="row wrap" style="gap:6px">
        <button class="chip on" data-sec="">All</button>
        ${sections.map((s) => `<button class="chip" data-sec="${s.id}">${esc(s.title)}</button>`).join('')}
      </div>
      <div class="stack" id="faqList" style="gap:16px"></div>
      <p class="hint">Still stuck? Read the <a href="privacy.html">Privacy</a> and <a href="terms.html">Terms</a> pages, <a href="#/contact">contact us</a>, or check the official GATE information brochure for your exam year.</p>
    </div>`;

  el.addEventListener('input', (e) => {
    if (e.target.id === 'faqQ') { q = e.target.value; draw(); }
  });
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sec]');
    if (b) { open = b.dataset.sec || null; draw(); }
  });
  draw();
}
