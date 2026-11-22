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
| **Sign in & cloud sync** | Google or email/password accounts (Firebase). Profile, quiz history, syllabus progress, reminders, saved questions and the activity log sync across devices. Guest progress is uploaded on first sign-in |
| **History** | A day-by-day timeline of every activity (quizzes, completed topics, saved questions, reminders, sign-ins) plus a **Saved questions** revision set you can practise |
| **Progress report** | One-click printable / PDF progress report |
| **Guest mode** | Works without an account. Data stays in `localStorage`, with export, import and reset |
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
assets/js/firebase-config.js  Your Firebase project config (null = guest-only mode)
assets/js/cloud.js    Sign-in + Firestore sync (ES module, Firebase SDK from CDN)
firestore.rules       Security rules: each user can only access their own data
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

## Set up sign-in (Firebase, free tier)

Until this is done the site runs in guest mode and the sign-in buttons are hidden.

1. Go to <https://console.firebase.google.com> → **Add project** (Google Analytics is optional).
2. **Project settings → General → Your apps → Web (`</>`)** → register the app, then copy the `firebaseConfig` object into `assets/js/firebase-config.js` (replace `null`).
3. **Authentication → Get started → Sign-in method**: enable **Google** and **Email/Password**.
4. **Authentication → Settings → Authorized domains**: add `yourgatebuddy.com` (and `www.yourgatebuddy.com`). `localhost` is allowed by default.
5. **Firestore Database → Create database** (production mode, a region near your users such as `asia-south1` Mumbai). Then open the **Rules** tab, paste the contents of `firestore.rules`, and click **Publish**.
6. Reload the site. "Sign in" now appears in the top bar.

Data layout: `users/{uid}` (profile, settings, syllabus, reminders, saved questions), `users/{uid}/attempts/{id}` (quiz history), and `users/{uid}/events/{id}` (activity log).

## AI quizzes

AI quizzes call the Claude Messages API (`claude-opus-5-5` by default) and use structured outputs, so questions always come back as valid JSON. Right now each learner pastes **their own** Anthropic API key in **Settings**. The key is stored only in their browser.

**Before a public launch**, move the call to a small backend (for example a Vercel or Cloudflare function) that holds your key, adds rate limiting, and is exposed as `ENDPOINT` in `assets/js/ai.js`. Then remove the key field from Settings. This lets visitors use AI quizzes without their own key, and your key stays off the client.

## Ideas for next steps

- Push notifications through a service worker, so reminders work when the tab is closed (and as an installable PWA)
- Full-length timed mock tests with GATE marking (negative marking, NAT and MSQ questions)
- Previous-year question bank by year and paper
- More papers (BT, PI, AE, MA, PH and others)
