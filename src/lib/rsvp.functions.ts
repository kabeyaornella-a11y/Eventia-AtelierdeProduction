import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabase } from "@/integrations/supabase/client";

/** Liste les RSVP d'une invitation (owner uniquement via RLS). */
export const listMyRsvps = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ invitation_id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    // verify ownership
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");
    const { data: rsvps, error } = await context.supabase
      .from("rsvps")
      .select(
        "id, guest_name, guest_email, status, guests_count, companions, allergies, needs_transport, message, created_at",
      )
      .eq("invitation_id", data.invitation_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { rsvps: rsvps ?? [] };
  });

/** Récupère une invitation publique via rsvp_token (lecture limitée). */
export const getInvitationByRsvpToken = createServerFn({ method: "GET" })
  .inputValidator((i) => z.object({ token: z.string().min(8).max(64) }).parse(i))
  .handler(async ({ data }) => {
    const { data: inv, error } = await supabase
      .from("invitations")
      .select("id, token, couple_names, event_date, venue, theme, hero_url")
      .eq("rsvp_token", data.token)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!inv) throw new Error("Invitation introuvable");
    return { invitation: inv };
  });

const companionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  type: z.enum(["adult", "child"]).default("adult"),
  allergies: z.string().trim().max(300).optional().or(z.literal("")),
});

const submitSchema = z.object({
  token: z.string().min(8).max(64),
  guest_name: z.string().trim().min(1).max(120),
  guest_email: z.string().email().max(200).optional().or(z.literal("")),
  status: z.enum(["yes", "no", "maybe"]),
  companions: z.array(companionSchema).max(9).optional().default([]),
  allergies: z.string().trim().max(300).optional().or(z.literal("")),
  needs_transport: z.boolean().optional().default(false),
  message: z.string().max(500).optional().or(z.literal("")),
  // Honeypot anti-spam : doit rester vide, cf. invitation.functions.ts.
  company: z.string().max(200).optional().or(z.literal("")),
});

/** Soumet un RSVP public via token. */
export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((i) => submitSchema.parse(i))
  .handler(async ({ data }) => {
    if (data.company) return { ok: true };

    const { data: inv, error: e1 } = await supabase
      .from("invitations")
      .select("id")
      .eq("rsvp_token", data.token)
      .maybeSingle();
    if (e1) throw new Error(e1.message);
    if (!inv) throw new Error("Invitation introuvable");
    const { error } = await supabase.from("rsvps").insert({
      invitation_id: inv.id,
      guest_name: data.guest_name,
      guest_email: data.guest_email || null,
      status: data.status,
      guests_count: 1 + data.companions.length,
      companions: data.companions,
      allergies: data.allergies || null,
      needs_transport: data.needs_transport ?? false,
      message: data.message || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
