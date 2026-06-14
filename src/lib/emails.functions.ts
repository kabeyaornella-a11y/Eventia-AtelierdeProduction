import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const EMAIL_TEMPLATES = [
  "order_confirmation",
  "payment_received",
  "validation",
  "delivery",
  "activation",
  "follow_up",
  "reminder",
  "thank_you",
  "souvenirs",
] as const;

const queueSchema = z.object({
  template: z.enum(EMAIL_TEMPLATES),
  recipient: z.string().email().max(200),
  subject: z.string().max(200).optional(),
  invitation_id: z.string().uuid().optional(),
  order_id: z.string().uuid().optional(),
  payload: z.record(z.string(), z.unknown()).default({}),
});

/** Enregistre un email à envoyer (statut "queued"). Le worker d'envoi sera branché plus tard. */
export const queueEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => queueSchema.parse(i))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("email_logs").insert({
      user_id: context.userId,
      template: data.template,
      recipient: data.recipient,
      subject: data.subject ?? null,
      invitation_id: data.invitation_id ?? null,
      order_id: data.order_id ?? null,
      payload: data.payload as never,
      status: "queued",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Liste les emails envoyés / en file pour l'utilisateur connecté. */
export const listMyEmails = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("email_logs")
      .select(
        "id, template, recipient, subject, status, sent_at, created_at, invitation_id, order_id",
      )
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return { emails: data ?? [] };
  });
