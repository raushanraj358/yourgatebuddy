/* YourGATEBuddy — local persistence (localStorage). Signed-in users are synced to the cloud by cloud.js. */
(function () {
  "use strict";
  const KEY = "ygb.v1";
  const MAX_ATTEMPTS = 300, MAX_EVENTS = 500, MAX_SAVED = 300;

  const defaults = () => ({
    owner: null, // uid of the signed-in account this local copy belongs to (null = guest)
    profile: null, // { name, branch, targetYear, examDate, dailyGoal }
    settings: { theme: "system", apiKey: "", aiModel: "claude-opus-5-5", sound: true },
    studied: {}, // { "CS:algo:2": "2026-11-22T…" }  (branch:subject:topicIndex → when marked done)
    attempts: [], // { id, date, branch, subject, mode, total, correct, seconds, items:[{qid?, q, o, a, chosen, ex, subject}] }
    activity: {}, // { "2026-11-22": questionsAnswered }
    reminders: [], // { id, title, time:"HH:MM", days:[0..6], enabled, lastFired }
    events: [], // activity log: { id, date, type, text, ...meta }
    saved: [], // bookmarked questions: { id, q, o, a, ex, subject, branch, savedAt }
  });

  const normalize = (s) => {
    const d = defaults();
    const out = { ...d, ...(s || {}) };
    out.settings = { ...d.settings, ...((s && s.settings) || {}) };
    ["attempts", "reminders", "events", "saved"].forEach((k) => { if (!Array.isArray(out[k])) out[k] = []; });
    ["studied", "activity"].forEach((k) => { if (!out[k] || typeof out[k] !== "object") out[k] = {}; });
    return out;
  };

  let state;
  try {
    const raw = localStorage.getItem(KEY);
    state = normalize(raw ? JSON.parse(raw) : null);
  } catch (_) {
    state = defaults();
  }

  const listeners = new Set();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { /* storage full or blocked */ }
    listeners.forEach((fn) => { try { fn(state); } catch (e) { console.error(e); } });
  }

  const todayKey = (d = new Date()) => {
    const z = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  };
  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  function log(type, text, meta = {}) {
    state.events.unshift({ id: uid(), date: new Date().toISOString(), type, text, ...meta });
    state.events = state.events.slice(0, MAX_EVENTS);
  }

  const Store = {
    get: () => state,
    save,
    onChange: (fn) => listeners.add(fn),
    todayKey,
    uid,
    limits: { MAX_ATTEMPTS, MAX_EVENTS, MAX_SAVED },

    logEvent(type, text, meta) { log(type, text, meta); save(); },

    setProfile(p) {
      const first = !state.profile;
      state.profile = { ...(state.profile || {}), ...p };
      log("account", first ? `Started preparing for GATE ${state.profile.targetYear} (${state.profile.branch})` : "Updated profile");
      save();
    },
    setSettings(s) { state.settings = { ...state.settings, ...s }; save(); },

    toggleTopic(branch, subject, idx, topicName) {
      const k = `${branch}:${subject}:${idx}`;
      if (state.studied[k]) { delete state.studied[k]; log("study", `Unmarked topic: ${topicName || k}`); }
      else { state.studied[k] = new Date().toISOString(); log("study", `Completed topic: ${topicName || k}`, { branch, subject }); }
      save();
    },
    isStudied: (branch, subject, idx) => !!state.studied[`${branch}:${subject}:${idx}`],

    addAttempt(a, label) {
      const attempt = { id: uid(), date: new Date().toISOString(), ...a };
      state.attempts.unshift(attempt);
      state.attempts = state.attempts.slice(0, MAX_ATTEMPTS);
      const k = todayKey();
      state.activity[k] = (state.activity[k] || 0) + a.total;
      log("quiz", `${a.mode === "ai" ? "AI quiz" : "Quiz"}: ${label || a.subject} · ${a.correct}/${a.total} correct`, { attemptId: attempt.id, branch: a.branch, subject: a.subject });
      save();
      return attempt;
    },

    addReminder(r) {
      state.reminders.push({ id: uid(), enabled: true, lastFired: "", ...r });
      log("reminder", `Added reminder “${r.title}” at ${r.time}`);
      save();
    },
    updateReminder(id, patch, silent) {
      const r = state.reminders.find((x) => x.id === id);
      if (!r) return;
      Object.assign(r, patch);
      if (!silent && "enabled" in patch) log("reminder", `${patch.enabled ? "Enabled" : "Paused"} reminder “${r.title}”`);
      save();
    },
    removeReminder(id) {
      const r = state.reminders.find((x) => x.id === id);
      state.reminders = state.reminders.filter((x) => x.id !== id);
      if (r) log("reminder", `Deleted reminder “${r.title}”`);
      save();
    },

    // Saved / bookmarked questions (study material)
    savedKey: (qq) => qq.qid || qq.id || ("t" + Array.from(qq.q).reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0)),
    isSaved(qq) { const k = Store.savedKey(qq); return state.saved.some((x) => x.id === k); },
    toggleSaved(qq, branch) {
      const k = Store.savedKey(qq);
      if (state.saved.some((x) => x.id === k)) {
        state.saved = state.saved.filter((x) => x.id !== k);
        log("saved", "Removed a saved question");
      } else {
        state.saved.unshift({ id: k, q: qq.q, o: qq.o, a: qq.a, ex: qq.ex || "", subject: qq.subject || "mixed", branch, savedAt: new Date().toISOString() });
        state.saved = state.saved.slice(0, MAX_SAVED);
        log("saved", `Saved question: ${qq.q.slice(0, 70)}${qq.q.length > 70 ? "…" : ""}`);
      }
      save();
      return Store.isSaved(qq);
    },

    // ---- Derived stats ----
    streak() {
      let n = 0;
      const d = new Date();
      if (!state.activity[todayKey(d)]) d.setDate(d.getDate() - 1); // streak survives until end of today
      while (state.activity[todayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    totals(branch) {
      let total = 0, correct = 0;
      const bySubject = {};
      state.attempts.filter((a) => !branch || a.branch === branch).forEach((a) => {
        a.items.forEach((it) => {
          const sid = it.subject || a.subject || "mixed";
          bySubject[sid] = bySubject[sid] || { total: 0, correct: 0 };
          bySubject[sid].total++;
          total++;
          if (it.chosen === it.a) { bySubject[sid].correct++; correct++; }
        });
      });
      return { total, correct, accuracy: total ? Math.round((correct / total) * 100) : 0, bySubject };
    },
    syllabusProgress(branchObj) {
      let done = 0, all = 0;
      const per = {};
      branchObj.subjects.forEach((sub) => {
        let d = 0;
        sub.topics.forEach((_, i) => { if (Store.isStudied(branchObj.id, sub.id, i)) d++; });
        per[sub.id] = { done: d, all: sub.topics.length, pct: Math.round((d / sub.topics.length) * 100) };
        done += d; all += sub.topics.length;
      });
      return { done, all, pct: all ? Math.round((done / all) * 100) : 0, per };
    },

    // ---- Whole-state operations (backup, cloud sync) ----
    exportJSON: () => JSON.stringify(state, null, 2),
    importJSON(text) {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || !parsed) throw new Error("Invalid file");
      const owner = state.owner;
      state = normalize(parsed);
      state.owner = owner;
      log("account", "Imported a backup");
      save();
    },
    replace(next) { state = normalize(next); save(); },
    reset() { state = defaults(); save(); },
  };

  window.GB_STORE = Store;
})();
