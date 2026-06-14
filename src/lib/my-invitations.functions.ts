import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function generateToken(len = 16) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

/** Liste les invitations de l'utilisateur connecté. */
export const listMyInvitations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("invitations")
      .select(
        "id, token, couple_names, event_date, venue, hero_url, message, allow_playlist, allow_gallery, order_id, created_at",
      )
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { invitations: data ?? [] };
  });

/** Lecture d'une invitation par id (owner only). */
export const getMyInvitation = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const { data: inv, error } = await context.supabase
      .from("invitations")
      .select("*")
      .eq("id", data.id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!inv) throw new Error("Invitation introuvable");
    return { invitation: inv };
  });

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  order_id: z.string().uuid().optional().nullable(),
  couple_names: z.string().trim().min(1).max(200),
  event_date: z.string().min(4),
  venue: z.string().trim().max(300).optional().or(z.literal("")),
  hero_url: z.string().url().max(800).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  allow_playlist: z.boolean().default(true),
  allow_gallery: z.boolean().default(true),
});

/** Crée ou met à jour une invitation pour l'utilisateur connecté. */
export const upsertMyInvitation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => upsertSchema.parse(i))
  .handler(async ({ data, context }) => {
    const payload = {
      user_id: context.userId,
      order_id: data.order_id || null,
      couple_names: data.couple_names,
      event_date: new Date(data.event_date).toISOString(),
      venue: data.venue || null,
      hero_url: data.hero_url || null,
      message: data.message || null,
      allow_playlist: data.allow_playlist,
      allow_gallery: data.allow_gallery,
    };

    if (data.id) {
      const { data: row, error } = await context.supabase
        .from("invitations")
        .update(payload)
        .eq("id", data.id)
        .eq("user_id", context.userId)
        .select("id, token")
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!row) throw new Error("Invitation introuvable");
      return { id: row.id, token: row.token };
    }

    // Generate unique token (retry on collision)
    for (let i = 0; i < 5; i++) {
      const token = generateToken(16);
      const { data: row, error } = await context.supabase
        .from("invitations")
        .insert({ ...payload, token })
        .select("id, token")
        .single();
      if (!error && row) return { id: row.id, token: row.token };
      if (error && !error.message.includes("invitations_token")) {
        throw new Error(error.message);
      }
    }
    throw new Error("Impossible de générer un token unique");
  });

/** Supprime une invitation (owner only). */
export const deleteMyInvitation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("invitations")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
