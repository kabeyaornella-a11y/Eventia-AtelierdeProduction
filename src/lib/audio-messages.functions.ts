import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const tokenSchema = z
  .string()
  .min(6)
  .max(64)
  .regex(/^[a-zA-Z0-9_-]+$/);

/** URL signée d'upload direct vers le bucket privé "audio-messages". */
export const createAudioUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ token: tokenSchema, ext: z.string().regex(/^(webm|mp4|m4a|ogg|wav)$/i) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv, error } = await supabaseAdmin
      .from("invitations")
      .select("id")
      .or(`token.eq.${data.token},rsvp_token.eq.${data.token}`)
      .maybeSingle();
    if (error || !inv) throw new Error("Invitation introuvable");
    const filename = `public-uploads/${inv.id}/${crypto.randomUUID()}.${data.ext.toLowerCase()}`;
    const { data: signed, error: sErr } = await supabaseAdmin.storage
      .from("audio-messages")
      .createSignedUploadUrl(filename);
    if (sErr || !signed) throw new Error(sErr?.message ?? "Upload URL error");
    return { path: filename, token: signed.token, url: signed.signedUrl };
  });

const submitSchema = z.object({
  token: tokenSchema,
  guest_name: z.string().trim().min(1).max(80).optional(),
  duration_seconds: z.number().int().min(0).max(600).optional(),
  audio_url: z.string().min(1).max(500),
});

/** Dépose un message vocal (en attente de modération). */
export const submitAudioMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => submitSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv, error } = await supabaseAdmin
      .from("invitations")
      .select("id")
      .or(`token.eq.${data.token},rsvp_token.eq.${data.token}`)
      .maybeSingle();
    if (error || !inv) throw new Error("Invitation introuvable");
    const { error: insErr } = await supabaseAdmin.from("audio_messages").insert({
      invitation_id: inv.id,
      guest_name: data.guest_name ?? null,
      audio_url: data.audio_url,
      duration_seconds: data.duration_seconds ?? null,
      approved: false,
    });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });

/** Messages vocaux approuvés, lecture publique (URLs signées 24h). */
export const listApprovedAudioMessages = createServerFn({ method: "GET" })
  .inputValidator((d: { token: string }) => z.object({ token: tokenSchema }).parse(d))
  .handler(async ({ data }) => {
    const { data: inv } = await supabase
      .from("invitations")
      .select("id")
      .or(`token.eq.${data.token},rsvp_token.eq.${data.token}`)
      .maybeSingle();
    if (!inv) return { messages: [] };
    const { data: rows } = await supabase
      .from("audio_messages")
      .select("id, guest_name, audio_url, duration_seconds, created_at")
      .eq("invitation_id", inv.id)
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(80);
    if (!rows) return { messages: [] };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const resolved = await Promise.all(
      rows.map(async (m) => {
        const { data: signed } = await supabaseAdmin.storage
          .from("audio-messages")
          .createSignedUrl(m.audio_url, 86400);
        return { ...m, audio_url: signed?.signedUrl ?? m.audio_url };
      }),
    );
    return { messages: resolved };
  });

/** Messages en attente de modération pour le propriétaire de l'invitation. */
export const listPendingAudioForOwner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { invitation_id: string }) =>
    z.object({ invitation_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Introuvable");
    const { data: rows } = await context.supabase
      .from("audio_messages")
      .select("id, guest_name, audio_url, duration_seconds, approved, created_at")
      .eq("invitation_id", data.invitation_id)
      .order("created_at", { ascending: false })
      .limit(200);
    if (!rows) return { messages: [] };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const resolved = await Promise.all(
      rows.map(async (m) => {
        const { data: signed } = await supabaseAdmin.storage
          .from("audio-messages")
          .createSignedUrl(m.audio_url, 86400);
        return { ...m, audio_url: signed?.signedUrl ?? m.audio_url };
      }),
    );
    return { messages: resolved };
  });

/** Approuve ou retire un message vocal. */
export const moderateAudioMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; approved: boolean }) =>
    z.object({ id: z.string().uuid(), approved: z.boolean() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("audio_messages")
      .update({ approved: data.approved })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
