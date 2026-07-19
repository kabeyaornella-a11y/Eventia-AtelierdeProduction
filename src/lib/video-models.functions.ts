import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { allModels, type CloudinaryModel } from "@/lib/cloudinary-models";

const collectionSchema = z.enum(["ecrins", "union", "voiles", "seuils", "save-the-date"]);

export type VideoModelRow = CloudinaryModel & {
  id: string;
  collection: string;
  poster_url: string | null;
};

/** Catalogue complet (statique + ajouté depuis l'admin), lecture publique. */
export const listVideoModels = createServerFn({ method: "GET" }).handler(async () => {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase
    .from("video_models")
    .select("id, collection, slug, name, video_url, poster_url, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const custom: VideoModelRow[] = (data ?? []).map((r) => ({
    id: r.id,
    collection: r.collection,
    slug: r.slug,
    name: r.name,
    video: r.video_url,
    poster_url: r.poster_url,
  }));
  return { static: allModels, custom };
});

const createSchema = z.object({
  collection: collectionSchema,
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "slug: minuscules, chiffres et tirets uniquement"),
  name: z.string().trim().min(1).max(120),
  video_url: z.string().url().max(500),
  poster_url: z.string().url().max(500).optional().or(z.literal("")),
});

/** Ajoute un modèle vidéo au catalogue (admin uniquement, RLS + vérif explicite). */
export const createVideoModel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => createSchema.parse(i))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Réservé aux administrateurs");

    const { error } = await context.supabase.from("video_models").insert({
      collection: data.collection,
      slug: data.slug,
      name: data.name,
      video_url: data.video_url,
      poster_url: data.poster_url || null,
      created_by: context.userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Retire un modèle vidéo ajouté depuis l'admin (le catalogue statique n'est jamais affecté). */
export const deleteVideoModel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Réservé aux administrateurs");

    const { error } = await context.supabase.from("video_models").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
