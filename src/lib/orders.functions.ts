import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const createOrderSchema = z.object({
  ref: z.string().min(6).max(32),
  email: z.string().email().max(255),
  formula: z.string().min(1).max(64),
  experience_slug: z.string().max(64).optional().nullable(),
  total_eur: z.number().int().min(0).max(100000),
  config: z.record(z.string(), z.unknown()),
  gumroad_url: z.string().url().max(500).optional().nullable(),
});

/** Sauvegarde la commande pour l'utilisateur connecté. */
export const createMyOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => createOrderSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("orders")
      .insert({
        ref: data.ref,
        user_id: userId,
        email: data.email,
        formula: data.formula,
        experience_slug: data.experience_slug ?? null,
        total_eur: data.total_eur,
        config: data.config as never,
        gumroad_url: data.gumroad_url ?? null,
        status: "pending",
      })
      .select("ref")
      .single();
    if (error) throw new Error(error.message);
    return { ref: row.ref };
  });

/** Liste des commandes de l'utilisateur connecté. */
export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data, error } = await supabase
      .from("orders")
      .select("id, ref, formula, experience_slug, total_eur, status, gumroad_url, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

/** Récupère une commande publique par référence (champs limités, lecture seule). */
export const getOrderByRef = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ ref: z.string().min(6).max(32) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select("ref, formula, experience_slug, total_eur, status, config, gumroad_url, created_at")
      .eq("ref", data.ref)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { order: row };
  });
