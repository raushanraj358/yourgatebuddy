// Public site configuration. GitHub Pages serves static files only, so these values live here.
// Both values below are designed to be public: row-level security (supabase/schema.sql) protects each user's data,
// and the Gemini key stays secret inside the Supabase Edge Function (supabase/functions/gate-ai).
// While supabaseUrl is empty the site runs in guest mode: progress stays on the device, and AI needs the visitor's own key.
const SITE = {
  // Supabase → Project Settings → API (or "Connect"): Project URL, e.g. 'https://abcdefghijkl.supabase.co'
  supabaseUrl: 'https://qekauisestpvikfoqulx.supabase.co',
  // Supabase → Project Settings → API Keys: the "anon" / "publishable" key (NOT the service_role / secret key)
  supabaseAnonKey: 'sb_publishable_ETLnET5ApslLF6XeCUefjQ_3exsa3A3',

  googleAuth: true, // "Continue with Google" (enable the Google provider in Supabase first)
  emailAuth: true, // "Email me a sign-in link" as a fallback
  serverAI: true, // free AI for every visitor through the "gate-ai" Edge Function
  aiDailyLimit: 25, // keep in sync with AI_DAILY_LIMIT in the Edge Function (signed-in users)
  aiGuestLimit: 5, // keep in sync with AI_GUEST_DAILY_LIMIT (visitors who are not signed in)
};

const current = { ...SITE };
current.serverAI = Boolean(SITE.serverAI && SITE.supabaseUrl && SITE.supabaseAnonKey);

export const config = () => current;
export const loadConfig = () => Promise.resolve(current);
export const cloudConfigured = () => Boolean(current.supabaseUrl && current.supabaseAnonKey);
export const aiEndpoint = () => `${current.supabaseUrl.replace(/\/+$/, '')}/functions/v1/gate-ai`;
