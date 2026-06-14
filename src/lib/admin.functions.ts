import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}

/** Vérifie si l'utilisateur connecté est admin. */
export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: !!data };
  });

/** Le premier utilisateur authentifié peut se déclarer admin (one-shot). */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_first_admin");
    if (error) throw new Error(error.message);
    return { claimed: !!data };
  });

/** Dashboard : compteurs globaux. */
export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [orders, ateliers, invitations, rsvps] = await Promise.all([
      supabaseAdmin.from("orders").select("status,total_eur", { count: "exact" }),
      supabaseAdmin.from("atelier_requests").select("status", { count: "exact" }),
      supabaseAdmin.from("invitations").select("id", { count: "exact" }),
      supabaseAdmin.from("rsvps").select("id", { count: "exact" }),
    ]);
    const totalRevenue = (orders.data ?? [])
      .filter((o: any) => o.status === "paid")
      .reduce((s: number, o: any) => s + (o.total_eur || 0), 0);
    return {
      ordersCount: orders.count ?? 0,
      ateliersCount: ateliers.count ?? 0,
      invitationsCount: invitations.count ?? 0,
      rsvpsCount: rsvps.count ?? 0,
      pendingAteliers: (ateliers.data ?? []).filter((a: any) => a.status === "new").length,
      pendingOrders: (orders.data ?? []).filter((o: any) => o.status === "pending").length,
      totalRevenue,
    };
  });

/** Liste toutes les commandes (admin). */
export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, ref, email, formula, experience_slug, total_eur, status, gumroad_url, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

/** Met à jour le statut d'une commande. */
export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["draft", "pending", "paid", "cancelled", "delivered"]),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Liste toutes les demandes atelier (admin). */
export const adminListAteliers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("atelier_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { ateliers: data ?? [] };
  });

/** Met à jour le statut d'une demande atelier. */
export const adminUpdateAtelierStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "scheduled", "won", "lost"]),
      })
      .parse(i),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("atelier_requests")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Liste toutes les invitations (admin). */
export const adminListInvitations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("invitations")
      .select("id, token, couple_names, event_date, venue, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { invitations: data ?? [] };
  });
