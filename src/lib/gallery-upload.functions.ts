import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Génère une URL signée d'upload direct vers le bucket privé `gallery`.
 * Pas d'auth requise (les invités sont anonymes), mais le chemin est forcé sous `public-uploads/`.
 */
export const createGalleryUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; ext: string }) =>
    z
      .object({
        token: z
          .string()
          .min(8)
          .max(128)
          .regex(/^[a-zA-Z0-9_-]+$/),
        ext: z.string().regex(/^(jpg|jpeg|png|webp|heic)$/i),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv, error } = await supabaseAdmin
      .from("invitations")
      .select("id, allow_gallery")
      .or(`token.eq.${data.token},rsvp_token.eq.${data.token}`)
      .maybeSingle();
    if (error || !inv) throw new Error("Invitation introuvable");
    if (!inv.allow_gallery) throw new Error("Galerie désactivée");
    const filename = `public-uploads/${inv.id}/${crypto.randomUUID()}.${data.ext.toLowerCase()}`;
    const { data: signed, error: sErr } = await supabaseAdmin.storage
      .from("gallery")
      .createSignedUploadUrl(filename);
    if (sErr || !signed) throw new Error(sErr?.message ?? "Upload URL error");
    return { path: filename, token: signed.token, url: signed.signedUrl };
  });

/** Convertit le chemin storage en URL signée (24 h) pour lecture par l'utilisateur. */
export const getGallerySignedUrl = createServerFn({ method: "POST" })
  .inputValidator((d: { path: string }) => z.object({ path: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("gallery")
      .createSignedUrl(data.path, 86400);
    if (error || !signed) throw new Error(error?.message ?? "Signed URL error");
    return { url: signed.signedUrl };
  });
