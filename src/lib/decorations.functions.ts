import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Liste publique du catalogue de décorations. */
export const listDecorations = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("decorations")
    .select("id, name, category, themes, description, image_url, price_eur, supplier, supplier_url")
    .order("category", { ascending: true });
  if (error) throw new Error(error.message);
  return { decorations: data ?? [] };
});

/** Recommande des décorations compatibles avec un thème. */
export const recommendDecorations = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ theme: z.string().min(1).max(64) }).parse(i))
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabase
      .from("decorations")
      .select(
        "id, name, category, themes, description, image_url, price_eur, supplier, supplier_url",
      )
      .contains("themes", [data.theme]);
    if (error) throw new Error(error.message);
    return { decorations: rows ?? [] };
  });

const decorationSchema = z.object({
  name: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(64),
  themes: z.array(z.string().trim().min(1).max(64)).max(20).default([]),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  image_url: z.string().url().max(500).optional().or(z.literal("")),
  price_eur: z.number().nonnegative().max(100000).optional(),
  supplier: z.string().trim().max(120).optional().or(z.literal("")),
  supplier_url: z.string().url().max(500).optional().or(z.literal("")),
});

async function assertAdmin(context: { supabase: SupabaseClient; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Réservé aux administrateurs");
}

/** Crée une décoration (illustration, cadre, voilage...) — admin uniquement. */
export const createDecoration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => decorationSchema.parse(i))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("decorations").insert({
      name: data.name,
      category: data.category,
      themes: data.themes,
      description: data.description || null,
      image_url: data.image_url || null,
      price_eur: data.price_eur ?? null,
      supplier: data.supplier || null,
      supplier_url: data.supplier_url || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Met à jour une décoration existante — admin uniquement. */
export const updateDecoration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => decorationSchema.extend({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...patch } = data;
    const { error } = await context.supabase
      .from("decorations")
      .update({
        name: patch.name,
        category: patch.category,
        themes: patch.themes,
        description: patch.description || null,
        image_url: patch.image_url || null,
        price_eur: patch.price_eur ?? null,
        supplier: patch.supplier || null,
        supplier_url: patch.supplier_url || null,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Supprime une décoration — admin uniquement. */
export const deleteDecoration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("decorations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
