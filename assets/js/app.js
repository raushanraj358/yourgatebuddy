import { S, commit, subscribe, daysToExam, journeyProgress, notesDue } from './store.js';
import { icon } from './icons.js';
import { $, esc, fmtClock, fmtDate, dateKey } from './utils.js';
import { openModal, toast } from './ui.js';
import * as timer from './timer.js';
import { checkReminders } from './reminders-engine.js';
import { subjectById, setBranch, BRANCH, BRANCHES } from './data.js';

import * as dashboard from './views/dashboard.js';
import * as tracker from './views/tracker.js';
import * as study from './views/study.js';
import * as quiz from './views/quiz.js';
import * as notes from './views/notes.js';
import * as resources from './views/resources.js';
import * as reminders from './views/reminders.js';
import * as settings from './views/settings.js';
import * as profile from './views/profile.js';
import * as syllabus from './views/syllabus.js';
import * as goals from './views/goals.js';
import { initCloud, cloud, onCloudChange } from './cloud.js';

const ROUTES = {
  dashboard: { title: 'Dashboard', icon: 'home', view: dashboard, group: 'Plan', tab: 'Home' },
  goals: { title: 'Goals', icon: 'flag', view: goals, group: 'Plan', tab: 'Goals', sub: 'Weekly targets, target score and your own goals' },
  tracker: { title: 'Daily Tracker', icon: 'tracker', view: tracker, group: 'Plan', tab: 'Tracker', sub: 'Plan the day, build habits, review consistency' },
  study: { title: 'Study Hours', icon: 'timer', view: study, group: 'Plan', tab: 'Timer', sub: 'Focus timer, logs and analytics' },
  reminders: { title: 'Reminders', icon: 'bell', view: reminders, group: 'Plan', sub: 'Never miss your routine' },
  syllabus: { title: 'Study Material', icon: 'book', view: syllabus, group: 'Learn', tab: 'Study', sub: 'Your GATE syllabus, subject by subject' },
  quiz: { title: 'Quiz & Mock Tests', icon: 'target', view: quiz, group: 'Learn', tab: 'Quiz', sub: 'Offline topic tests, AI quizzes and timed GATE practice papers' },
  notes: { title: 'Notes', icon: 'notes', view: notes, group: 'Learn', tab: 'Notes', sub: 'Your notebook with spaced revision' },
  resources: { title: 'Resources', icon: 'library', view: resources, group: 'Learn', sub: 'Curated sources and your own reading list' },
  profile: { title: 'Profile', icon: 'user', view: profile, group: 'You', sub: 'Your account, paper, goal and journey so far' },
  settings: { title: 'Settings', icon: 'settings', view: settings, group: 'You', sub: 'AI, appearance and data' },
};

/* ---------- Navigation ---------- */
function renderNav() {
  const due = notesDue().length;
  let html = '';
  let group = '';
  for (const [k, r] of Object.entries(ROUTES)) {
    if (r.group !== group) {
      group = r.group;
      html += `<div class="nav-label">${group}</div>`;
    }
    const badge = k === 'notes' && due ? `<span class="badge" title="Notes due for revision">${due}</span>` : '';
    html += `<a href="#/${k}" data-route="${k}">${icon(r.icon, 19)}<span>${r.title}</span>${badge}</a>`;
  }
  $('#nav').innerHTML = html;
  $('#tabbar').innerHTML = Object.entries(ROUTES)
    .filter(([, r]) => r.tab)
    .map(([k, r]) => `<a href="#/${k}" data-route="${k}">${icon(r.icon, 20)}<span>${r.tab}</span></a>`)
    .join('');
  $('#settingsBtn').innerHTML = icon('settings', 18);
  $('#remBtn').innerHTML = icon('bell', 18);
  markActive();
}
function markActive() {
  const cur = parseHash().route;
  const tabOf = cur;
  document.querySelectorAll('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === cur || (a.closest('#tabbar') && a.dataset.route === tabOf)));
}

function renderCountdown() {
  const d = daysToExam();
  const p = journeyProgress();
  $('#countdownCard').innerHTML = `
    <div class="lbl">Days to GATE · ${esc(BRANCH.id)}</div>
    <div class="big">${d}</div>
    <div class="sub">${fmtDate(S().profile.examDate, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    <div class="bar"><i style="width:${(p * 100).toFixed(1)}%"></i></div>`;
}

function renderAccountBtn() {
  const btn = $('#accountBtn');
  const c = cloud();
  const u = c.user;
  btn.dataset.sync = u ? c.status : '';
  const name = S().profile.name || u?.user_metadata?.full_name || u?.email || '';
  if (u?.user_metadata?.avatar_url) btn.innerHTML = `<img src="${esc(u.user_metadata.avatar_url)}" alt="" referrerpolicy="no-referrer">`;
  else if (u) btn.innerHTML = `<span class="avatar">${esc((name[0] || '?').toUpperCase())}</span>`;
  else btn.innerHTML = icon('user', 18);
  btn.title = u ? `Profile · ${u.email || 'signed in'}` : 'Profile · sign in to save your progress';
}

function renderThemeBtn() {
  const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  $('#themeBtn').innerHTML = icon(dark ? 'sun' : 'moon', 18);
}
export function applyTheme() {
  const t = S().settings.theme;
  if (t === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  renderThemeBtn();
}
$('#themeBtn').addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  S().settings.theme = isDark ? 'light' : 'dark';
  commit();
  applyTheme();
});

