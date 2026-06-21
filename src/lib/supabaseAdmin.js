import { createClient } from "@supabase/supabase-js";

// IMPORTANT: this file must only ever be imported from server-side code
// (API routes / route handlers). The service role key bypasses Row Level
// Security, so it must never be exposed to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
}
