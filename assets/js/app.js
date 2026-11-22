/* YourGATEBuddy — single-page app (hash router + views). */
(function () {
  "use strict";
  const { BRANCHES, BANK, TIPS } = window.GB_DATA;
  const Store = window.GB_STORE;
  const AI = window.GB_AI;

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const branchById = (id) => BRANCHES.find((b) => b.id === id);
  const subjectName = (branch, sid) => (branch.subjects.find((x) => x.id === sid) || {}).name || "Mixed";
  const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const LETTERS = ["A", "B", "C", "D"];
  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const DEFAULT_EXAM = "2027-02-06"; // tentative — learners can change this in Profile

  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    spark: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.38.37.72.68 1 .31.27.7.43 1.11.44H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4 3 7 7 7z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
    cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    wave: '<path d="M2 12h3l3-8 4 16 3-8h7"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M10 22v-4h4v4"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-11V3"/><path d="M7 15h10"/>',
    brain: '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 4 3 3 0 0 0 3-2V5a3 3 0 0 0-3-2z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 4 3 3 0 0 1-3-2"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M14 9l2 2"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  };
  const icon = (name, cls = "icon") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  function toast(msg, ico = "check") {
    const box = $("#toasts");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `${icon(ico)}<div>${esc(msg)}</div>`;
    box.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }

  function applyTheme() {
    const t = Store.get().settings.theme;
    if (t === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }

  function download(name, text, type = "text/plain") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ---------- chrome (nav) ----------
  const APP_NAV = [
    { r: "dashboard", label: "Dashboard", ic: "home" },
    { r: "study", label: "Study", ic: "book" },
    { r: "quiz", label: "AI Quiz", ic: "spark" },
    { r: "progress", label: "Progress", ic: "chart" },
    { r: "reminders", label: "Reminders", ic: "bell" },
  ];
  function renderChrome(route) {
    const onboarded = !!Store.get().profile;
    const publicRoute = !onboarded || route === "home" || route === "onboard";
    document.body.classList.toggle("app-mode", !publicRoute);
    const nav = $("#nav");
    if (publicRoute) {
      nav.className = "nav nav-public";
      nav.innerHTML = `
        <a href="#/home#features">Features</a>
        <a href="#/home#branches">Branches</a>
        <a href="#/home#how">How it works</a>
        <a class="btn btn-primary btn-sm" href="${onboarded ? "#/dashboard" : "#/onboard"}">${onboarded ? "Open dashboard" : "Start free"}</a>`;
    } else {
      nav.className = "nav";
      nav.innerHTML = APP_NAV.map((n) => `<a href="#/${n.r}" class="${route === n.r ? "active" : ""}">${icon(n.ic)}<span>${n.label}</span></a>`).join("") +
        `<a href="#/settings" title="Settings" class="${route === "settings" ? "active" : ""}">${icon("gear")}<span class="sr-only">Settings</span></a>
         <a href="#/profile" title="Profile" class="${route === "profile" ? "active" : ""}">${icon("user")}<span class="sr-only">Profile</span></a>`;
    }
    $("#tabbar").innerHTML = publicRoute ? "" : APP_NAV.map((n) =>
      `<a href="#/${n.r}" class="${route === n.r ? "active" : ""}">${icon(n.ic)}<span>${n.label.replace("AI ", "")}</span></a>`).join("");
    $("#tabbar").style.display = publicRoute ? "none" : "";
  }

  // ---------- views ----------
  const views = {};

  // Landing
  views.home = () => {
    const onboarded = !!Store.get().profile;
    const startHref = onboarded ? "#/dashboard" : "#/onboard";
    return `
    <section class="hero">
      <div>
        <span class="eyebrow">${icon("spark")} AI-powered GATE companion</span>
        <h1>Prepare smarter.<br/><span class="grad">Crack GATE with confidence.</span></h1>
        <p class="lead">YourGATEBuddy is a free study companion for every GATE paper: CSE/IT, Electrical, ECE, Mechanical, Civil and more. Practise with AI-generated quizzes, track your syllabus and accuracy, and get reminders so you keep studying every day.</p>
        <div class="row">
          <a class="btn btn-primary btn-lg" href="${startHref}">${onboarded ? "Go to dashboard" : "Start preparing — it's free"} ${icon("arrow")}</a>
          <a class="btn btn-ghost btn-lg" href="#/home#features">Explore features</a>
        </div>
        <div class="hero-stats">
          <div><b>${BRANCHES.length}</b><span>GATE papers</span></div>
          <div><b>${BRANCHES.reduce((n, b) => n + b.subjects.reduce((m, s) => m + s.topics.length, 0), 0)}+</b><span>syllabus topics</span></div>
          <div><b>∞</b><span>AI practice questions</span></div>
        </div>
      </div>
      <div class="mock" aria-hidden="true">
        <div class="card">
          <div class="spread" style="margin-bottom:12px"><b>Today's AI Quiz</b><span class="chip chip-primary">Algorithms</span></div>
          <div class="qtext" style="font-size:1rem">The worst-case time complexity of binary search on n sorted elements is</div>
          <div class="options">
            <div class="opt"><span class="key">A</span>O(1)</div>
            <div class="opt correct"><span class="key">B</span>O(log n)</div>
            <div class="opt"><span class="key">C</span>O(n)</div>
          </div>
        </div>
        <div class="card float">
          <div class="row" style="gap:14px"><div class="ring" style="--p:72;width:64px;height:64px"><div style="width:48px;height:48px"><b style="font-size:.95rem">72%</b></div></div>
          <div><b>Syllabus</b><div class="muted small">🔥 12-day streak</div></div></div>
        </div>
      </div>
    </section>

    <section class="section" id="features">
      <div class="section-head"><h2>Everything you need to stay on track</h2><p>Built for the way GATE aspirants actually study: short daily sessions, steady revision and honest self-assessment.</p></div>
      <div class="grid grid-3">
        ${[
          ["spark", "AI quiz generator", "Pick a subject and topic and get fresh GATE-style MCQs with step-by-step explanations, generated by Claude."],
          ["target", "Smart practice", "A built-in question bank that leans toward your weakest subjects, so revision time goes where it's needed."],
          ["chart", "Progress tracking", "Accuracy by subject, a daily activity chart, study streaks and quiz history."],
          ["book", "Syllabus tracker", "The complete subject and topic list for your paper. Tick off topics as you finish them."],
          ["bell", "Study reminders", "Daily or weekly reminders as browser notifications, and you can add them to Google or Apple Calendar."],
          ["shield", "Private by design", "No sign-up needed. Your progress stays on your device, and you can export or import it any time."],
        ].map(([ic, t, d]) => `<div class="card feature"><div class="ficon">${icon(ic)}</div><h3>${t}</h3><p>${d}</p></div>`).join("")}
      </div>
    </section>

    <section class="section" id="branches">
      <div class="section-head"><h2>Every major GATE paper</h2><p>The syllabus and practice questions for each paper, plus General Aptitude and Engineering Mathematics.</p></div>
      <div class="grid grid-4">
        ${BRANCHES.map((b) => `<a class="card branch-card" href="${onboarded ? "#/study" : "#/onboard?branch=" + b.id}">
          <span class="bicon" style="background:${b.color}">${icon(b.icon)}</span>
          <div><b>${b.short}</b><span>${b.id} · ${b.subjects.length} subjects</span></div></a>`).join("")}
      </div>
    </section>

    <section class="section" id="how">
      <div class="section-head"><h2>How it works</h2></div>
      <div class="grid grid-3 steps">
        <div class="card step"><h3>Pick your paper</h3><p class="muted">Choose your GATE branch, target year and daily question goal. It takes about 30 seconds.</p></div>
        <div class="card step"><h3>Study &amp; practise</h3><p class="muted">Work through the syllabus and take a quick quiz every day, either from the question bank or AI-generated.</p></div>
        <div class="card step"><h3>Track &amp; improve</h3><p class="muted">See your weak areas, keep your streak going, and let reminders keep you consistent.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="card cta"><h2>Your GATE journey starts today</h2><p>Free to use. No account needed.</p><a class="btn btn-lg" href="${startHref}">${onboarded ? "Open dashboard" : "Get started"} ${icon("arrow")}</a></div>
    </section>`;
  };

  // Onboarding
  views.onboard = (params) => {
    const p = Store.get().profile || {};
    const pre = p.branch || params.get("branch") || "";
    const year = new Date().getFullYear();
    return `
    <div style="max-width:860px;margin:0 auto">
      <div class="page-head"><h1>Let's set up your prep</h1><p class="muted">Choose your GATE paper. You can change it later in your profile.</p></div>
      <form id="onboard-form" class="stack">
        <div class="grid grid-2" id="branch-pick">
          ${BRANCHES.map((b) => `<button type="button" class="card branch-card ${pre === b.id ? "selected" : ""}" data-branch="${b.id}">
            <span class="bicon" style="background:${b.color}">${icon(b.icon)}</span>
            <div><b>${b.name}</b><span>Paper code ${b.id}</span></div></button>`).join("")}
        </div>
        <div class="card form-grid">
          <label class="field"><span>Your name</span><input name="name" required maxlength="40" placeholder="e.g. Aarav" value="${esc(p.name || "")}"/></label>
          <label class="field"><span>Target year</span><select name="targetYear">${[year, year + 1, year + 2].map((y) => `<option ${String(p.targetYear || year + 1) === String(y) ? "selected" : ""}>${y}</option>`).join("")}</select></label>
          <label class="field"><span>Exam date (tentative)</span><input type="date" name="examDate" value="${esc(p.examDate || DEFAULT_EXAM)}"/></label>
          <label class="field"><span>Daily goal (questions)</span><input type="number" name="dailyGoal" min="5" max="200" value="${esc(p.dailyGoal || 20)}"/></label>
        </div>
        <input type="hidden" name="branch" value="${esc(pre)}"/>
        <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to dashboard ${icon("arrow")}</button>
      </form>
    </div>`;
  };
  views.onboard.mount = () => {
    const form = $("#onboard-form");
    $$("#branch-pick [data-branch]").forEach((btn) => btn.addEventListener("click", () => {
      $$("#branch-pick .branch-card").forEach((x) => x.classList.remove("selected"));
      btn.classList.add("selected");
      form.branch.value = btn.dataset.branch;
    }));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.branch.value) { toast("Please choose your GATE paper first.", "target"); return; }
      Store.setProfile({
        name: form.name.value.trim(), branch: form.branch.value, targetYear: form.targetYear.value,
        examDate: form.examDate.value, dailyGoal: Math.max(5, parseInt(form.dailyGoal.value, 10) || 20),
      });
      toast("You're all set. Good luck!");
      location.hash = "#/dashboard";
    });
  };

  // Dashboard
  views.dashboard = () => {
    const st = Store.get(), p = st.profile, b = branchById(p.branch);
    const tot = Store.totals(b.id), syl = Store.syllabusProgress(b), streak = Store.streak();
    const today = st.activity[Store.todayKey()] || 0, goal = p.dailyGoal || 20;
    const examMs = new Date((p.examDate || DEFAULT_EXAM) + "T09:00:00") - new Date();
    const days = Math.max(0, Math.ceil(examMs / 864e5));
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const tip = TIPS[new Date().getDate() % TIPS.length];

    const weak = Object.entries(tot.bySubject).filter(([, v]) => v.total >= 3)
      .map(([sid, v]) => ({ sid, acc: Math.round((v.correct / v.total) * 100), n: v.total }))
      .sort((a, c) => a.acc - c.acc).slice(0, 3);
    const nextRem = upcomingReminders(3);

    return `
    <div class="grid" style="grid-template-columns:minmax(0,1fr)">
      <div class="card welcome">
        <div class="spread" style="align-items:flex-start">
          <div>
            <h1 style="margin-bottom:4px">${greet}, ${esc(p.name || "Aspirant")} 👋</h1>
            <p class="muted" style="margin:0">GATE ${esc(p.targetYear)} · ${esc(b.name)} (${b.id})</p>
            <div class="countdown">
              <div><b>${days}</b><span>days left</span></div>
              <div><b>${Math.floor(days / 7)}</b><span>weeks</span></div>
              <div><b>${syl.pct}%</b><span>syllabus</span></div>
            </div>
          </div>
          <div class="row">
            <a class="btn btn-primary" href="#/quiz?mode=smart">${icon("spark")} Daily quiz</a>
            <a class="btn" href="#/study">${icon("book")} Study plan</a>
          </div>
        </div>
      </div>

      <div class="grid grid-4">
        ${statCard("flame", streak + (streak === 1 ? " day" : " days"), "Study streak")}
        ${statCard("target", `${today}/${goal}`, "Today's questions")}
        ${statCard("check", tot.accuracy + "%", "Overall accuracy")}
        ${statCard("spark", tot.total, "Questions solved")}
      </div>

      <div class="grid grid-3">
        <div class="card">
          <div class="card-title">${icon("target")} Today's goal</div>
          <div class="row" style="gap:18px">
            <div class="ring" style="--p:${Math.min(100, Math.round((today / goal) * 100))}"><div><div><b>${Math.min(100, Math.round((today / goal) * 100))}%</b><span>${today} of ${goal}</span></div></div></div>
            <div style="flex:1;min-width:140px">
              <p class="muted small">${today >= goal ? "Goal complete. Great work! 🎉" : `${goal - today} more questions to reach today's goal.`}</p>
              <a class="btn btn-primary btn-sm" href="#/quiz?mode=smart">Practise now</a>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${icon("chart")} Weak areas</div>
          ${weak.length ? `<ul class="list">${weak.map((w) => `<li><div class="grow"><div class="spread"><span class="small"><b>${esc(subjectName(b, w.sid))}</b></span><span class="small muted">${w.acc}%</span></div>
            <div class="bar ${w.acc < 50 ? "bad" : ""}" style="margin-top:6px"><i style="width:${w.acc}%"></i></div></div>
            <a class="btn btn-ghost btn-sm" href="#/quiz?subject=${w.sid}">Fix</a></li>`).join("")}</ul>`
            : `<div class="empty small">Take a few quizzes and your weakest subjects will show up here.</div>`}
        </div>
        <div class="card">
          <div class="card-title">${icon("bell")} Upcoming reminders</div>
          ${nextRem.length ? `<ul class="list">${nextRem.map((r) => `<li>${icon("clock")}<div class="grow"><b class="small">${esc(r.title)}</b><div class="muted small">${r.when}</div></div></li>`).join("")}</ul>`
            : `<div class="empty small">No reminders yet.<br/><a href="#/reminders">Set a daily study reminder →</a></div>`}
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-title">${icon("book")} Syllabus progress</div>
          ${b.subjects.slice(0, 6).map((s) => { const pp = syl.per[s.id]; return `
            <div style="margin-bottom:12px"><div class="spread small"><span>${esc(s.name)}</span><span class="muted">${pp.done}/${pp.all}</span></div>
            <div class="bar" style="margin-top:6px"><i style="width:${pp.pct}%"></i></div></div>`; }).join("")}
          <a href="#/study" class="small">View full syllabus →</a>
        </div>
        <div class="card">
          <div class="card-title">${icon("bulb")} Tip of the day</div>
          <p>${esc(tip)}</p>
          <div class="card-title" style="margin-top:18px">${icon("clock")} Recent quizzes</div>
          ${st.attempts.length ? `<ul class="list">${st.attempts.slice(0, 3).map(attemptRow).join("")}</ul>` : `<div class="empty small">No quizzes yet. <a href="#/quiz">Take your first one →</a></div>`}
        </div>
      </div>
    </div>`;
  };
  const statCard = (ic, val, label) => `<div class="card stat"><div class="sicon">${icon(ic)}</div><div><b>${esc(val)}</b><span>${label}</span></div></div>`;
  function attemptRow(a) {
    const b = branchById(a.branch) || BRANCHES[0];
    const pct = Math.round((a.correct / a.total) * 100);
    return `<li><span class="chip ${pct >= 70 ? "chip-success" : pct < 40 ? "chip-danger" : "chip-primary"}">${pct}%</span>
      <div class="grow"><b class="small">${esc(a.subject === "mixed" ? "Smart mix" : subjectName(b, a.subject))}</b>${a.mode === "ai" ? ' <span class="chip chip-primary">AI</span>' : ""}
      <div class="muted small">${a.correct}/${a.total} correct · ${new Date(a.date).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</div></div></li>`;
  }

  // Study
  views.study = () => {
    const b = branchById(Store.get().profile.branch);
    const syl = Store.syllabusProgress(b);
    return `
    <div class="page-head spread">
      <div><h1>Syllabus &amp; study plan</h1><p class="muted">${esc(b.name)} (${b.id}). Tick off topics as you finish them. Marks shown are approximate past-year averages.</p></div>
      <div class="ring" style="--p:${syl.pct};width:96px;height:96px"><div style="width:74px;height:74px"><div><b style="font-size:1.1rem">${syl.pct}%</b><span>done</span></div></div></div>
    </div>
    <div class="stack">
      ${b.subjects.map((s) => { const pp = syl.per[s.id]; return `
      <details class="card subject" ${pp.done && pp.done < pp.all ? "open" : ""}>
        <summary>
          <div class="grow">
            <div class="spread"><b>${esc(s.name)}</b><span class="chip">${s.marks ? "~" + s.marks + " marks" : ""}</span></div>
            <div class="row" style="margin-top:8px;gap:10px"><div class="bar ${pp.pct === 100 ? "good" : ""}" style="flex:1"><i style="width:${pp.pct}%"></i></div><span class="small muted">${pp.done}/${pp.all}</span></div>
          </div>
          ${icon("chev", "icon chev")}
        </summary>
        <div class="topics">
          ${s.topics.map((t, i) => { const done = Store.isStudied(b.id, s.id, i); return `
          <label class="topic ${done ? "done" : ""}"><input type="checkbox" data-topic="${s.id}:${i}" ${done ? "checked" : ""}/><span>${esc(t)}</span></label>`; }).join("")}
        </div>
        <div class="subject-actions">
          <a class="btn btn-primary btn-sm" href="#/quiz?subject=${s.id}">${icon("target")} Practise</a>
          <a class="btn btn-ghost btn-sm" href="#/quiz?subject=${s.id}&mode=ai">${icon("spark")} AI quiz</a>
        </div>
      </details>`; }).join("")}
    </div>`;
  };
  views.study.mount = () => {
    const b = Store.get().profile.branch;
    $$("[data-topic]").forEach((cb) => cb.addEventListener("change", () => {
      const [sid, idx] = cb.dataset.topic.split(":");
      Store.toggleTopic(b, sid, Number(idx));
      const scroll = window.scrollY;
      const openIds = $$("details.subject").map((d) => d.open);
      render();
      $$("details.subject").forEach((d, i) => { d.open = openIds[i]; });
      window.scrollTo(0, scroll);
    }));
  };

  // ---------- Quiz ----------
  const quiz = { phase: "setup", questions: [], idx: 0, answers: [], instant: true, seconds: 0, timer: null, cfg: null };

  function pickFromBank(branchId, subject, count, difficulty) {
    let pool = BANK.filter((x) => x.branch === branchId || (x.branch === "*" && !(branchId === "DA" && x.subject === "em")));
    if (subject && subject !== "mixed") pool = pool.filter((x) => x.subject === subject);
    if (difficulty) { const f = pool.filter((x) => x.d === Number(difficulty)); if (f.length >= Math.min(count, 3)) pool = f; }
    // Prefer unseen questions and weak subjects
    const seen = new Set();
    Store.get().attempts.forEach((a) => a.items.forEach((it) => it.qid && seen.add(it.qid)));
    const bySub = Store.totals(branchId).bySubject;
    const weight = (x) => {
      const s = bySub[x.subject];
      const weakness = s && s.total ? 1 - s.correct / s.total : 0.5;
      return (seen.has(x.id) ? 1 : 3) * (1 + weakness * 2) * Math.random();
    };
    return pool.map((x) => [x, weight(x)]).sort((a, c) => c[1] - a[1]).slice(0, count).map(([x]) => x);
  }

  function stopTimer() { if (quiz.timer) { clearInterval(quiz.timer); quiz.timer = null; } }

  views.quiz = (params) => {
    if (quiz.phase === "play") return quizPlay();
    if (quiz.phase === "result") return quizResult();
    if (quiz.phase === "loading") return `<div class="quiz-wrap card" style="text-align:center;padding:48px 20px"><div class="spinner"></div><h3>Generating your AI quiz…</h3><p class="muted">Writing fresh GATE-style questions. This usually takes a few seconds.</p></div>`;

    const st = Store.get(), b = branchById(st.profile.branch);
    const mode = params.get("mode") === "ai" ? "ai" : "bank";
    const subj = params.get("subject") || (params.get("mode") === "smart" ? "mixed" : "mixed");
    const hasKey = !!st.settings.apiKey;
    return `
    <div class="quiz-wrap">
      <div class="page-head"><h1>Quiz</h1><p class="muted">Practise from the question bank or have AI write new questions on any topic.</p></div>
      <form id="quiz-form" class="card stack">
        <div>
          <span class="small" style="font-weight:600;display:block;margin-bottom:6px">Question source</span>
          <div class="seg" id="mode-seg">
            <button type="button" data-mode="bank" class="${mode === "bank" ? "on" : ""}">${"Smart practice (question bank)"}</button>
            <button type="button" data-mode="ai" class="${mode === "ai" ? "on" : ""}">✨ AI generated</button>
          </div>
        </div>
        <div class="form-grid">
          <label class="field"><span>Subject</span><select name="subject">
            <option value="mixed">Smart mix (focus on weak areas)</option>
            ${b.subjects.map((s) => `<option value="${s.id}" ${subj === s.id ? "selected" : ""}>${esc(s.name)}</option>`).join("")}
          </select></label>
          <label class="field"><span>Number of questions</span><select name="count">${[5, 10, 15, 20].map((n) => `<option ${n === 10 ? "selected" : ""}>${n}</option>`).join("")}</select></label>
          <label class="field"><span>Difficulty</span><select name="difficulty"><option value="">Any</option><option value="1">Easy</option><option value="2" ${mode === "ai" ? "selected" : ""}>Medium</option><option value="3">Hard</option></select></label>
          <label class="field ai-only" ${mode === "ai" ? "" : "hidden"}><span>Topic (optional)</span><input name="topic" maxlength="80" placeholder="e.g. Dynamic programming, Bode plot"/></label>
        </div>
        <label class="row small"><input type="checkbox" name="instant" ${quiz.instant ? "checked" : ""}/> Show the answer and explanation after each question</label>
        <div class="ai-only" ${mode === "ai" ? "" : "hidden"}>
          ${hasKey ? `<p class="small muted" style="margin:0">${icon("spark", "icon")} Questions are generated by Claude using your API key.</p>`
            : `<div class="explain small">AI quizzes need a Claude API key. <a href="#/settings">Add one in Settings</a>; it's saved only in this browser. Smart practice works without one.</div>`}
        </div>
        <input type="hidden" name="mode" value="${mode}"/>
        <button class="btn btn-primary btn-lg btn-block" type="submit">Start quiz ${icon("arrow")}</button>
      </form>
    </div>`;
  };
  views.quiz.mount = () => {
    if (quiz.phase === "play") return mountPlay();
    if (quiz.phase === "result") return mountResult();
    const form = $("#quiz-form");
    if (!form) return;
    $$("#mode-seg button").forEach((btn) => btn.addEventListener("click", () => {
      $$("#mode-seg button").forEach((x) => x.classList.toggle("on", x === btn));
      form.mode.value = btn.dataset.mode;
      $$(".ai-only", form).forEach((el) => { el.hidden = btn.dataset.mode !== "ai"; });
    }));
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const st = Store.get(), b = branchById(st.profile.branch);
      const cfg = {
        mode: form.mode.value, subject: form.subject.value, count: Number(form.count.value),
        difficulty: form.difficulty.value, topic: form.topic.value.trim(), branch: b.id,
      };
      quiz.instant = form.instant.checked;
      let questions;
      if (cfg.mode === "ai") {
        if (!st.settings.apiKey) { toast("Add your Claude API key in Settings first.", "key"); location.hash = "#/settings"; return; }
        quiz.phase = "loading"; render();
        try {
          const subjName = cfg.subject === "mixed" ? "Mixed: all subjects in the syllabus" : subjectName(b, cfg.subject);
          questions = await AI.generateQuiz({
            apiKey: st.settings.apiKey, model: st.settings.aiModel, branchName: b.name, subjectName: subjName,
            topic: cfg.topic, count: cfg.count, difficulty: Number(cfg.difficulty) || 2,
          });
          questions = questions.map((x) => ({ ...x, subject: cfg.subject }));
        } catch (err) {
          quiz.phase = "setup"; render(); toast(err.message || "Could not generate the quiz.", "spark"); return;
        }
      } else {
        questions = pickFromBank(b.id, cfg.subject, cfg.count, cfg.difficulty);
        if (!questions.length) { toast("No bank questions for that subject yet. Try the AI quiz.", "spark"); return; }
        if (questions.length < cfg.count) toast(`Only ${questions.length} bank questions available here. Try AI for more.`, "bulb");
      }
      Object.assign(quiz, { phase: "play", questions, idx: 0, answers: new Array(questions.length).fill(null), seconds: 0, cfg });
      stopTimer();
      quiz.timer = setInterval(() => { quiz.seconds++; const t = $("#qtimer"); if (t) t.textContent = fmtTime(quiz.seconds); }, 1000);
      render();
    });
  };

  function quizPlay() {
    const q = quiz.questions[quiz.idx], chosen = quiz.answers[quiz.idx];
    const reveal = quiz.instant && chosen !== null;
    const b = branchById(quiz.cfg.branch);
    const last = quiz.idx === quiz.questions.length - 1;
    return `
    <div class="quiz-wrap">
      <div class="qhead">
        <div class="row"><span class="chip chip-primary">${esc(q.subject && q.subject !== "mixed" ? subjectName(b, q.subject) : (quiz.cfg.subject === "mixed" ? "Smart mix" : subjectName(b, quiz.cfg.subject)))}</span>${q.ai ? '<span class="chip">✨ AI</span>' : ""}</div>
        <span class="timer">${icon("clock")}<span id="qtimer">${fmtTime(quiz.seconds)}</span></span>
      </div>
      <div class="qdots">${quiz.questions.map((qq, i) => {
        const a = quiz.answers[i];
        const cls = i === quiz.idx ? "cur" : a === null ? "" : quiz.instant ? (a === qq.a ? "ok" : "no") : "cur";
        return `<i class="${cls}" title="Q${i + 1}"></i>`; }).join("")}</div>
      <div class="card">
        <div class="muted small" style="margin-bottom:6px">Question ${quiz.idx + 1} of ${quiz.questions.length}</div>
        <div class="qtext">${esc(q.q)}</div>
        <div class="options">
          ${q.o.map((opt, i) => {
            let cls = "";
            if (reveal) cls = i === q.a ? "correct" : i === chosen ? "wrong" : "";
            else if (i === chosen) cls = "selected";
            return `<button class="opt ${cls}" data-opt="${i}" ${reveal ? "disabled" : ""}><span class="key">${LETTERS[i]}</span><span>${esc(opt)}</span></button>`; }).join("")}
        </div>
        ${reveal ? `<div class="explain"><b>${chosen === q.a ? "✅ Correct!" : `❌ Correct answer: ${LETTERS[q.a]}`}</b><div class="small" style="margin-top:4px">${esc(q.ex)}</div></div>` : ""}
        <div class="spread" style="margin-top:18px">
          <button class="btn btn-ghost" id="q-prev" ${quiz.idx === 0 ? "disabled" : ""}>Previous</button>
          <div class="row">
            <button class="btn btn-ghost btn-sm" id="q-quit">Quit</button>
            ${last ? `<button class="btn btn-primary" id="q-submit">Submit quiz</button>` : `<button class="btn btn-primary" id="q-next">${chosen === null ? "Skip" : "Next"} ${icon("arrow")}</button>`}
          </div>
        </div>
      </div>
    </div>`;
  }
  function mountPlay() {
    $$("[data-opt]").forEach((btn) => btn.addEventListener("click", () => { quiz.answers[quiz.idx] = Number(btn.dataset.opt); render(); }));
    const go = (d) => { quiz.idx = Math.min(quiz.questions.length - 1, Math.max(0, quiz.idx + d)); render(); window.scrollTo(0, 0); };
    $("#q-prev")?.addEventListener("click", () => go(-1));
    $("#q-next")?.addEventListener("click", () => go(1));
    $("#q-quit")?.addEventListener("click", () => { if (confirm("Quit this quiz? Your answers won't be saved.")) { stopTimer(); quiz.phase = "setup"; render(); } });
    $("#q-submit")?.addEventListener("click", () => {
      const un = quiz.answers.filter((a) => a === null).length;
      if (un && !confirm(`You have ${un} unanswered question(s). Submit anyway?`)) return;
      finishQuiz();
    });
  }
  function finishQuiz() {
    stopTimer();
    const items = quiz.questions.map((q, i) => ({ qid: q.ai ? null : q.id, q: q.q, o: q.o, a: q.a, chosen: quiz.answers[i], ex: q.ex, subject: q.subject }));
    const answered = items.filter((x) => x.chosen !== null);
    const correct = answered.filter((x) => x.chosen === x.a).length;
    if (answered.length) {
      Store.addAttempt({ branch: quiz.cfg.branch, subject: quiz.cfg.subject, mode: quiz.cfg.mode, total: answered.length, correct, seconds: quiz.seconds, items: answered });
    }
    quiz.result = { items, correct, answered: answered.length };
    quiz.phase = "result";
    render(); window.scrollTo(0, 0);
  }
  function quizResult() {
    const r = quiz.result, total = quiz.questions.length;
    const pct = total ? Math.round((r.correct / total) * 100) : 0;
    const msg = pct >= 80 ? "Outstanding! 🏆" : pct >= 60 ? "Good job! 💪" : pct >= 40 ? "Keep practising 📚" : "Every expert was once a beginner 🌱";
    return `
    <div class="quiz-wrap stack">
      <div class="card score-hero">
        <div class="ring" style="--p:${pct}"><div><div><b>${pct}%</b><span>${r.correct}/${total} correct</span></div></div></div>
        <h2>${msg}</h2>
        <p class="muted">Time: ${fmtTime(quiz.seconds)} · Answered ${r.answered} of ${total}</p>
        <div class="row" style="justify-content:center">
          <button class="btn btn-primary" id="r-again">${icon("refresh")} New quiz</button>
          <a class="btn btn-ghost" href="#/progress">${icon("chart")} View progress</a>
        </div>
      </div>
      <div class="card">
        <div class="card-title">${icon("book")} Review answers</div>
        ${r.items.map((it, i) => `
          <div class="review-item">
            <div class="spread"><b class="small">Q${i + 1}</b>${it.chosen === null ? '<span class="chip">Skipped</span>' : it.chosen === it.a ? '<span class="chip chip-success">Correct</span>' : '<span class="chip chip-danger">Wrong</span>'}</div>
            <p style="margin:6px 0 8px;font-weight:600;white-space:pre-wrap">${esc(it.q)}</p>
            <div class="small">${it.chosen !== null && it.chosen !== it.a ? `<div style="color:var(--danger)">Your answer: ${LETTERS[it.chosen]}. ${esc(it.o[it.chosen])}</div>` : ""}
            <div style="color:var(--success)">Correct: ${LETTERS[it.a]}. ${esc(it.o[it.a])}</div>
            <div class="muted" style="margin-top:4px">${esc(it.ex)}</div></div>
          </div>`).join("")}
      </div>
    </div>`;
  }
  function mountResult() {
    $("#r-again")?.addEventListener("click", () => { quiz.phase = "setup"; render(); });
  }

  // Progress
  views.progress = () => {
    const st = Store.get(), b = branchById(st.profile.branch);
    const tot = Store.totals(b.id), syl = Store.syllabusProgress(b);
    const days = [];
    for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push({ d, n: st.activity[Store.todayKey(d)] || 0 }); }
    const max = Math.max(5, ...days.map((x) => x.n));
    const studyMins = Math.round(st.attempts.filter((a) => a.branch === b.id).reduce((s, a) => s + (a.seconds || 0), 0) / 60);
    return `
    <div class="page-head"><h1>Your progress</h1><p class="muted">${esc(b.name)}: accuracy, consistency and syllabus coverage.</p></div>
    <div class="grid">
      <div class="grid grid-4">
        ${statCard("flame", Store.streak() + " days", "Current streak")}
        ${statCard("check", tot.accuracy + "%", "Accuracy")}
        ${statCard("spark", tot.total, "Questions solved")}
        ${statCard("clock", studyMins + " min", "Quiz time")}
      </div>
      <div class="grid grid-2">
        <div class="card">
          <div class="card-title">${icon("chart")} Last 14 days</div>
          <div class="activity">${days.map((x) => `<div class="col" title="${x.n} questions on ${x.d.toDateString()}"><i class="${x.n ? "" : "zero"}" style="height:${Math.max(3, (x.n / max) * 100)}%"></i><span>${x.d.getDate()}</span></div>`).join("")}</div>
        </div>
        <div class="card">
          <div class="card-title">${icon("book")} Syllabus coverage</div>
          <div class="row" style="gap:20px">
            <div class="ring" style="--p:${syl.pct}"><div><div><b>${syl.pct}%</b><span>${syl.done}/${syl.all} topics</span></div></div></div>
            <p class="muted small" style="flex:1;min-width:160px;margin:0">${syl.pct < 30 ? "You're just getting started. Mark topics complete on the Study page as you finish them." : syl.pct < 80 ? "Good progress. Keep revising completed topics with quizzes." : "Nearly there! Switch your focus to mock tests and revision."}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">${icon("target")} Accuracy by subject</div>
        ${b.subjects.map((s) => { const v = tot.bySubject[s.id]; const acc = v ? Math.round((v.correct / v.total) * 100) : null; return `
          <div style="margin-bottom:14px"><div class="spread small"><span>${esc(s.name)}</span><span class="muted">${acc === null ? "Not attempted" : `${acc}% · ${v.correct}/${v.total}`}</span></div>
          <div class="bar ${acc === null ? "" : acc >= 70 ? "good" : acc < 40 ? "bad" : ""}" style="margin-top:6px"><i style="width:${acc || 0}%"></i></div></div>`; }).join("")}
      </div>
      <div class="card">
        <div class="card-title">${icon("clock")} Quiz history</div>
        ${st.attempts.length ? `<ul class="list">${st.attempts.slice(0, 15).map(attemptRow).join("")}</ul>` : `<div class="empty">No quizzes yet. <a href="#/quiz">Start one →</a></div>`}
      </div>
    </div>`;
  };

  // Reminders
  function nextOccurrence(r) {
    const [h, m] = r.time.split(":").map(Number);
    const now = new Date();
    for (let i = 0; i < 8; i++) {
      const d = new Date(now); d.setDate(now.getDate() + i); d.setHours(h, m, 0, 0);
      if (r.days.includes(d.getDay()) && d > now) return d;
    }
    return null;
  }
  function upcomingReminders(n) {
    return Store.get().reminders.filter((r) => r.enabled).map((r) => ({ r, d: nextOccurrence(r) })).filter((x) => x.d)
      .sort((a, c) => a.d - c.d).slice(0, n)
      .map(({ r, d }) => ({ title: r.title, when: d.toLocaleString(undefined, { weekday: "short", hour: "2-digit", minute: "2-digit" }) }));
  }
  function icsFor(r) {
    const [h, m] = r.time.split(":").map(Number);
    const start = nextOccurrence(r) || new Date();
    start.setHours(h, m, 0, 0);
    const z = (x) => String(x).padStart(2, "0");
    const local = `${start.getFullYear()}${z(start.getMonth() + 1)}${z(start.getDate())}T${z(h)}${z(m)}00`;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const byday = r.days.map((d) => ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][d]).join(",");
    const text = r.title.replace(/[,;\\]/g, " ");
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//YourGATEBuddy//Reminders//EN", "BEGIN:VEVENT",
      `UID:${r.id}@yourgatebuddy.com`, `DTSTAMP:${stamp}`, `DTSTART:${local}`, "DURATION:PT30M",
      `RRULE:FREQ=WEEKLY;BYDAY=${byday}`, `SUMMARY:${text}`, "DESCRIPTION:Study session · yourgatebuddy.com",
      "BEGIN:VALARM", "TRIGGER:-PT0M", "ACTION:DISPLAY", `DESCRIPTION:${text}`, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  }

  views.reminders = () => {
    const rs = Store.get().reminders;
    const perm = "Notification" in window ? Notification.permission : "unsupported";
    return `
    <div class="page-head"><h1>Reminders</h1><p class="muted">Set study reminders to keep your streak going. They show as notifications while YourGATEBuddy is open; add them to your calendar to be reminded even when it's closed.</p></div>
    <div class="grid grid-2" style="align-items:start">
      <form class="card stack" id="rem-form">
        <div class="card-title" style="margin:0">${icon("plus")} New reminder</div>
        <label class="field"><span>Title</span><input name="title" required maxlength="60" placeholder="e.g. Revise Algorithms" value="Daily GATE study session"/></label>
        <label class="field"><span>Time</span><input type="time" name="time" required value="19:00"/></label>
        <div><span class="small" style="font-weight:600;display:block;margin-bottom:6px">Repeat on</span>
          <div class="seg" id="days">${DAY.map((d, i) => `<button type="button" data-day="${i}" class="on">${d}</button>`).join("")}</div></div>
        <button class="btn btn-primary btn-block" type="submit">${icon("bell")} Add reminder</button>
        ${perm === "default" ? `<button type="button" class="btn btn-ghost btn-block" id="perm">Allow browser notifications</button>` : ""}
        ${perm === "denied" ? `<p class="small muted" style="margin:0">Notifications are blocked in your browser settings, so reminders will show as in-app alerts.</p>` : ""}
        ${perm === "unsupported" ? `<p class="small muted" style="margin:0">This browser doesn't support notifications. Use “Add to calendar” instead.</p>` : ""}
      </form>
      <div class="card">
        <div class="card-title">${icon("bell")} Your reminders</div>
        ${rs.length ? `<ul class="list">${rs.map((r) => `
          <li>
            <input type="checkbox" data-toggle="${r.id}" ${r.enabled ? "checked" : ""} title="Enabled"/>
            <div class="grow"><b class="small">${esc(r.title)}</b><div class="muted small">${esc(r.time)} · ${r.days.length === 7 ? "Every day" : r.days.map((d) => DAY[d]).join(", ")}</div></div>
            <button class="btn btn-ghost btn-sm" data-ics="${r.id}" title="Add to calendar">${icon("cal")}</button>
            <button class="btn btn-danger btn-sm" data-del="${r.id}" title="Delete">${icon("trash")}</button>
          </li>`).join("")}</ul>` : `<div class="empty">No reminders yet. Add your first one.</div>`}
      </div>
    </div>`;
  };
  views.reminders.mount = () => {
    const form = $("#rem-form");
    $$("#days button").forEach((btn) => btn.addEventListener("click", () => btn.classList.toggle("on")));
    $("#perm")?.addEventListener("click", async () => { await Notification.requestPermission(); render(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const days = $$("#days button.on").map((b) => Number(b.dataset.day));
      if (!days.length) { toast("Pick at least one day.", "cal"); return; }
      Store.addReminder({ title: form.title.value.trim(), time: form.time.value, days });
      if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
      toast("Reminder added");
      render();
    });
    $$("[data-toggle]").forEach((cb) => cb.addEventListener("change", () => Store.updateReminder(cb.dataset.toggle, { enabled: cb.checked })));
    $$("[data-del]").forEach((btn) => btn.addEventListener("click", () => { Store.removeReminder(btn.dataset.del); render(); }));
    $$("[data-ics]").forEach((btn) => btn.addEventListener("click", () => {
      const r = Store.get().reminders.find((x) => x.id === btn.dataset.ics);
      if (r) { download("yourgatebuddy-reminder.ics", icsFor(r), "text/calendar"); toast("Calendar file downloaded. Open it to add the reminder.", "cal"); }
    }));
  };

  function checkReminders() {
    const now = new Date();
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const stamp = Store.todayKey(now) + " " + hhmm;
    Store.get().reminders.forEach((r) => {
      if (!r.enabled || r.time !== hhmm || !r.days.includes(now.getDay()) || r.lastFired === stamp) return;
      Store.updateReminder(r.id, { lastFired: stamp });
      if ("Notification" in window && Notification.permission === "granted") {
        try { new Notification("YourGATEBuddy", { body: r.title, icon: "assets/img/logo.svg", tag: r.id }); } catch (_) { /* some mobile browsers need a service worker */ }
      }
      toast("⏰ " + r.title, "bell");
    });
  }

  // Settings
  views.settings = () => {
    const s = Store.get().settings;
    return `
    <div class="page-head"><h1>Settings</h1><p class="muted">Appearance, AI quiz setup and your data.</p></div>
    <div class="grid grid-2" style="align-items:start">
      <div class="card stack">
        <div class="card-title" style="margin:0">${icon("gear")} Appearance</div>
        <div class="seg" id="theme-seg">${["system", "light", "dark"].map((t) => `<button type="button" data-theme="${t}" class="${s.theme === t ? "on" : ""}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div>
      </div>
      <form class="card stack" id="ai-form">
        <div class="card-title" style="margin:0">${icon("key")} AI quiz (Claude)</div>
        <p class="small muted" style="margin:0">AI quizzes are generated with Claude using your own Anthropic API key. The key is stored only in this browser and sent only to api.anthropic.com. Get a key at console.anthropic.com.</p>
        <label class="field"><span>Claude API key</span><input type="password" name="apiKey" autocomplete="off" placeholder="sk-ant-…" value="${esc(s.apiKey)}"/></label>
        <label class="field"><span>Model</span><select name="aiModel">
          ${[["claude-opus-5-5", "Claude Opus 5.5 (recommended)"], ["claude-sonnet-5-5", "Claude Sonnet 5.5 (faster)"], ["claude-haiku-5-5", "Claude Haiku 5.5 (fastest, lowest cost)"]]
            .map(([v, l]) => `<option value="${v}" ${s.aiModel === v ? "selected" : ""}>${l}</option>`).join("")}
        </select></label>
        <div class="row"><button class="btn btn-primary" type="submit">Save</button>${s.apiKey ? `<button class="btn btn-ghost" type="button" id="clear-key">Remove key</button>` : ""}</div>
      </form>
      <div class="card stack">
        <div class="card-title" style="margin:0">${icon("shield")} Your data</div>
        <p class="small muted" style="margin:0">Your progress is stored on this device. Export a backup to move it to another device.</p>
        <div class="row">
          <button class="btn btn-ghost" id="export">${icon("download")} Export</button>
          <label class="btn btn-ghost">${icon("upload")} Import<input type="file" id="import" accept="application/json" hidden/></label>
          <button class="btn btn-danger" id="reset">${icon("trash")} Reset all</button>
        </div>
      </div>
    </div>`;
  };
  views.settings.mount = () => {
    $$("#theme-seg button").forEach((btn) => btn.addEventListener("click", () => { Store.setSettings({ theme: btn.dataset.theme }); applyTheme(); render(); }));
    $("#ai-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      Store.setSettings({ apiKey: f.apiKey.value.trim(), aiModel: f.aiModel.value });
      toast("Settings saved"); render();
    });
    $("#clear-key")?.addEventListener("click", () => { Store.setSettings({ apiKey: "" }); toast("API key removed"); render(); });
    $("#export").addEventListener("click", () => {
      const data = JSON.parse(Store.exportJSON()); data.settings.apiKey = ""; // never export the key
      download(`yourgatebuddy-backup-${Store.todayKey()}.json`, JSON.stringify(data, null, 2), "application/json");
    });
    $("#import").addEventListener("change", async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try { const key = Store.get().settings.apiKey; Store.importJSON(await file.text()); if (!Store.get().settings.apiKey) Store.setSettings({ apiKey: key }); toast("Backup imported"); applyTheme(); render(); }
      catch (_) { toast("That file isn't a valid backup.", "shield"); }
    });
    $("#reset").addEventListener("click", () => {
      if (confirm("This deletes all your progress, reminders and settings on this device. Continue?")) { Store.reset(); applyTheme(); location.hash = "#/home"; }
    });
  };

  // Profile
  views.profile = () => {
    const p = Store.get().profile, b = branchById(p.branch);
    const tot = Store.totals(), year = new Date().getFullYear();
    return `
    <div class="page-head"><h1>Profile</h1></div>
    <div class="grid grid-2" style="align-items:start">
      <div class="card">
        <div class="row" style="gap:16px">
          <div class="bicon" style="width:64px;height:64px;border-radius:18px;display:grid;place-items:center;color:#fff;font-size:1.6rem;font-weight:800;background:linear-gradient(135deg,var(--primary),var(--primary-2))">${esc((p.name || "A").charAt(0).toUpperCase())}</div>
          <div><h2 style="margin:0">${esc(p.name || "Aspirant")}</h2><div class="muted small">GATE ${esc(p.targetYear)} · ${esc(b.name)}</div></div>
        </div>
        <div class="grid grid-3" style="margin-top:20px;text-align:center">
          <div><b style="font-size:1.3rem">${tot.total}</b><div class="muted small">Questions</div></div>
          <div><b style="font-size:1.3rem">${tot.accuracy}%</b><div class="muted small">Accuracy</div></div>
          <div><b style="font-size:1.3rem">${Store.streak()}</b><div class="muted small">Day streak</div></div>
        </div>
      </div>
      <form class="card stack" id="profile-form">
        <div class="form-grid">
          <label class="field"><span>Name</span><input name="name" maxlength="40" value="${esc(p.name || "")}"/></label>
          <label class="field"><span>GATE paper</span><select name="branch">${BRANCHES.map((x) => `<option value="${x.id}" ${x.id === p.branch ? "selected" : ""}>${x.id} · ${x.short}</option>`).join("")}</select></label>
          <label class="field"><span>Target year</span><select name="targetYear">${[year, year + 1, year + 2].map((y) => `<option ${String(p.targetYear) === String(y) ? "selected" : ""}>${y}</option>`).join("")}</select></label>
          <label class="field"><span>Exam date</span><input type="date" name="examDate" value="${esc(p.examDate || DEFAULT_EXAM)}"/></label>
          <label class="field"><span>Daily goal (questions)</span><input type="number" min="5" max="200" name="dailyGoal" value="${esc(p.dailyGoal || 20)}"/></label>
        </div>
        <button class="btn btn-primary" type="submit">Save profile</button>
      </form>
    </div>`;
  };
  views.profile.mount = () => {
    $("#profile-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      Store.setProfile({ name: f.name.value.trim(), branch: f.branch.value, targetYear: f.targetYear.value, examDate: f.examDate.value, dailyGoal: Math.max(5, parseInt(f.dailyGoal.value, 10) || 20) });
      quiz.phase = "setup";
      toast("Profile updated"); render();
    });
  };

  // ---------- router ----------
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [pathPart, anchor] = raw.split("#");
    const [path, query] = pathPart.split("?");
    return { route: path || "", params: new URLSearchParams(query || ""), anchor };
  }
  const PRIVATE = ["dashboard", "study", "quiz", "progress", "reminders", "settings", "profile"];
  let lastRoute = null;

  function render() {
    let { route, params, anchor } = parseHash();
    const onboarded = !!Store.get().profile;
    if (!route) route = onboarded ? "dashboard" : "home";
    if (PRIVATE.includes(route) && !onboarded) route = "onboard";
    if (!views[route]) route = onboarded ? "dashboard" : "home";
    if (route !== "quiz" && quiz.phase !== "setup") { stopTimer(); quiz.phase = "setup"; }

    renderChrome(route);
    const main = $("#app");
    main.innerHTML = views[route](params);
    views[route].mount && views[route].mount(params);
    const titles = { home: "AI GATE Preparation Companion", dashboard: "Dashboard", study: "Study", quiz: "Quiz", progress: "Progress", reminders: "Reminders", settings: "Settings", profile: "Profile", onboard: "Get started" };
    document.title = `YourGATEBuddy · ${titles[route] || "GATE Prep"}`;
    if (route !== lastRoute) {
      if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 30);
      else window.scrollTo(0, 0);
    } else if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
    lastRoute = route;
  }

  window.addEventListener("hashchange", render);
  applyTheme();
  render();
  checkReminders();
  setInterval(checkReminders, 20000);
  $("#year").textContent = new Date().getFullYear();
})();
