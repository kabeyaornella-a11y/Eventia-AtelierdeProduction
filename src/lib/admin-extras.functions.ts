import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ListSchema = z.object({ status: z.enum(["new", "contacted", "won", "lost"]).optional() });

export const listB2BLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ListSchema.parse(d ?? {}))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId, _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin.from("b2b_leads").select("*").order("created_at", { ascending: false }).limit(200);
    if (data.status) q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return { leads: rows ?? [] };
  });

export const updateB2BLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: string }) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["new", "contacted", "won", "lost"]),
    }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId, _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("b2b_leads").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listPendingGalleryForOwner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { invitation_id: string }) =>
    z.object({ invitation_id: z.string().uuid() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations").select("id, user_id").eq("id", data.invitation_id).maybeSingle();
    if (!inv) throw new Error("Introuvable");
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId, _role: "admin",
    });
    if (inv.user_id !== context.userId && !isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("gallery_uploads")
      .select("id, guest_name, caption, image_url, approved, created_at")
      .eq("invitation_id", data.invitation_id)
      .order("created_at", { ascending: false })
      .limit(200);
    return { photos: rows ?? [] };
  });
