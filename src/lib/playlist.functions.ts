import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const SubmitSchema = z.object({
  token: z.string().min(8).max(128),
  title: z.string().min(1).max(200),
  artist: z.string().min(1).max(200),
  suggested_by: z.string().max(80).optional(),
});

export const submitTrack = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SubmitSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: inv, error } = await supabase
      .from("invitations")
      .select("id, allow_playlist")
      .eq("rsvp_token", data.token)
      .maybeSingle();
    if (error || !inv) throw new Error("Invitation introuvable");
    if (!inv.allow_playlist) throw new Error("Playlist désactivée");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: insErr } = await supabaseAdmin.from("playlist_tracks").insert({
      invitation_id: inv.id,
      title: data.title,
      artist: data.artist,
      suggested_by: data.suggested_by ?? null,
    });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });

export const listTracks = createServerFn({ method: "GET" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().min(8).max(128) }).parse(d))
  .handler(async ({ data }) => {
    const { data: inv } = await supabase
      .from("invitations")
      .select("id")
      .eq("token", data.token)
      .maybeSingle();
    if (!inv) return { tracks: [] };
    const { data: tracks } = await supabase
      .from("playlist_tracks")
      .select("id, title, artist, suggested_by, created_at")
      .eq("invitation_id", inv.id)
      .order("created_at", { ascending: false })
      .limit(300);
    return { tracks: tracks ?? [] };
  });
