/* YourGATEBuddy — accounts and cloud sync (Firebase Auth + Firestore).
 *
 * Firestore layout (see firestore.rules):
 *   users/{uid}                 profile, settings (never the API key), studied, activity, reminders, saved
 *   users/{uid}/attempts/{id}   one document per quiz attempt
 *   users/{uid}/events/{id}     one document per activity-log entry
 *
 * Exposes window.GB_CLOUD and fires a "gb:cloud" event whenever auth or sync status changes.
 */
const Store = window.GB_STORE;
const config = window.GB_FIREBASE_CONFIG;
const SDK = "https://www.gstatic.com/firebasejs/10.12.2";

const cloud = {
  configured: !!(config && config.apiKey && config.projectId),
  ready: false, // auth state resolved
  user: null, // { uid, name, email, photo, provider }
  status: "idle", // idle | loading | syncing | synced | offline | error
  lastSynced: null,
  error: "",
};
window.GB_CLOUD = cloud;

function emit(authChanged = false) {
  window.dispatchEvent(new CustomEvent("gb:cloud", { detail: { authChanged } }));
}

const FRIENDLY = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "No account found with that email.",
  "auth/email-already-in-use": "An account with this email already exists. Try signing in.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/cancelled-popup-request": "Sign-in was cancelled.",
  "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/unauthorized-domain": "This domain isn't authorised in Firebase. Add it under Authentication → Settings → Authorized domains.",
  "auth/operation-not-allowed": "This sign-in method isn't enabled in Firebase yet.",
};
const friendly = (e) => new Error(FRIENDLY[e && e.code] || (e && e.message) || "Something went wrong.");

if (!cloud.configured) {
  cloud.ready = true;
  emit(true);
} else {
  init().catch((e) => {
    console.error(e);
    cloud.ready = true;
    cloud.status = "error";
    cloud.error = "Couldn't load sign-in. Check your connection.";
    emit(true);
  });
}