/* ---------- Timer chip ---------- */
function renderTimerChip() {
  const t = S().timer;
  const chip = $('#timerChip');
  if (!t) {
    chip.hidden = true;
    return;
  }
  chip.hidden = false;
  chip.classList.toggle('paused', !t.running);
  const ms = t.mode === 'pomodoro' ? timer.phaseLength(t) - timer.elapsed(t) : timer.elapsed(t);
  const label = t.phase === 'break' ? 'Break' : subjectById(t.subject).short;
  chip.innerHTML = `<span class="pulse"></span>${fmtClock(ms)}<span style="opacity:.6;font-family:var(--font);font-size:12px">${esc(label)}</span>`;
}

/* ---------- Router ---------- */
let unmount = null;
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, q = ''] = h.split('?');
  const route = ROUTES[path] ? path : 'dashboard';
  return { route, params: Object.fromEntries(new URLSearchParams(q)) };
}
function navigate() {
  const { route, params } = parseHash();
  const r = ROUTES[route];
  if (typeof unmount === 'function') unmount();
  unmount = null;
  const viewEl = $('#view');
  const fresh = viewEl.cloneNode(false); // drop old listeners
  viewEl.replaceWith(fresh);
  document.title = `${r.title} · YourGATEBuddy`;
  $('#pageTitle').textContent = r.title;
  $('#pageSub').textContent = r.sub || '';
  markActive();
  unmount = r.view.mount(fresh, params, { setSub: (t) => ($('#pageSub').textContent = t) });
  window.scrollTo({ top: 0 });
}
window.addEventListener('hashchange', navigate);

