import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "crypto";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Webhook Gumroad — endpoint public appelé par Gumroad à chaque vente.
 *
 * SÉCURITÉ : Gumroad "Ping" envoie un POST form-urlencoded SANS signature HMAC.
 * On sécurise donc via un secret partagé passé en query string `?token=...`
 * (timing-safe compare). Ce secret est stocké côté Lovable et JAMAIS exposé au client.
 *
 * Configuration Gumroad :
 *   Settings → Advanced → Ping
 *   URL = https://eventia-signature-atelier.lovable.app/api/public/gumroad?token=VOTRE_SECRET
 *   Resource subscriptions : "sale"
 */
export const Route = createFileRoute("/api/public/gumroad")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 30 appels / minute par IP pour limiter les abus
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
        const rl = checkRateLimit(`gumroad:${ip}`, 30);
        if (!rl.allowed) {
          return new Response("Too Many Requests", {
            status: 429,
            headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
          });
        }

        const secret = process.env.GUMROAD_WEBHOOK_SECRET;
        if (!secret) {
          console.error("[gumroad] GUMROAD_WEBHOOK_SECRET manquant");
          return new Response("Server misconfigured", { status: 500 });
        }

        // Vérification du secret partagé en query string
        const url = new URL(request.url);
        const token = url.searchParams.get("token") ?? "";
        const a = Buffer.from(token);
        const b = Buffer.from(secret);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          console.warn("[gumroad] token invalide");
          return new Response("Unauthorized", { status: 401 });
        }

        // Parse form-urlencoded payload Gumroad
        const formData = await request.formData();
        const payload: Record<string, string> = {};
        for (const [k, v] of formData.entries()) payload[k] = String(v);

        // Gumroad envoie ref via url_params[ref] OU via ?ref= sur l'URL de checkout
        const ref =
          payload["url_params[ref]"] || payload.ref || payload["custom_fields[ref]"] || null;
        const saleId = payload.sale_id || payload.id || null;
        const email = payload.email || null;

        if (!saleId) {
          console.warn("[gumroad] sale_id manquant", payload);
          return new Response("Missing sale_id", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Match prioritaire par ref (lien interne fort), fallback par email + status pending
        let orderQuery = supabaseAdmin
          .from("orders")
          .select("id, ref, email, formula, total_eur, status")
          .limit(1);

        if (ref) {
          orderQuery = orderQuery.eq("ref", ref);
        } else if (email) {
          orderQuery = orderQuery.eq("email", email).eq("status", "pending");
        } else {
          return new Response("No ref nor email to match", { status: 400 });
        }

        const { data: orders, error: findErr } = await orderQuery;
        if (findErr) {
          console.error("[gumroad] erreur lookup", findErr);
          return new Response("Lookup error", { status: 500 });
        }

        const order = orders?.[0];
        if (!order) {
          // On stocke quand même la vente brute pour réconciliation manuelle
          console.warn("[gumroad] commande introuvable pour ref=", ref, "email=", email);
          await supabaseAdmin.from("orders").insert({
            ref: `gum-${saleId.slice(0, 8)}`,
            email: email ?? "unknown@gumroad.com",
            formula: payload.product_name || "unknown",
            total_eur: Math.round(Number(payload.price || 0) / 100),
            status: "paid",
            sale_id: saleId,
            paid_at: new Date().toISOString(),
            gumroad_url: payload.product_permalink || null,
            webhook_payload: payload as never,
            config: {} as never,
          });
          return new Response(JSON.stringify({ ok: true, matched: false }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Mise à jour de la commande existante
        const { error: updErr } = await supabaseAdmin
          .from("orders")
          .update({
            status: "paid",
            sale_id: saleId,
            paid_at: new Date().toISOString(),
            webhook_payload: payload as never,
          })
          .eq("id", order.id);

        if (updErr) {
          console.error("[gumroad] erreur update", updErr);
          return new Response("Update error", { status: 500 });
        }

        // Email de confirmation via Resend (best-effort, ne fait pas échouer le webhook)
        try {
          await sendConfirmationEmail({
            to: order.email,
            ref: order.ref,
            formula: order.formula,
            totalEur: order.total_eur,
          });
        } catch (e) {
          console.error("[gumroad] erreur envoi email", e);
        }

        return new Response(JSON.stringify({ ok: true, matched: true, ref: order.ref }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },

      // Gumroad teste parfois en GET — on répond 200 pour valider l'URL
      GET: async () =>
        new Response("Eventia Gumroad webhook is live", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        }),
    },
  },
});

async function sendConfirmationEmail(args: {
  to: string;
  ref: string;
  formula: string;
  totalEur: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const lovableKey = process.env.LOVABLE_API_KEY;
  if (!apiKey || !lovableKey) {
    console.warn("[gumroad] Resend non configuré, email ignoré");
    return;
  }

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2a1f15;background:#faf6ef;padding:40px 32px;">
      <div style="text-align:center;border-bottom:1px solid #d4af37;padding-bottom:24px;margin-bottom:32px;">
        <div style="letter-spacing:.3em;font-size:11px;color:#a98a3d;text-transform:uppercase;">Eventia</div>
        <h1 style="font-weight:400;font-size:28px;margin:16px 0 0;color:#7a5a2e;">Merci pour votre commande</h1>
      </div>
      <p style="line-height:1.7;">Votre paiement a bien été reçu. Nous vous accompagnons désormais dans la création de votre événement signature.</p>
      <div style="background:white;border:1px solid #e8dec8;padding:20px;margin:24px 0;">
        <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a98a3d;margin-bottom:8px;">Récapitulatif</div>
        <div><strong>Référence :</strong> ${args.ref}</div>
        <div><strong>Formule :</strong> ${args.formula}</div>
        <div><strong>Montant :</strong> ${args.totalEur} €</div>
      </div>
      <p style="line-height:1.7;">Vous pouvez suivre votre commande dans votre espace client.</p>
      <p style="line-height:1.7;color:#7a5a2e;font-style:italic;">L'équipe Eventia</p>
    </div>
  `;

  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": apiKey,
    },
    body: JSON.stringify({
      from: "Eventia <onboarding@resend.dev>",
      to: [args.to],
      subject: `Votre commande Eventia — ${args.ref}`,
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend ${res.status}: ${txt}`);
  }
}
