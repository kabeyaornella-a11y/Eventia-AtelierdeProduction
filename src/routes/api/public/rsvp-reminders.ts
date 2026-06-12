import { createFileRoute } from "@tanstack/react-router";

/**
 * Cron quotidien : pour chaque invitation dont l'événement est dans 30/14/7/2 jours,
 * pousser un email "reminder" dans email_logs pour chaque RSVP "pending" ou absent.
 */
export const Route = createFileRoute("/api/public/rsvp-reminders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get("apikey");
        if (!apikey || apikey !== process.env.SUPABASE_PUBLISHABLE_KEY) {
          return new Response("Unauthorized", { status: 401 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const now = new Date();
        const windows = [30, 14, 7, 2];
        const queued: string[] = [];

        const { data: invitations } = await supabaseAdmin
          .from("invitations")
          .select("id, user_id, couple_names, event_date, rsvp_token, token")
          .gte("event_date", now.toISOString())
          .eq("production_status", "ready");

        for (const inv of invitations ?? []) {
          const days = Math.ceil((new Date(inv.event_date as string).getTime() - now.getTime()) / 86400000);
          if (!windows.includes(days)) continue;

          const { data: rsvps } = await supabaseAdmin
            .from("rsvps")
            .select("guest_email, status")
            .eq("invitation_id", inv.id);

          const url = `https://eventia-signature-atelier.lovable.app/rsvp/${inv.rsvp_token ?? inv.token}`;
          for (const r of rsvps ?? []) {
            if (!r.guest_email || r.status === "yes" || r.status === "no") continue;
            await supabaseAdmin.from("email_logs").insert({
              user_id: inv.user_id,
              invitation_id: inv.id,
              template: "reminder",
              recipient: r.guest_email,
              payload: { couple: inv.couple_names, url, days },
              status: "queued",
            });
            queued.push(r.guest_email);
          }
        }

        return Response.json({ queued: queued.length });
      },
    },
  },
});
