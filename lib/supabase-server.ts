import { createClient } from "@supabase/supabase-js";

// Each deployment reads its own schema from DB_SCHEMA ("booth" in production, "booth_test" on the test app).
// Default is production; the name is validated because it selects which data the app can touch.
const schema = process.env.DB_SCHEMA || "booth";
if (!/^[a-z][a-z0-9_]{0,62}$/.test(schema)) throw new Error("DB_SCHEMA is not a valid schema name.");

function create(url: string, key: string) {
  return createClient<any, any>(url, key, {
    db: { schema },
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
