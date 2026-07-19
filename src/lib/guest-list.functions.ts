import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const tokenSchema = z
  .string()
  .min(6)
  .max(64)
  .regex(/^[a-zA-Z0-9_-]+$/);

/** Liste des invités pré-chargés d'une invitation (propriétaire uniquement). */
export const listGuests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ invitation_id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { data: guests, error } = await context.supabase
      .from("invitation_guests")
      .select(
        "id, name, email, phone, group_label, expected_adults, expected_children, guest_token, opened_at, table_number, rsvp_id, created_at",
      )
      .eq("invitation_id", data.invitation_id)
      .order("group_label", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);

    const { data: rsvps } = await context.supabase
      .from("rsvps")
      .select("id, status, guests_count, companions, allergies, needs_transport")
      .eq("invitation_id", data.invitation_id);
    const rsvpById = new Map((rsvps ?? []).map((r) => [r.id, r]));

    return {
      guests: (guests ?? []).map((g) => ({
        ...g,
        rsvp: g.rsvp_id ? (rsvpById.get(g.rsvp_id) ?? null) : null,
      })),
    };
  });

const guestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  group_label: z.string().trim().max(120).optional().or(z.literal("")),
  expected_adults: z.number().int().min(0).max(20).default(1),
  expected_children: z.number().int().min(0).max(20).default(0),
  table_number: z.string().trim().max(40).optional().or(z.literal("")),
});

/** Ajoute un invité à la liste — propriétaire uniquement. */
export const addGuest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ invitation_id: z.string().uuid() }).and(guestSchema).parse(i))
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { error } = await context.supabase.from("invitation_guests").insert({
      invitation_id: data.invitation_id,
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      group_label: data.group_label || null,
      expected_adults: data.expected_adults,
      expected_children: data.expected_children,
      table_number: data.table_number || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Ajoute plusieurs invités d'un coup (import en masse) — propriétaire uniquement. */
export const bulkAddGuests = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({ invitation_id: z.string().uuid(), guests: z.array(guestSchema).min(1).max(500) })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { error } = await context.supabase.from("invitation_guests").insert(
      data.guests.map((g) => ({
        invitation_id: data.invitation_id,
        name: g.name,
        email: g.email || null,
        phone: g.phone || null,
        group_label: g.group_label || null,
        expected_adults: g.expected_adults,
        expected_children: g.expected_children,
        table_number: g.table_number || null,
      })),
    );
    if (error) throw new Error(error.message);
    return { ok: true, count: data.guests.length };
  });

/** Met à jour un invité (table, groupe, coordonnées...) — propriétaire uniquement. */
export const updateGuest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z.object({ id: z.string().uuid(), invitation_id: z.string().uuid() }).and(guestSchema).parse(i),
  )
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { error } = await context.supabase
      .from("invitation_guests")
      .update({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        group_label: data.group_label || null,
        expected_adults: data.expected_adults,
        expected_children: data.expected_children,
        table_number: data.table_number || null,
      })
      .eq("id", data.id)
      .eq("invitation_id", data.invitation_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Met à jour uniquement le numéro de table d'un invité — propriétaire uniquement.
 * Séparé de updateGuest (qui remplace tous les champs) pour que la vue "Plan
 * de table" ne risque jamais d'écraser email/téléphone/nombre d'accompagnants
 * avec des valeurs par défaut faute de les avoir sous la main. */
export const updateGuestTable = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        id: z.string().uuid(),
        invitation_id: z.string().uuid(),
        table_number: z.string().trim().max(40).optional().or(z.literal("")),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { error } = await context.supabase
      .from("invitation_guests")
      .update({ table_number: data.table_number || null })
      .eq("id", data.id)
      .eq("invitation_id", data.invitation_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Retire un invité de la liste — propriétaire uniquement. */
export const deleteGuest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z.object({ id: z.string().uuid(), invitation_id: z.string().uuid() }).parse(i),
  )
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const { error } = await context.supabase
      .from("invitation_guests")
      .delete()
      .eq("id", data.id)
      .eq("invitation_id", data.invitation_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Marque un invité comme ayant ouvert son lien personnalisé (?g=guest_token).
 * Public, mais passe par supabaseAdmin : jamais de policy RLS publique sur
 * invitation_guests (coordonnées des invités). Idempotent — n'écrase pas un
 * opened_at déjà posé. Retourne le prénom pour pré-remplir le RSVP.
 */
export const markGuestOpened = createServerFn({ method: "POST" })
  .inputValidator((i) =>
    z.object({ token: tokenSchema, guest_token: z.string().min(4).max(64) }).parse(i),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inv } = await supabaseAdmin
      .from("invitations")
      .select("id")
      .eq("token", data.token)
      .maybeSingle();
    if (!inv) return { guest: null };

    const { data: guest } = await supabaseAdmin
      .from("invitation_guests")
      .select("id, name, opened_at")
      .eq("invitation_id", inv.id)
      .eq("guest_token", data.guest_token)
      .maybeSingle();
    if (!guest) return { guest: null };

    if (!guest.opened_at) {
      await supabaseAdmin
        .from("invitation_guests")
        .update({ opened_at: new Date().toISOString() })
        .eq("id", guest.id);
    }
    return { guest: { id: guest.id, name: guest.name } };
  });
