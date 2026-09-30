import { z } from "zod";

export const dynamic = "force-dynamic";

const MAX_IMAGE_CHARS = 6_000_000; // ~4.3MB decoded, generous for a single badge photo
const bodySchema = z.object({
  image: z.string().regex(/^data:image\/(jpeg|png|webp);base64,/).max(MAX_IMAGE_CHARS),
});

const PROMPT =
  "This image shows a conference attendee's name badge, possibly photographed at an angle or with glare. " +
  "Extract the attendee's own personal full name, job title, and company/organization. " +
  "Never use a sponsor name, event name, or booth name as the company. " +
  "Respond with strict JSON only, no other text: " +
  '{"name": "...", "title": "...", "company": "..."} using an empty string for any field that is not legible.';

export async function POST(request: Request) {
  // The image is forwarded to the vision model and never stored: no disk write, no
  // database write, no logging of the image data itself.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "A badge photo is required." }, { status: 400 });
  }

  const body = bodySchema.safeParse(raw);
  if (!body.success) {
    return Response.json({ error: "A badge photo is required." }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("Badge scan is not configured (OPENROUTER_API_KEY)");
    return Response.json({ error: "Badge scanning is not set up yet. Type your name instead." }, { status: 503 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-5-nano",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: body.data.image } },
            ],
          },
        ],
        response_format: { type: "json_object" },
        reasoning: { effort: "low" },
        max_tokens: 1200,
      }),
    });

    if (!response.ok) throw new Error(`OpenRouter returned ${response.status}`);
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content) as { name?: unknown; title?: unknown; company?: unknown };
    const clean = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, 100) : "");
    return Response.json({ name: clean(parsed.name), title: clean(parsed.title), company: clean(parsed.company) });
  } catch (error) {
    console.error("Badge scan error", error instanceof Error ? error.message : "unknown");
    return Response.json(
      { name: "", title: "", company: "", error: "Could not read your badge. Type your name instead." },
      { status: 200 }
    );
  }
}
