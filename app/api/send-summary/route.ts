import { z } from "zod";
import { getSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const CONSENT_VERSION = "summary-email-v1";
const BOOKING_URL = "https://advancio.zohobookings.com/AdvancioSparkDemo";

const bodySchema = z.object({
  sessionId: z.string().regex(/^[a-zA-Z0-9_-]{8,80}$/),
  email: z.string().email().max(254),
  name: z.string().trim().min(1).max(120),
  title: z.string().max(150).optional().default(""),
  company: z.string().max(150).optional().default(""),
});

type SummaryPayload = {
  visitorName?: string | null;
  area?: string;
  recommendation?: string;
  recommendationReason?: string;
  futureState?: string;
  storyStagesViewed?: string[];
  answers?: { question: string; answer: string; responseType?: string }[];
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char] as string)
  );
}

function renderEmail(summary: SummaryPayload, personalizedUrl: string) {
  const answers = summary.answers ?? [];
  const stages = summary.storyStagesViewed?.length ? summary.storyStagesViewed.join(", ") : "Solution overview";
  const name = summary.visitorName?.trim() || "";
  const title = name ? `${name}'s Advancio bottleneck journey` : "My Advancio bottleneck journey";

  const text = [
    title,
    "",
    `Focus: ${summary.area ?? ""}`,
    `Recommended accelerator: ${summary.recommendation ?? ""}`,
    `Future state: ${summary.futureState ?? ""}`,
    "",
    "My answers:",
    ...answers.map((a) => `- ${a.question}\n  ${a.answer}`),
    "",
    `What I explored: ${stages}`,
    "",
    `Why this path: ${summary.recommendationReason ?? ""}`,
    "",
    `Revisit your journey: ${personalizedUrl}`,
    `Book a demo: ${BOOKING_URL}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:600px;margin:0 auto">
      <h1 style="font-size:20px;margin:0 0 4px">${escapeHtml(title)}</h1>
      <p style="margin:0 0 16px;color:#555">Focus: <strong>${escapeHtml(summary.area ?? "")}</strong> &middot; Recommended: <strong>${escapeHtml(summary.recommendation ?? "")}</strong></p>
      <p style="margin:0 0 16px">${escapeHtml(summary.futureState ?? "")}</p>
      <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:16px">
        ${answers
          .map(
            (a) => `<tr><td style="padding:8px 0;border-top:1px solid #eee"><div style="font-size:12px;color:#888;text-transform:uppercase">${escapeHtml(a.question)}</div><div style="font-size:15px">${escapeHtml(a.answer)}</div></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:0 0 4px;font-size:13px;color:#888">What you explored: ${escapeHtml(stages)}</p>
      <p style="margin:0 0 20px">${escapeHtml(summary.recommendationReason ?? "")}</p>
      <div>
        <a href="${personalizedUrl}" style="display:inline-block;padding:12px 20px;background:#d51f2b;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;margin-right:10px">Revisit your journey</a>
        <a href="${BOOKING_URL}" style="display:inline-block;padding:12px 20px;background:#fff;color:#111;text-decoration:none;border-radius:8px;font-weight:bold;border:1px solid #ccc">Book a demo</a>
      </div>
    </div>`;

  return { text, html };
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  const body = bodySchema.safeParse(raw);
  if (!body.success) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }
  const { sessionId, email, name, title, company } = body.data;

  const supabase = getSupabase();
  const { data: session, error: fetchError } = await supabase
    .from("sessions")
    .select("summary")
    .eq("id", sessionId)
    .maybeSingle();

  if (fetchError || !session?.summary) {
    return Response.json({ error: "Finish your journey before emailing a summary." }, { status: 404 });
  }

  const { data: request_, error: insertError } = await supabase
    .from("follow_up_requests")
    .insert({
      session_id: sessionId,
      email,
      name,
      title: title || null,
      company: company || null,
      consent_text_version: CONSENT_VERSION,
    })
    .select("id")
    .single();

  if (insertError || !request_) {
    console.error("follow_up_requests insert error", insertError?.code, insertError?.message);
    return Response.json({ error: "Your email could not be saved right now. Please try again." }, { status: 503 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !fromEmail) {
    console.error("Resend is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL)");
    await supabase.from("follow_up_requests").update({ delivery_status: "failed", error: "not_configured" }).eq("id", request_.id);
    return Response.json({ error: "Email delivery is not set up yet. Please try the QR code or copy link instead." }, { status: 503 });
  }

  // Test deployments (any schema other than "booth") never send real email outside an allowlist.
  // See docs/MARKETING_PLATFORM.md, "Test environment": log-and-drop everything else.
  const isTestEnv = (process.env.DB_SCHEMA || "booth") !== "booth";
  if (isTestEnv) {
    const allowlist = (process.env.TEST_EMAIL_ALLOWLIST || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
    if (!allowlist.includes(email.toLowerCase())) {
      console.log("Test env: dropped send-summary outside TEST_EMAIL_ALLOWLIST");
      await supabase.from("follow_up_requests").update({ delivery_status: "skipped", error: "test_env_not_allowlisted" }).eq("id", request_.id);
      return Response.json({ sent: true });
    }
  }

  const appBaseUrl = process.env.APP_BASE_URL || new URL(request.url).origin;
  const personalizedUrl = `${appBaseUrl}?session=${encodeURIComponent(sessionId)}`;
  // The form's submitted name is the freshest signal (it's what the visitor just confirmed),
  // so it takes priority over whatever was already stored on the session.
  const summary: SummaryPayload = { ...(session.summary as SummaryPayload), visitorName: name };
  const { text, html } = renderEmail(summary, personalizedUrl);
  const subject = `${name}'s Advancio bottleneck journey`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject,
        text,
        html,
      }),
    });

    const resendBody = (await resendResponse.json().catch(() => null)) as { id?: string; message?: string } | null;
    if (!resendResponse.ok) throw new Error(resendBody?.message || `Resend returned ${resendResponse.status}`);

    await supabase
      .from("follow_up_requests")
      .update({ delivery_status: "sent", resend_message_id: resendBody?.id ?? null })
      .eq("id", request_.id);
    return Response.json({ sent: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    console.error("Resend send error", message);
    await supabase.from("follow_up_requests").update({ delivery_status: "failed", error: message.slice(0, 300) }).eq("id", request_.id);
    return Response.json({ error: "Your journey could not be emailed right now. Please try again." }, { status: 502 });
  }
}
