import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const tokenSchema = z.string().min(6).max(64).regex(/^[a-zA-Z0-9_-]+$/);
const uuid = z.string().uuid();

async function resolveInvitationByToken(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: inv } = await supabaseAdmin
    .from("invitations")
    .select("id, couple_names, event_date, venue")
    .eq("token", token)
    .maybeSingle();
  return inv;
}

async function assertOwnership(userId: string, invitationId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("invitations")
    .select("id")
    .eq("id", invitationId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) throw new Error("Accès refusé");
}

/** Lecture publique des données Live par token (côté invité). */
export const getLiveData = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ token: tokenSchema }).parse(input))
  .handler(async ({ data }) => {
    const inv = await resolveInvitationByToken(data.token);
    if (!inv) return { invitation: null, accommodations: [], transports: [], timeCapsule: [] };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: accs }, { data: trs }, { data: tc }] = await Promise.all([
      supabaseAdmin.from("accommodations").select("*").eq("invitation_id", inv.id).order("created_at"),
      supabaseAdmin.from("transports").select("*").eq("invitation_id", inv.id).order("scheduled_at", { nullsFirst: false }),
      supabaseAdmin
        .from("time_capsule_messages")
        .select("id, author_name, message, unlock_at, media_url, created_at")
        .eq("invitation_id", inv.id)
        .order("created_at", { ascending: false }),
    ]);
    const now = Date.now();
    const timeCapsule = (tc ?? []).map((m) => ({
      ...m,
      locked: m.unlock_at ? new Date(m.unlock_at).getTime() > now : false,
    }));
    return { invitation: inv, accommodations: accs ?? [], transports: trs ?? [], timeCapsule };
  });

/** Dépôt public d'un message Time Capsule par un invité. */
export const postTimeCapsule = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        token: tokenSchema,
        author_name: z.string().trim().min(1).max(120),
        message: z.string().trim().min(1).max(2000),
        unlock_at: z.string().datetime().optional().or(z.literal("")),
        media_url: z.string().url().max(1000).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const inv = await resolveInvitationByToken(data.token);
    if (!inv) throw new Error("Invitation introuvable");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("time_capsule_messages").insert({
      invitation_id: inv.id,
      author_name: data.author_name,
      message: data.message,
      unlock_at: data.unlock_at || null,
      media_url: data.media_url || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Check-in public d'un invité (scan QR depuis le back-office mariés). */
export const recordCheckin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ invitation_id: uuid, guest_name: z.string().trim().min(1).max(120) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertOwnership(context.userId, data.invitation_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("checkins").insert({
      invitation_id: data.invitation_id,
      guest_name: data.guest_name,
      checked_in_by: context.userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Lecture des données Live côté mariés (back-office). */
export const getOwnerLiveData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ invitation_id: uuid }).parse(input))
  .handler(async ({ data, context }) => {
    await assertOwnership(context.userId, data.invitation_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [accs, trs, ch, tc] = await Promise.all([
      supabaseAdmin.from("accommodations").select("*").eq("invitation_id", data.invitation_id).order("created_at"),
      supabaseAdmin.from("transports").select("*").eq("invitation_id", data.invitation_id).order("scheduled_at"),
      supabaseAdmin.from("checkins").select("*").eq("invitation_id", data.invitation_id).order("checked_in_at", { ascending: false }),
      supabaseAdmin.from("time_capsule_messages").select("*").eq("invitation_id", data.invitation_id).order("created_at", { ascending: false }),
    ]);
    return {
      accommodations: accs.data ?? [],
      transports: trs.data ?? [],
      checkins: ch.data ?? [],
      timeCapsule: tc.data ?? [],
    };
  });

export const upsertAccommodation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: uuid.optional(),
        invitation_id: uuid,
        name: z.string().trim().min(1).max(200),
        address: z.string().trim().max(400).optional().or(z.literal("")),
        type: z.string().trim().max(60).optional().or(z.literal("")),
        price_per_night: z.number().min(0).max(100000).optional().nullable(),
        booking_url: z.string().url().max(1000).optional().or(z.literal("")),
        notes: z.string().trim().max(1000).optional().or(z.literal("")),
        contact_phone: z.string().trim().max(40).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertOwnership(context.userId, data.invitation_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      invitation_id: data.invitation_id,
      name: data.name,
      address: data.address || null,
      type: data.type || null,
      price_per_night: data.price_per_night ?? null,
      booking_url: data.booking_url || null,
      notes: data.notes || null,
      contact_phone: data.contact_phone || null,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("accommodations").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("accommodations").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteAccommodation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: uuid, invitation_id: uuid }).parse(input))
  .handler(async ({ data, context }) => {
    await assertOwnership(context.userId, data.invitation_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("accommodations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const upsertTransport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: uuid.optional(),
        invitation_id: uuid,
        type: z.string().trim().min(1).max(60),
        departure: z.string().trim().max(200).optional().or(z.literal("")),
        arrival: z.string().trim().max(200).optional().or(z.literal("")),
        scheduled_at: z.string().datetime().optional().or(z.literal("")),
        info: z.string().trim().max(800).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertOwnership(context.userId, data.invitation_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      invitation_id: data.invitation_id,
      type: data.type,
      departure: data.departure || null,
      arrival: data.arrival || null,
      scheduled_at: data.scheduled_at || null,
      info: data.info || null,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("transports").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("transports").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteTransport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: uuid, invitation_id: uuid }).parse(input))
  .handler(async ({ data, context }) => {
    await assertOwnership(context.userId, data.invitation_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("transports").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