/* ---------- Onboarding ---------- */
function onboarding() {
  const p = S().profile;
  let branch = p.branch || 'CS';
  openModal({
    title: 'Welcome',
    wide: true,
    body: `
      <div class="onboard-hero"><div class="brand onboard-brand"><img class="brand-mark" src="assets/img/logo-mark.png" alt="" width="64" height="64"><span class="brand-text"><span class="brand-name">Your<b>GATE</b>Buddy<i>.com</i></span><span class="brand-tag">Prepare · Practise · Revise · Crack GATE</span></span></div><h3>Your GATE journey, organised.</h3>
      <p class="muted" style="margin:6px 0 18px">Your paper's syllabus, offline topic tests, AI quizzes and notes, practice papers, goals and a focus timer, all in one calm place. ${cloud().configured ? 'Already have an account? Sign in to bring back your progress.' : 'Your data stays on this device.'}</p></div>
      <div class="stack">
        <div class="field"><span class="label">Your GATE paper</span>
          <div class="branch-pick">${BRANCHES.map((b) => `<button type="button" class="mode-card ${b.id === branch ? 'on' : ''}" data-branch="${b.id}"><span class="mc-ico">${icon(b.icon, 18)}</span><b>${esc(b.short)}</b><span>${b.id} · ${esc(b.name)}</span></button>`).join('')}</div>
        </div>
        <div class="field"><label for="obName">What should we call you?</label><input class="input" id="obName" placeholder="Your name" value="${esc(p.name)}"></div>
        <div class="grid g-3" style="gap:12px">
          <div class="field"><label for="obExam">GATE exam date</label><input class="input" type="date" id="obExam" value="${p.examDate}"></div>
          <div class="field"><label for="obTarget">Daily study target (hours)</label><input class="input" type="number" min="1" max="16" id="obTarget" value="${p.dailyTarget}"></div>
          <div class="field"><label for="obScore">Target marks (out of 100)</label><input class="input" type="number" min="10" max="100" step="1" id="obScore" value="${p.targetScore || 60}"></div>
        </div>
        <p class="hint">GATE 2027 is pre-filled as 6 February 2027 (GATE is usually held over the first two weekends of February). Update it once the organising IIT announces your paper's date.</p>
      </div>`,
    foot: `${cloud().configured && !cloud().user ? `<a class="btn ghost lg" href="#/profile" data-close>Sign in</a>` : ''}<button class="btn accent lg block" id="obGo" style="flex:1">Start preparing ${icon('arrow', 18)}</button>`,
    onMount(m, close) {
      m.querySelectorAll('[data-branch]').forEach((b) => b.addEventListener('click', () => {
        branch = b.dataset.branch;
        m.querySelectorAll('[data-branch]').forEach((x) => x.classList.toggle('on', x === b));
      }));
      m.querySelector('a[href="#/profile"]')?.addEventListener('click', () => {
        p.onboarded = true; // they'll set up their profile after signing in
        p.branch ||= branch;
        commit();
      });
      m.querySelector('#obGo').addEventListener('click', () => {
        p.name = m.querySelector('#obName').value.trim();
        p.branch = branch;
        p.examDate = m.querySelector('#obExam').value || p.examDate;
        p.dailyTarget = Math.max(1, Math.min(16, Number(m.querySelector('#obTarget').value) || 6));
        p.targetScore = Math.max(10, Math.min(100, Number(m.querySelector('#obScore').value) || 60));
        p.startDate = p.startDate || dateKey();
        p.onboarded = true;
        commit();
        close();
        navigate();
        toast(`Welcome aboard${p.name ? ', ' + p.name : ''}!`, 'good', 'Tip: open Study Material and pick your first topic.');
      });
    },
  });
}

/* ---------- Paper (branch) ---------- */
let currentBranch = null;
/** Points data.js at the learner's paper. Returns true when it changed. */
function syncBranch() {
  const want = S().profile.branch || 'CS';
  if (want === currentBranch) return false;
  currentBranch = setBranch(want).id;
  return true;
}

/* ---------- Boot ---------- */
$('#year').textContent = new Date().getFullYear();
syncBranch();
renderNav();
renderCountdown();
applyTheme();
renderTimerChip();
renderAccountBtn();
navigate();
onCloudChange(renderAccountBtn);
// Cloud data replaced what was on this device (sign-in on a new device, edits from another device, sign-out).
window.addEventListener('ygb:datareplaced', () => {
  syncBranch();
  renderNav();
  renderCountdown();
  applyTheme();
  renderTimerChip();
  renderAccountBtn();
  navigate();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', renderThemeBtn);

let lastNavDue = notesDue().length;
subscribe(() => {
  if (syncBranch()) {
    // The learner switched GATE paper: every view shows a different syllabus now.
    renderNav();
    navigate();
  }
  renderCountdown();
  renderTimerChip();
  renderAccountBtn();
  const due = notesDue().length;
  if (due !== lastNavDue) {
    lastNavDue = due;
    renderNav();
  }
});

let n = 0;
setInterval(() => {
  timer.tick();
  renderTimerChip();
  window.dispatchEvent(new Event('ygb:tick'));
  if (++n % 15 === 0) checkReminders();
}, 1000);
checkReminders();

// Restore a signed-in user's data before deciding whether this is a first visit.
Promise.race([initCloud(), new Promise((r) => setTimeout(r, 6000))])
  .catch((e) => console.warn(e))
  .finally(() => {
    renderAccountBtn();
    if (!S().profile.onboarded && !document.querySelector('.modal-backdrop')) onboarding();
  });
