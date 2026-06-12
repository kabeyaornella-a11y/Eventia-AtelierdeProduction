import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Webhook interne — déclenche une transition de statut sur une commande/invitation
 * et met en file l'email associé. Protégé par HMAC sha256 du body avec EVENTIA_HOOK_SECRET.
 *
 * Body: { type: "order_confirmation"|"payment_received"|"validation"|"delivery"|"activation"|"thank_you"|"souvenirs",
 *         order_id?: string, invitation_id?: string, recipient: string, payload?: object }
 */
export const Route = createFileRoute("/api/public/status-transition")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.EVENTIA_HOOK_SECRET;
        const sig = request.headers.get("x-eventia-signature") ?? "";
        const body = await request.text();

        if (secret) {
          const expected = createHmac("sha256", secret).update(body).digest("hex");
          const a = Buffer.from(sig);
          const b = Buffer.from(expected);
          if (a.length !== b.length || !timingSafeEqual(a, b)) {
            return new Response("Invalid signature", { status: 401 });
          }
        }

        let payload: {
          type: string; order_id?: string; invitation_id?: string;
          recipient: string; payload?: Record<string, unknown>;
        };
        try { payload = JSON.parse(body); } catch { return new Response("Bad JSON", { status: 400 }); }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Transitions de statut
        if (payload.type === "payment_received" && payload.order_id) {
          await supabaseAdmin.from("orders").update({ status: "paid" }).eq("id", payload.order_id);
        }
        if (payload.type === "validation" && payload.invitation_id) {
          await supabaseAdmin.from("invitations").update({ production_status: "review" }).eq("id", payload.invitation_id);
        }
        if (payload.type === "activation" && payload.invitation_id) {
          await supabaseAdmin.from("invitations").update({ production_status: "ready", progress: 100 }).eq("id", payload.invitation_id);
        }

        // Mise en file de l'email
        const { error } = await supabaseAdmin.from("email_logs").insert({
          template: payload.type,
          recipient: payload.recipient,
          order_id: payload.order_id ?? null,
          invitation_id: payload.invitation_id ?? null,
          payload: (payload.payload ?? {}) as never,
          status: "queued",
        });
        if (error) return Response.json({ error: error.message }, { status: 500 });

        return Response.json({ ok: true });
      },
    },
  },
});
