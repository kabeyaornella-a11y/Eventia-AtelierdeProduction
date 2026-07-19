import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SubmitSchema = z.object({
  token: z
    .string()
    .min(8)
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/),
  guest_name: z.string().min(1).max(80).optional(),
  caption: z.string().max(280).optional(),
  image_url: z.string().url().max(2000),
});

export const submitGalleryPhoto = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SubmitSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: inv, error } = await supabase
      .from("invitations")
      .select("id, allow_gallery")
      .or(`token.eq.${data.token},rsvp_token.eq.${data.token}`)
      .maybeSingle();
    if (error || !inv) throw new Error("Invitation introuvable");
    if (!inv.allow_gallery) throw new Error("Galerie désactivée");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: insErr } = await supabaseAdmin.from("gallery_uploads").insert({
      invitation_id: inv.id,
      guest_name: data.guest_name ?? null,
      caption: data.caption ?? null,
      image_url: data.image_url,
      approved: false,
    });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });

export const listApprovedGallery = createServerFn({ method: "GET" })
  .inputValidator((d: { token: string }) =>
    z
      .object({
        token: z
          .string()
          .min(8)
          .max(128)
          .regex(/^[a-zA-Z0-9_-]+$/),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { data: inv } = await supabase
      .from("invitations")
      .select("id")
      .or(`token.eq.${data.token},rsvp_token.eq.${data.token}`)
      .maybeSingle();
    if (!inv) return { photos: [] };
    const { data: photos } = await supabase
      .from("gallery_uploads")
      .select("id, guest_name, caption, image_url, created_at")
      .eq("invitation_id", inv.id)
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(120);
    if (!photos) return { photos: [] };
    // Resolve `storage://path` references to signed URLs (24h).
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const resolved = await Promise.all(
      photos.map(async (p) => {
        if (!p.image_url?.startsWith("storage://")) return p;
        const path = p.image_url.replace("storage://", "");
        const { data: signed } = await supabaseAdmin.storage
          .from("gallery")
          .createSignedUrl(path, 86400);
        return { ...p, image_url: signed?.signedUrl ?? p.image_url };
      }),
    );
    return { photos: resolved };
  });

export const moderateGalleryPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; approved: boolean }) =>
    z.object({ id: z.string().uuid(), approved: z.boolean() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("gallery_uploads")
      .update({ approved: data.approved })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
