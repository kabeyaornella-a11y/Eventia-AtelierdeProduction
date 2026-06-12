import { createFileRoute } from "@tanstack/react-router";

/**
 * Worker d'envoi des emails en file d'attente.
 * Appelé par pg_cron (toutes les minutes) ou manuellement.
 * Passe les `email_logs` de "queued" -> "sent" / "failed" via Resend (connector gateway).
 */

const TEMPLATES: Record<string, { subject: (p: Record<string, unknown>) => string; html: (p: Record<string, unknown>) => string }> = {
  order_confirmation: {
    subject: (p) => `Eventia · votre commande ${(p.ref as string) ?? ""} est bien reçue`,
    html: (p) => baseHtml("Votre commande est confirmée", `Merci ${escape((p.name as string) ?? "")}, nous avons bien reçu votre commande <strong>${escape((p.ref as string) ?? "")}</strong>. Vous recevrez le paiement et le suivi par email.`),
  },
  payment_received: {
    subject: () => "Eventia · paiement reçu, démarrage de la production",
    html: (p) => baseHtml("Paiement bien reçu", `Votre paiement est confirmé. Notre Studio démarre la production de votre invitation <strong>${escape((p.ref as string) ?? "")}</strong>.`),
  },
  validation: {
    subject: () => "Eventia · votre maquette est prête à valider",
    html: (p) => baseHtml("Maquette prête", `Votre invitation est prête. <a href="${escape((p.url as string) ?? "#")}">Voir et valider la maquette</a>.`),
  },
  delivery: {
    subject: () => "Eventia · votre coffret est en route",
    html: (p) => baseHtml("Expédition", `Votre coffret a été expédié. Numéro de suivi : <strong>${escape((p.tracking as string) ?? "à venir")}</strong>.`),
  },
  activation: {
    subject: () => "Eventia · votre invitation est activée",
    html: (p) => baseHtml("Invitation activée", `Votre invitation en ligne est active. <a href="${escape((p.url as string) ?? "#")}">L'ouvrir</a>.`),
  },
  follow_up: {
    subject: () => "Eventia · un mot avant le grand jour",
    html: (p) => baseHtml("Suivi", `${escape((p.message as string) ?? "Tout est prêt côté Studio. Une question ?")}`),
  },
  reminder: {
    subject: () => "Eventia · merci de confirmer votre présence",
    html: (p) => baseHtml("RSVP", `Vous êtes attendu·e au mariage de <strong>${escape((p.couple as string) ?? "")}</strong>. <a href="${escape((p.url as string) ?? "#")}">Confirmer votre présence</a>.`),
  },
  thank_you: {
    subject: () => "Eventia · merci",
    html: () => baseHtml("Merci", `Votre événement est passé. Merci de nous avoir fait confiance.`),
  },
  souvenirs: {
    subject: () => "Eventia · vos souvenirs sont prêts",
    html: (p) => baseHtml("Souvenirs", `Vos souvenirs (photos, audios, RSVP) sont consultables : <a href="${escape((p.url as string) ?? "#")}">les ouvrir</a>.`),
  },
  b2b_ack: {
    subject: (p) => `Eventia · demande reçue pour ${escape((p.company as string) ?? "votre entreprise")}`,
    html: (p) => baseHtml("Demande bien reçue", `Bonjour ${escape((p.contact_name as string) ?? "")}, merci pour votre intérêt. Notre équipe revient vers vous sous 24 h avec une première proposition.`),
  },
  wedding_j30: {
    subject: (p) => `Eventia · J-30 avant ${escape((p.couple as string) ?? "votre mariage")}`,
    html: (p) => baseHtml("J-30. Tout se met en place.", `Plus qu'un mois avant le grand jour de <strong>${escape((p.couple as string) ?? "")}</strong>. C'est le moment d'affiner la papeterie, la signalétique et le calendrier du jour J. Notre Studio reste à vos côtés. <a href="${escape((p.url as string) ?? "#")}">Ouvrir votre espace</a>.`),
  },
  wedding_j7: {
    subject: (p) => `Eventia · J-7 avant ${escape((p.couple as string) ?? "votre mariage")}`,
    html: (p) => baseHtml("J-7. Dernière ligne droite.", `Sept jours avant <strong>${escape((p.couple as string) ?? "")}</strong>. Vérifiez les derniers RSVP, la playlist et la galerie Live. Pensez à diffuser le lien Eventia Live à vos invités. <a href="${escape((p.url as string) ?? "#")}">Accéder au Live</a>.`),
  },
  wedding_j1: {
    subject: (p) => `Eventia · demain est votre jour`,
    html: (p) => baseHtml("Demain.", `Demain, <strong>${escape((p.couple as string) ?? "vous")}</strong>. Tout est prêt. Profitez de chaque instant. Nous veillons sur l'expérience digitale, vous veillez sur l'essentiel. <a href="${escape((p.url as string) ?? "#")}">Votre espace Live</a>.`),
  },
};


