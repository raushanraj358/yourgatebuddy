# YourGATEBuddy

**yourgatebuddy.com** is a free, AI-powered study companion for GATE aspirants.

**Prepare · Practise · Revise · Crack GATE**

## Features

| Feature | What it does |
|---|---|
| **8 GATE papers** | CSE/IT (CS), Electrical (EE), ECE (EC), Mechanical (ME), Civil (CE), Instrumentation (IN), Chemical (CH), Data Science & AI (DA), plus General Aptitude and Engineering Mathematics |
| **AI quiz** | Claude generates fresh GATE-style MCQs with explanations for any subject, topic and difficulty |
| **Smart practice** | A built-in question bank that works offline and favours unseen questions and your weakest subjects |
| **Syllabus tracker** | Subject → topic checklist for each paper, with approximate marks weightage |
| **Progress tracking** | Streaks, daily goal ring, 14-day activity chart, accuracy by subject, quiz history |
| **Reminders** | Weekly or daily study reminders as browser notifications, plus a `.ics` file for Google or Apple Calendar |
| **Dashboard** | Exam countdown, today's goal, weak areas, upcoming reminders, tip of the day |
| **Private** | No account needed. Data is stored in `localStorage`, with export, import and reset |
| **Light and dark mode**, responsive layout with a mobile tab bar |

## Tech

A static site with no build step: plain HTML, CSS and JavaScript, using hash routing (`#/dashboard`, `#/study`, `#/quiz`, `#/progress`, `#/reminders`, `#/settings`, `#/profile`).

```
index.html            App shell
privacy.html, terms.html
assets/css/styles.css Design system (tokens, light/dark)
assets/js/data.js     Papers, syllabus, question bank, tips
assets/js/store.js    localStorage persistence + derived stats
assets/js/ai.js       Claude quiz generation (structured JSON output)
assets/js/app.js      Router + all views
assets/img/logo.svg
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload the folder to any static host, such as Netlify, Vercel, GitHub Pages, Cloudflare Pages or S3, and point `yourgatebuddy.com` at it.

## AI quizzes

AI quizzes call the Claude Messages API (`claude-opus-5-5` by default) and use structured outputs, so questions always come back as valid JSON. Right now each learner pastes **their own** Anthropic API key in **Settings**. The key is stored only in their browser.

**Before a public launch**, move the call to a small backend (for example a Vercel or Cloudflare function) that holds your key, adds rate limiting, and is exposed as `ENDPOINT` in `assets/js/ai.js`. Then remove the key field from Settings. This lets visitors use AI quizzes without their own key, and your key stays off the client.

## Ideas for next steps

- User accounts and cloud sync (Supabase or Firebase)
- Push notifications through a service worker, so reminders work when the tab is closed (and as an installable PWA)
- Full-length timed mock tests with GATE marking (negative marking, NAT and MSQ questions)
- Previous-year question bank by year and paper
- More papers (BT, PI, AE, MA, PH and others)
