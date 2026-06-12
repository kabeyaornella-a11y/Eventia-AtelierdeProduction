import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  company: z.string().min(1).max(150),
  contact_name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  event_type: z.string().max(80).optional(),
  guests_count: z.number().int().min(1).max(100000).optional(),
  budget: z.string().max(80).optional(),
  message: z.string().max(2000).optional(),
});

export const submitB2BLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => LeadSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("b2b_leads").insert({
      company: data.company,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone ?? null,
      event_type: data.event_type ?? null,
      guests_count: data.guests_count ?? null,
      budget: data.budget ?? null,
      message: data.message ?? null,
    });
    if (error) throw new Error(error.message);
    // Queue ack email
    await supabaseAdmin.from("email_logs").insert({
      recipient: data.email,
      template: "b2b_ack",
      payload: { company: data.company, contact_name: data.contact_name },
      status: "queued",
    });
    return { ok: true };
  });
