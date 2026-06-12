/** Lovable AI gateway fetch helper for server functions. */
export async function callLovableAI(opts: {
  model?: string;
  system?: string;
  prompt: string;
  json?: boolean;
}): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY manquant");
  const body = {
    model: opts.model ?? "google/gemini-3-flash-preview",
    messages: [
      ...(opts.system ? [{ role: "system", content: opts.system }] : []),
      { role: "user", content: opts.prompt },
    ],
    ...(opts.json ? { response_format: { type: "json_object" } } : {}),
  };
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error("Trop de requêtes IA, réessayez dans un instant.");
    if (res.status === 402) throw new Error("Crédits IA épuisés. Rechargez votre espace Lovable Cloud.");
    throw new Error(`AI gateway error ${res.status}: ${txt.slice(0, 200)}`);
  }
  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content ?? "";
}
