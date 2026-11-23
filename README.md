# YourGATEBuddy · www.yourgatebuddy.com

A calm, modern study companion for GATE aspirants: the full syllabus of your paper with a week-by-week study plan, offline topic tests,
AI quizzes and notes, timed GATE practice papers, goals, reminders and progress tracking.

**Prepare · Practise · Revise · Crack GATE**

**Live site:** https://www.yourgatebuddy.com

No install and no build step. It's a static web app on GitHub Pages, with optional accounts and free AI powered by Supabase.
It shares its design and architecture with [YourNEETBuddy](https://yourneetbuddy.com) and [YourIASBuddy](https://youriasbuddy.com).

## Features

| Section | What it does |
|---|---|
| **8 GATE papers** | CSE/IT (CS), Electrical (EE), ECE (EC), Mechanical (ME), Civil (CE), Instrumentation (IN), Chemical (CH), Data Science & AI (DA), each with General Aptitude and its Engineering Mathematics. Pick one at onboarding; switch any time in Profile |
| **Dashboard** | Countdown to GATE, today's hours vs target, streak, tasks, quiz accuracy, syllabus covered per subject, goals, weekly chart, reminders, revision queue |
| **Study Material** | Subject → topic → sub-topic checklist for your paper, with weightage. Each topic has a status (Not started / Studying / Done / Revised), **AI study notes**, an **AI doubt solver** and quizzes |
| **Study plan** | Spreads your unfinished topics over the weeks left before the exam (high-weightage and weak subjects first), with the last weeks kept for revision and practice papers. Updates as you mark topics done |
| **Quiz & Practice Papers** | **Topic tests** from a built-in bank of ~180 GATE-style questions (works offline), **AI quizzes** on any topic (conceptual, numerical, statement-based, output/trace), and **timed practice papers** in GATE proportions. GATE marking: 1- and 2-mark questions, −⅓ / −⅔ for wrong answers. Mistake book → Notes |
| **Goals** | Weekly targets (hours, topics, questions) tracked automatically, target marks out of 100 with the pace needed, personal goals with deadlines |
| **Daily Tracker** | Week-strip planner, subject-tagged tasks, a GATE day template, habits, consistency heatmap |
| **Study Hours** | Pomodoro + stopwatch, manual logging, charts, subject split, heatmap |
| **Reminders** | Once / daily / weekdays / weekly reminders with GATE presets, browser notifications + chime |
| **Notes** | Markdown notebook with highlights, subject filters, search, pinning, spaced revision (1-3-7-15-30-60 days), "Quiz me on this note" |
| **Resources** | Standard books for your paper, NPTEL and other free courses, previous papers, plus your own links |
| **Profile** | Continue with Google (or an email link) to save and sync progress across devices. Paper, exam date, daily target, target marks, lifetime stats |
| **Settings** | AI (built-in free AI, or your own Gemini/OpenAI key), theme & sound, JSON backup/restore |

**No account needed.** Guests can use everything and their data stays in the browser. Signing in saves the same data to the user's account.
Progress from the first version of the site (localStorage key `ygb.v1`) is imported automatically on the first visit: paper, finished topics,
quiz history, reminders and saved questions (as a note).

## How it's hosted (all free)

| Piece | Service | Notes |
|---|---|---|
| Website | GitHub Pages + custom domain `www.yourgatebuddy.com` | Every push to `main` publishes the site via `.github/workflows/jekyll-gh-pages.yml` |
| Sign-in | Supabase Auth | Google sign-in (email magic link as a fallback) |
| Cloud sync | Supabase Postgres | One row per user in `gate_user_data`, protected by row-level security |
| Free AI | Supabase Edge Function `gate-ai` | Holds the Gemini key |
| AI model | Google Gemini free tier | Free as long as billing is **not** enabled on the Google project |

## One-time setup

The site works in guest mode before any of this is done (topic tests, practice papers, the study plan and tracking need no setup).
Until `assets/js/config.js` has a Supabase URL and key, the sign-in buttons are hidden and AI needs the visitor's own key.

### 1. Publish on GitHub Pages
1. Repo → **Settings → Pages → Source: GitHub Actions**. The workflow deploys on every push to `main`.
2. Point `yourgatebuddy.com` at GitHub Pages (`A`/`AAAA` records for `@`, `CNAME` `www` → `raushanraj358.github.io`) and set the custom domain
   to `www.yourgatebuddy.com` in **Settings → Pages** (GitHub then redirects the apex to `www`), then tick **Enforce HTTPS**.

### 2. Supabase: database + free AI
Use a new Supabase project for YourGATEBuddy, **or** reuse an existing one (all database objects are prefixed `gate_` and the function is
named `gate-ai`, so they don't clash with YourNEETBuddy's `neet_*` objects).
1. Copy the **Project URL** and the **publishable / anon key** (Project Settings → API) into [`assets/js/config.js`](assets/js/config.js).
2. **SQL Editor → New query**: paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
3. **Edge Functions → Deploy a new function → Via Editor**: name it exactly `gate-ai`, paste the whole of
   [`supabase/functions/gate-ai/index.ts`](supabase/functions/gate-ai/index.ts) → **Deploy**. Turn **OFF** "Verify JWT".
4. **Edge Functions → Secrets**: add `GEMINI_API_KEY` (from https://aistudio.google.com/apikey; keep billing off).
   Optional: `ALLOWED_ORIGINS`, `AI_DAILY_LIMIT` (default 25), `AI_GUEST_DAILY_LIMIT` (default 5), `GEMINI_MODEL`.
   If you reuse a project that already has a `GEMINI_API_KEY`, the same secret serves both functions.

### 3. Google sign-in
1. Supabase → **Authentication → URL Configuration**: Site URL `https://www.yourgatebuddy.com/`; Redirect URLs
   `https://yourgatebuddy.com/`, `https://www.yourgatebuddy.com/`, `https://raushanraj358.github.io/yourgatebuddy/`, `http://localhost:5173/`.
   (In a shared project, add these alongside the existing site's URLs.)
2. Google Cloud Console → **Google Auth Platform**: External audience; Branding with home/privacy/terms pages on `https://www.yourgatebuddy.com/` and the
   authorised domains `yourgatebuddy.com` + `<project-ref>.supabase.co`; then publish the app.
3. **Clients → Create client → Web application**: JavaScript origins `https://yourgatebuddy.com`, `https://www.yourgatebuddy.com`,
   `http://localhost:5173`; redirect URI `https://<project-ref>.supabase.co/auth/v1/callback`.
4. Supabase → **Authentication → Sign In / Providers → Google**: enable, paste the client ID and secret, Save.

## Run locally

```bash
cd yourgatebuddy
python3 -m http.server 5173
# open http://localhost:5173
```

## Editing content

- **Papers, subjects, topics and sub-topics** (with weightage and approximate marks): `SYLLABUS` in [`assets/js/data.js`](assets/js/data.js).
  Subject and topic ids are stored in user data: don't rename them. Adding topics or sub-topics is safe.
- **Offline question bank**: `BANK` in [`assets/js/content.js`](assets/js/content.js). Items are
  `[paper ('*' = all), subject id, topic id, question, [A, B, C, D], correctIndex, explanation, marks (1 or 2)]`.
  Option order is shuffled at runtime unless an option says "All of these", "Both…", "None…".
- **Resources**: `ALL_LIBRARY` in `data.js` (`branch: [...]` limits an item to some papers).
- **AI prompts**: `assets/js/prompts.js`, then run `python3 tools/build_edge_function.py` and redeploy the `gate-ai` function.

## Notes

- GATE 2027 is pre-filled as **6 February 2027** (GATE is usually held over the first two weekends of February). Update `EXAM.date` in
  `data.js` once the organising IIT announces the schedule; learners can also set their own paper's date.
- Topic weightage (High/Medium/Low) and subject marks are guides based on recent papers, not official figures.
- AI content and the question bank can contain mistakes. Cross-check against standard textbooks.
- Not affiliated with the IITs, IISc or the GATE organising committee.
