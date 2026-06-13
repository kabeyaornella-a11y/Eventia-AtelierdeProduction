import { createFileRoute } from "@tanstack/react-router";

/**
 * Cron quotidien : enfile dans email_logs les rappels J-30, J-7, J-1
 * pour les invitations dont event_date tombe à 30, 7 ou 1 jour.
 *
 * Idempotence : on ne crée pas de doublon si un email_logs avec
 * (invitation_id, template) existe déjà.
 *
 * Appel attendu via pg_cron une fois par jour.
 */
export const Route = createFileRoute("/api/public/wedding-reminders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get("apikey");
        if (!apikey || apikey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
          return new Response("Unauthorized", { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const targets: Array<{ days: number; template: string }> = [
          { days: 30, template: "wedding_j30" },
          { days: 7, template: "wedding_j7" },
          { days: 1, template: "wedding_j1" },
        ];

        const results: Record<string, number> = {};
        const origin = process.env.PUBLIC_SITE_URL || "https://eventia-signature-atelier.lovable.app";

        for (const t of targets) {
          // Fenêtre [J-D, J-D+1) en jours civils
          const start = new Date();
          start.setUTCHours(0, 0, 0, 0);
          start.setUTCDate(start.getUTCDate() + t.days);
          const end = new Date(start);
          end.setUTCDate(end.getUTCDate() + 1);

          const { data: invs } = await supabaseAdmin
            .from("invitations")
            .select("id, couple_names, event_date, token, user_id")
            .gte("event_date", start.toISOString())
            .lt("event_date", end.toISOString());

          if (!invs?.length) {
            results[t.template] = 0;
            continue;
          }

          // Récupère les emails des propriétaires
          const userIds = Array.from(new Set(invs.map((i) => i.user_id).filter(Boolean))) as string[];
          const emailsByUser = new Map<string, string>();
          for (const uid of userIds) {
            const { data: u } = await supabaseAdmin.auth.admin.getUserById(uid);
            if (u?.user?.email) emailsByUser.set(uid, u.user.email);
          }

          let enqueued = 0;
          for (const inv of invs) {
            if (!inv.user_id) continue;
            const email = emailsByUser.get(inv.user_id);
            if (!email) continue;

            // Idempotence
            const { data: existing } = await supabaseAdmin
              .from("email_logs")
              .select("id")
              .eq("invitation_id", inv.id)
              .eq("template", t.template)
              .maybeSingle();
            if (existing) continue;

            await supabaseAdmin.from("email_logs").insert({
              recipient: email,
              template: t.template,
              invitation_id: inv.id,
              user_id: inv.user_id,
              status: "queued",
              payload: {
                couple: inv.couple_names,
                url: `${origin}/live/${inv.token}`,
              },
            });
            enqueued++;
          }
          results[t.template] = enqueued;
        }

        return Response.json({ ok: true, enqueued: results });
      },
    },
  },
});