function escape(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

function baseHtml(title: string, body: string) {
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#FAF6EE;padding:32px;color:#2A1E12">
  <table align="center" width="560" style="background:#FFF;padding:40px;border:1px solid #D9C9A6">
    <tr><td>
      <div style="letter-spacing:0.3em;text-transform:uppercase;font-size:11px;color:#B7943B">Eventia Signature</div>
      <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;margin:18px 0 12px;color:#2A1E12">${escape(title)}</h1>
      <p style="font-size:15px;line-height:1.7;color:#4A3A28">${body}</p>
      <hr style="border:none;border-top:1px solid #E7DCC2;margin:32px 0"/>
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9B8A6B">Eventia Signature · invitations premium</p>
    </td></tr>
  </table>
  </body></html>`;
}

export const Route = createFileRoute("/api/public/email-worker")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Auth simple : header apikey doit correspondre à la clé publishable Supabase
        const apikey = request.headers.get("apikey");
        if (!apikey || apikey !== process.env.SUPABASE_PUBLISHABLE_KEY) {
          return new Response("Unauthorized", { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: queued, error } = await supabaseAdmin
          .from("email_logs")
          .select("id, template, recipient, subject, payload")
          .eq("status", "queued")
          .limit(25);
        if (error) return Response.json({ error: error.message }, { status: 500 });

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const SENDER = process.env.EMAIL_SENDER || "Eventia Signature <onboarding@resend.dev>";

        if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
          return Response.json({ error: "Email provider not configured" }, { status: 503 });
        }

        const results: Array<{ id: string; ok: boolean; error?: string }> = [];

        for (const row of queued ?? []) {
          const tpl = TEMPLATES[row.template as string];
          const payload = (row.payload as Record<string, unknown>) || {};
          if (!tpl) {
            await supabaseAdmin.from("email_logs").update({ status: "failed" }).eq("id", row.id);
            results.push({ id: row.id, ok: false, error: "unknown_template" });
            continue;
          }
          try {
            const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "X-Connection-Api-Key": RESEND_API_KEY,
              },
              body: JSON.stringify({
                from: SENDER,
                to: [row.recipient],
                subject: row.subject || tpl.subject(payload),
                html: tpl.html(payload),
              }),
            });
            if (!res.ok) {
              const txt = await res.text();
              await supabaseAdmin.from("email_logs").update({ status: "failed" }).eq("id", row.id);
              results.push({ id: row.id, ok: false, error: `${res.status}: ${txt.slice(0, 200)}` });
            } else {
              await supabaseAdmin
                .from("email_logs")
                .update({ status: "sent", sent_at: new Date().toISOString() })
                .eq("id", row.id);
              results.push({ id: row.id, ok: true });
            }
          } catch (e) {
            await supabaseAdmin.from("email_logs").update({ status: "failed" }).eq("id", row.id);
            results.push({ id: row.id, ok: false, error: e instanceof Error ? e.message : "unknown" });
          }
        }

        return Response.json({ processed: results.length, results });
      },
    },
  },
});