async function init() {
  const [{ initializeApp }, A, F] = await Promise.all([
    import(`${SDK}/firebase-app.js`),
    import(`${SDK}/firebase-auth.js`),
    import(`${SDK}/firebase-firestore.js`),
  ]);
  const app = initializeApp(config);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);

  const userDoc = (uid) => F.doc(db, "users", uid);
  const sub = (uid, name) => F.collection(db, "users", uid, name);
  const clean = (o) => JSON.parse(JSON.stringify(o)); // Firestore rejects `undefined`

  let synced = { attempts: new Set(), events: new Set() };
  let loadedFor = null;
  let pushTimer = null;
  let pushing = Promise.resolve();

  function mainDocData(s) {
    const { apiKey, ...settings } = s.settings; // the API key never leaves the device
    return clean({
      profile: s.profile, settings, studied: s.studied, activity: s.activity,
      reminders: s.reminders.map(({ lastFired, ...r }) => r), saved: s.saved,
      updatedAt: new Date().toISOString(),
    });
  }

  async function commitInChunks(ops) {
    for (let i = 0; i < ops.length; i += 400) {
      const batch = F.writeBatch(db);
      ops.slice(i, i + 400).forEach((fn) => fn(batch));
      await batch.commit();
    }
  }

  async function push() {
    const u = cloud.user;
    if (!u || loadedFor !== u.uid) return;
    const s = Store.get();
    cloud.status = "syncing"; emit();
    try {
      const ops = [(b) => b.set(userDoc(u.uid), mainDocData(s))];
      const newAttempts = s.attempts.filter((a) => !synced.attempts.has(a.id));
      const newEvents = s.events.filter((e) => !synced.events.has(e.id));
      newAttempts.forEach((a) => ops.push((b) => b.set(F.doc(sub(u.uid, "attempts"), a.id), clean(a))));
      newEvents.forEach((e) => ops.push((b) => b.set(F.doc(sub(u.uid, "events"), e.id), clean(e))));
      await commitInChunks(ops);
      newAttempts.forEach((a) => synced.attempts.add(a.id));
      newEvents.forEach((e) => synced.events.add(e.id));
      cloud.status = navigator.onLine === false ? "offline" : "synced";
      cloud.lastSynced = new Date();
      cloud.error = "";
    } catch (e) {
      console.error(e);
      cloud.status = navigator.onLine === false ? "offline" : "error";
      cloud.error = e.code === "permission-denied" ? "Cloud database rules are blocking sync. Check firestore.rules." : "Sync failed. We'll retry on your next change.";
    }
    emit();
  }

  function schedulePush(delay = 1500) {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => { pushing = pushing.then(push); }, delay);
  }
  async function flush() {
    clearTimeout(pushTimer);
    pushing = pushing.then(push);
    await pushing;
  }

  const byIdUnion = (a, b) => {
    const seen = new Set(a.map((x) => x.id));
    return a.concat(b.filter((x) => !seen.has(x.id)));
  };
  const newestFirst = (list, key) => list.sort((x, y) => String(y[key]).localeCompare(String(x[key])));

  async function loadAndMerge(u) {
    cloud.status = "loading"; emit();
    const [snap, attemptsSnap, eventsSnap] = await Promise.all([
      F.getDoc(userDoc(u.uid)),
      F.getDocs(F.query(sub(u.uid, "attempts"), F.orderBy("date", "desc"), F.limit(Store.limits.MAX_ATTEMPTS))),
      F.getDocs(F.query(sub(u.uid, "events"), F.orderBy("date", "desc"), F.limit(Store.limits.MAX_EVENTS))),
    ]);
    const remote = snap.exists() ? snap.data() : {};
    const remoteAttempts = attemptsSnap.docs.map((d) => d.data());
    const remoteEvents = eventsSnap.docs.map((d) => d.data());
    synced = { attempts: new Set(remoteAttempts.map((a) => a.id)), events: new Set(remoteEvents.map((e) => e.id)) };

    const local = Store.get();
    // Local data belonging to a different account is never merged into this one.
    const useLocal = !local.owner || local.owner === u.uid;
    const L = useLocal ? local : { ...local, profile: null, studied: {}, activity: {}, reminders: [], attempts: [], events: [], saved: [] };

    const activity = { ...(remote.activity || {}) };
    Object.entries(L.activity).forEach(([k, v]) => { activity[k] = Math.max(activity[k] || 0, v); });

    Store.replace({
      owner: u.uid,
      profile: remote.profile || L.profile,
      settings: { ...L.settings, ...(remote.settings || {}), apiKey: local.settings.apiKey },
      studied: { ...(remote.studied || {}), ...L.studied },
      activity,
      reminders: byIdUnion(remote.reminders || [], L.reminders).map((r) => ({ lastFired: "", ...r, ...(L.reminders.find((x) => x.id === r.id) ? { lastFired: L.reminders.find((x) => x.id === r.id).lastFired } : {}) })),
      saved: newestFirst(byIdUnion(remote.saved || [], L.saved), "savedAt").slice(0, Store.limits.MAX_SAVED),
      attempts: newestFirst(byIdUnion(remoteAttempts, L.attempts), "date").slice(0, Store.limits.MAX_ATTEMPTS),
      events: newestFirst(byIdUnion(remoteEvents, L.events), "date").slice(0, Store.limits.MAX_EVENTS),
    });
    loadedFor = u.uid;
    await flush(); // upload anything that only existed on this device
  }

  Store.onChange(() => { if (cloud.user && loadedFor === cloud.user.uid) schedulePush(); });
  window.addEventListener("online", () => { if (cloud.user) schedulePush(0); });
  window.addEventListener("beforeunload", () => { if (pushTimer) { clearTimeout(pushTimer); push(); } });

  A.onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) {
      cloud.user = null; loadedFor = null; cloud.status = "idle";
      cloud.ready = true; emit(true);
      return;
    }
    cloud.user = {
      uid: fbUser.uid, name: fbUser.displayName || "", email: fbUser.email || "", photo: fbUser.photoURL || "",
      provider: (fbUser.providerData[0] && fbUser.providerData[0].providerId) || "password",
    };
    try {
      await loadAndMerge(cloud.user);
      if (cloud.pendingLog) { Store.logEvent("account", cloud.pendingLog); cloud.pendingLog = ""; }
      const p = Store.get().profile;
      if (p && !p.name && cloud.user.name) Store.setProfile({ name: cloud.user.name.split(" ")[0] });
    } catch (e) {
      console.error(e);
      cloud.status = "error";
      cloud.error = e.code === "permission-denied" ? "Cloud database rules are blocking access. Check firestore.rules." : "Couldn't load your cloud data. Working offline for now.";
      loadedFor = cloud.user.uid; // keep working locally; later changes will try to sync
    }
    cloud.ready = true;
    emit(true);
  });

  // ---- Public API ----
  Object.assign(cloud, {
    async signInGoogle() {
      const provider = new A.GoogleAuthProvider();
      cloud.pendingLog = "Signed in with Google";
      try { await A.signInWithPopup(auth, provider); }
      catch (e) {
        if (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment") return A.signInWithRedirect(auth, provider);
        cloud.pendingLog = ""; throw friendly(e);
      }
    },
    async signUpEmail(name, email, password) {
      cloud.pendingLog = "Created an account";
      try {
        const cred = await A.createUserWithEmailAndPassword(auth, email, password);
        if (name) { await A.updateProfile(cred.user, { displayName: name }); cloud.user && (cloud.user.name = name); }
      } catch (e) { cloud.pendingLog = ""; throw friendly(e); }
    },
    async signInEmail(email, password) {
      cloud.pendingLog = "Signed in with email";
      try { await A.signInWithEmailAndPassword(auth, email, password); }
      catch (e) { cloud.pendingLog = ""; throw friendly(e); }
    },
    async resetPassword(email) {
      try { await A.sendPasswordResetEmail(auth, email); } catch (e) { throw friendly(e); }
    },
    async signOut() {
      Store.logEvent("account", "Signed out");
      await flush();
      await A.signOut(auth);
      clearTimeout(pushTimer);
      cloud.user = null; loadedFor = null;
      Store.reset(); // the data is safe in the account; don't leave it on a shared device
      emit(true);
    },
    syncNow: () => flush(),
    async wipe() {
      const u = cloud.user;
      if (!u) return;
      clearTimeout(pushTimer);
      const [a, e] = await Promise.all([F.getDocs(sub(u.uid, "attempts")), F.getDocs(sub(u.uid, "events"))]);
      const ops = [...a.docs, ...e.docs].map((d) => (b) => b.delete(d.ref));
      ops.push((b) => b.delete(userDoc(u.uid)));
      await commitInChunks(ops);
      synced = { attempts: new Set(), events: new Set() };
      Store.replace({ owner: u.uid, settings: { ...Store.get().settings } });
    },
  });
}
