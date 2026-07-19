import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const tokenSchema = z
  .string()
  .min(6)
  .max(64)
  .regex(/^[a-zA-Z0-9_-]+$/);

/** Lecture publique d'une invitation par token, incluant RSVP + playlist. */
export const getInvitationBundle = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ token: tokenSchema }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv } = await supabaseAdmin
      .from("invitations")
      .select(
        "id, token, rsvp_token, couple_names, event_date, venue, hero_url, message, allow_playlist, allow_gallery, theme, blocks",
      )
      .eq("token", data.token)
      .maybeSingle();
    if (!inv) return { invitation: null, rsvps: [], playlist: [] };

    const [{ data: rsvps }, { data: playlist }] = await Promise.all([
      supabaseAdmin
        .from("rsvps")
        .select(
          "id, guest_name, status, guests_count, allergies, needs_transport, message, created_at",
        )
        .eq("invitation_id", inv.id)
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("playlist_tracks")
        .select("id, title, artist, suggested_by, created_at")
        .eq("invitation_id", inv.id)
        .order("created_at", { ascending: false }),
    ]);

    return { invitation: inv, rsvps: rsvps ?? [], playlist: playlist ?? [] };
  });

const rsvpSchema = z.object({
  token: tokenSchema,
  guest_name: z.string().trim().min(1).max(120),
  guest_email: z.string().email().max(255).optional().or(z.literal("")),
  status: z.enum(["yes", "no", "maybe"]),
  guests_count: z.number().int().min(1).max(10),
  allergies: z.string().trim().max(300).optional().or(z.literal("")),
  needs_transport: z.boolean().optional().default(false),
  message: z.string().max(800).optional().or(z.literal("")),
  // Honeypot anti-spam : champ invisible pour un humain, rempli par les bots
  // qui auto-complètent tous les champs d'un formulaire. Doit rester vide.
  company: z.string().max(200).optional().or(z.literal("")),
});

/** Création publique d'un RSVP via token. */
export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((input) => rsvpSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot rempli => probable bot : on répond succès sans rien écrire,
    // pour ne pas révéler la présence du piège.
    if (data.company) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv } = await supabaseAdmin
      .from("invitations")
      .select("id")
      .eq("token", data.token)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { error } = await supabaseAdmin.from("rsvps").insert({
      invitation_id: inv.id,
      guest_name: data.guest_name,
      guest_email: data.guest_email || null,
      status: data.status,
      guests_count: data.guests_count,
      allergies: data.allergies || null,
      needs_transport: data.needs_transport ?? false,
      message: data.message || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const trackSchema = z.object({
  token: tokenSchema,
  title: z.string().trim().min(1).max(200),
  artist: z.string().trim().max(200).optional().or(z.literal("")),
  suggested_by: z.string().trim().max(120).optional().or(z.literal("")),
});

/** Ajout public d'un titre à la playlist via token. */
export const addPlaylistTrack = createServerFn({ method: "POST" })
  .inputValidator((input) => trackSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv } = await supabaseAdmin
      .from("invitations")
      .select("id, allow_playlist")
      .eq("token", data.token)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");
    if (!inv.allow_playlist) throw new Error("Playlist désactivée");

    const { error } = await supabaseAdmin.from("playlist_tracks").insert({
      invitation_id: inv.id,
      title: data.title,
      artist: data.artist || null,
      suggested_by: data.suggested_by || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
