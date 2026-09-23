import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

const validId = (value: unknown) =>
  typeof value === "string" && /^[a-zA-Z0-9_-]{8,80}$/.test(value);

function unavailable(error: unknown) {
  console.error("Booth session storage error", error);
  return Response.json(
    { error: "Your answers could not be saved right now. Please try again." },
    { status: 503 }
  );
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!validId(id)) {
    return Response.json({ error: "A valid session id is required." }, { status: 400 });
  }

  try {
    const row = await env.DB.prepare(
      "SELECT payload_json FROM booth_sessions WHERE id = ?"
    ).bind(id).first<{ payload_json: string }>();

    if (!row) return Response.json({ error: "Session not found." }, { status: 404 });
    return Response.json({ session: JSON.parse(row.payload_json) });
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { sessionId?: unknown; payload?: unknown };
    if (!validId(body.sessionId) || !body.payload || typeof body.payload !== "object") {
      return Response.json({ error: "A valid session is required." }, { status: 400 });
    }

    const payload = body.payload as {
      path?: unknown;
      view?: unknown;
      answers?: unknown;
      summary?: unknown;
    };
    const path = typeof payload.path === "string" ? payload.path.slice(0, 40) : null;
    const view = typeof payload.view === "string" ? payload.view.slice(0, 40) : "home";
    const answersJson = JSON.stringify(Array.isArray(payload.answers) ? payload.answers : []).slice(0, 20000);
    const summaryJson = payload.summary ? JSON.stringify(payload.summary).slice(0, 20000) : null;
    const payloadJson = JSON.stringify(payload).slice(0, 60000);

    await env.DB.prepare(
      `INSERT INTO booth_sessions
        (id, path, current_view, answers_json, summary_json, payload_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET
        path = excluded.path,
        current_view = excluded.current_view,
        answers_json = excluded.answers_json,
        summary_json = excluded.summary_json,
        payload_json = excluded.payload_json,
        updated_at = CURRENT_TIMESTAMP`
    ).bind(body.sessionId, path, view, answersJson, summaryJson, payloadJson).run();

    return Response.json({ saved: true, sessionId: body.sessionId });
  } catch (error) {
    return unavailable(error);
  }
}

