import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const atelierSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  request_type: z.enum(["papeterie", "gravure", "objets", "autre"]),
  details: z.string().trim().min(10).max(2000),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  event_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
});

const TYPE_LABEL: Record<string, string> = {
  papeterie: "Papeterie sur-mesure",
  gravure: "Gravure",
  objets: "Objets personnalisés",
  autre: "Autre",
};

/** Crée une demande Atelier et envoie un email de notification via Resend (gateway). */
export const submitAtelierRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => atelierSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error: dbError } = await supabaseAdmin.from("atelier_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      request_type: data.request_type,
      details: data.details,
      budget: data.budget || null,
      event_date: data.event_date || null,
    });
    if (dbError) throw new Error(dbError.message);

    // Email via Resend (gateway Lovable)
    const apiKey = process.env.LOVABLE_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (apiKey && resendKey) {
      const html = `
        <h2 style="font-family:Georgia,serif;color:#b88a3a;">Nouvelle demande Atelier — Eventia Signature</h2>
        <p><strong>Type :</strong> ${TYPE_LABEL[data.request_type] ?? data.request_type}</p>
        <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(data.phone)}</p>` : ""}
        ${data.budget ? `<p><strong>Budget :</strong> ${escapeHtml(data.budget)}</p>` : ""}
        ${data.event_date ? `<p><strong>Date événement :</strong> ${escapeHtml(data.event_date)}</p>` : ""}
        <hr/>
        <p style="white-space:pre-wrap;font-family:Georgia,serif;">${escapeHtml(data.details)}</p>
      `;

      const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Connection-Api-Key": resendKey,
        },
        body: JSON.stringify({
          from: "Eventia Atelier <onboarding@resend.dev>",
          to: ["atelier@eventia-signature.fr"],
          reply_to: data.email,
          subject: `Atelier — ${TYPE_LABEL[data.request_type]} — ${data.name}`,
          html,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Resend gateway error", res.status, text);
        // Pas de throw : la demande est en base, l'email reste secondaire.
      }
    }

    return { ok: true };
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
