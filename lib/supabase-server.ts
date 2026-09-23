import { createClient } from "@supabase/supabase-js";

function create(url: string, key: string) {
  return createClient<any, "booth">(url, key, {
    db: { schema: "booth" },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

let client: ReturnType<typeof create> | null = null;

// Server-only: uses the service-role key, which must never reach browser code.
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server environment is not configured.");
  client ??= create(url, key);
  return client;
}
