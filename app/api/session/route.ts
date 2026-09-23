import { z } from "zod";
import { getSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const idSchema = z.string().regex(/^[a-zA-Z0-9_-]{8,80}$/);
const MAX_PAYLOAD_CHARS = 60000;

const payloadSchema = z
  .object({
    path: z.string().max(40).nullish(),
    view: z.string().max(40).nullish(),
    step: z.number().int().min(0).max(100).nullish(),
    slide: z.number().int().min(0).max(100).nullish(),
    answers: z.array(z.unknown()).max(50).optional(),
    viewedSlides: z.array(z.unknown()).max(50).optional(),
    summary: z.record(z.unknown()).nullish(),
  })
  .passthrough();

const bodySchema = z.object({ sessionId: idSchema, payload: payloadSchema });

function unavailable(error: unknown) {
  const { code, message } = (error ?? {}) as { code?: string; message?: string };
  console.error("Booth session storage error", code ?? "", message ?? "unknown");
  return Response.json(
    { error: "Your answers could not be saved right now. Please try again." },
    { status: 503 }
  );
}

export async function GET(request: Request) {
  const id = idSchema.safeParse(new URL(request.url).searchParams.get("id"));
  if (!id.success) {
    return Response.json({ error: "A valid session id is required." }, { status: 400 });
  }

  try {
    const { data, error } = await getSupabase()
      .from("sessions")
      .select("payload")
      .eq("id", id.data)
      .maybeSingle();
    if (error) throw error;
    if (!data) return Response.json({ error: "Session not found." }, { status: 404 });
    return Response.json({ session: data.payload });
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "A valid session is required." }, { status: 400 });
  }

  const body = bodySchema.safeParse(raw);
  if (!body.success || JSON.stringify(body.data.payload).length > MAX_PAYLOAD_CHARS) {
    return Response.json({ error: "A valid session is required." }, { status: 400 });
  }
  const { sessionId, payload } = body.data;

  try {
    const { error } = await getSupabase()
      .from("sessions")
      .upsert(
        {
          id: sessionId,
          path: payload.path ?? null,
          current_view: payload.view ?? "home",
          step: payload.step ?? null,
          slide: payload.slide ?? null,
          answers: payload.answers ?? [],
          viewed_slides: payload.viewedSlides ?? [],
          summary: payload.summary ?? null,
          payload,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    if (error) throw error;
    return Response.json({ saved: true, sessionId });
  } catch (error) {
    return unavailable(error);
  }
}
