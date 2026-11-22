/* YourGATEBuddy — local persistence (localStorage). All data stays on the user's device. */
(function () {
  "use strict";
  const KEY = "ygb.v1";

  const defaults = () => ({
    profile: null, // { name, branch, targetYear, examDate, dailyGoal }
    settings: { theme: "system", apiKey: "", aiModel: "claude-opus-5-5", sound: true },
    studied: {}, // { "CS:algo:2": true }  (branch:subject:topicIndex)
    attempts: [], // { id, date, branch, subject, mode, total, correct, seconds, items:[{qid?, q, o, a, chosen, ex, subject}] }
    activity: {}, // { "2026-11-22": questionsAnswered }
    reminders: [], // { id, title, time:"HH:MM", days:[0..6], enabled, lastFired }
  });

  let state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...defaults(), ...JSON.parse(raw) } : defaults();
    state.settings = { ...defaults().settings, ...(state.settings || {}) };
  } catch (_) {
    state = defaults();
  }

  const listeners = new Set();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { /* storage full or blocked */ }
    listeners.forEach((fn) => fn(state));
  }

  const todayKey = (d = new Date()) => {
    const z = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  };
  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  const Store = {
    get: () => state,
    save,
    onChange: (fn) => listeners.add(fn),
    todayKey,
    uid,

    setProfile(p) { state.profile = { ...(state.profile || {}), ...p }; save(); },
    setSettings(s) { state.settings = { ...state.settings, ...s }; save(); },

    toggleTopic(branch, subject, idx) {
      const k = `${branch}:${subject}:${idx}`;
      if (state.studied[k]) delete state.studied[k]; else state.studied[k] = true;
      save();
    },
    isStudied: (branch, subject, idx) => !!state.studied[`${branch}:${subject}:${idx}`],

    addAttempt(a) {
      state.attempts.unshift({ id: uid(), date: new Date().toISOString(), ...a });
      state.attempts = state.attempts.slice(0, 200);
      const k = todayKey();
      state.activity[k] = (state.activity[k] || 0) + a.total;
      save();
    },

    addReminder(r) { state.reminders.push({ id: uid(), enabled: true, lastFired: "", ...r }); save(); },
    updateReminder(id, patch) {
      const r = state.reminders.find((x) => x.id === id);
      if (r) { Object.assign(r, patch); save(); }
    },
    removeReminder(id) { state.reminders = state.reminders.filter((x) => x.id !== id); save(); },

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

    exportJSON: () => JSON.stringify(state, null, 2),
    importJSON(text) {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || !parsed) throw new Error("Invalid file");
      state = { ...defaults(), ...parsed, settings: { ...defaults().settings, ...(parsed.settings || {}) } };
      save();
    },
    reset() { state = defaults(); save(); },
  };

  window.GB_STORE = Store;
})();
