/* Firebase project config for sign-in and cloud sync.
 *
 * 1. Create a project at https://console.firebase.google.com
 * 2. Add a Web app: Project settings → General → Your apps → </> and copy the config object here.
 * 3. Authentication → Sign-in method → enable "Google" and "Email/Password".
 * 4. Authentication → Settings → Authorized domains → add yourgatebuddy.com (localhost is there by default).
 * 5. Firestore Database → Create database (production mode), then paste firestore.rules from this repo into Rules.
 *
 * These values identify your project; they are not secrets. Data is protected by firestore.rules.
 * While this is null, the site runs in guest mode (progress saved only on the device).
 */
window.GB_FIREBASE_CONFIG = null;
/* Example:
window.GB_FIREBASE_CONFIG = {
  apiKey: "AIza…",
  authDomain: "yourgatebuddy.firebaseapp.com",
  projectId: "yourgatebuddy",
  storageBucket: "yourgatebuddy.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123",
};
*/
