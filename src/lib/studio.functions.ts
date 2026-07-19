import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

const generateSchema = z.object({
  invitation_id: z.string().uuid(),
  theme: z.string().min(1).max(64),
  couple_names: z.string().min(1).max(200),
  event_date: z.string().min(4),
  venue: z.string().max(300).optional().or(z.literal("")),
  tone: z.enum(["elegant", "romantique", "festif", "minimal"]).default("elegant"),
  language: z.string().max(8).default("fr"),
});

/** Génère les blocs d'invitation via Lovable AI et les enregistre. */
export const generateInvitationContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => generateSchema.parse(i))
  .handler(async ({ data, context }) => {
    const { callLovableAI } = await import("./ai-gateway.server");

    // Verify ownership
    const { data: inv, error: e1 } = await context.supabase
      .from("invitations")
      .select("id, user_id")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (e1) throw new Error(e1.message);
    if (!inv) throw new Error("Invitation introuvable");

    const system =
      "Tu es Eventia Signature, un atelier d'invitations de mariage de luxe. Génère du contenu raffiné, élégant, sans clichés. Retourne uniquement du JSON valide.";
    const prompt = `Génère le contenu d'une invitation de mariage en ${data.language}.

Thème: ${data.theme}
Couple: ${data.couple_names}
Date: ${data.event_date}
Lieu: ${data.venue || "à préciser"}
Ton: ${data.tone}

Retourne un JSON avec exactement ces clés :
{
  "hero_title": "titre court 4-8 mots évoquant l'union",
  "hero_subtitle": "phrase poétique 10-15 mots",
  "welcome_message": "message d'accueil chaleureux 60-90 mots",
  "story": "histoire du couple en 2-3 paragraphes (150-200 mots)",
  "programme": [
    { "time": "14:00", "title": "Cérémonie", "description": "..." },
    { "time": "16:00", "title": "Cocktail", "description": "..." },
    { "time": "19:00", "title": "Dîner", "description": "..." },
    { "time": "22:00", "title": "Soirée dansante", "description": "..." }
  ],
  "dress_code": { "title": "Tenue", "description": "120 mots maximum sur le dress code aligné au thème" },
  "faq": [
    { "q": "Puis-je venir avec un plus-un ?", "a": "..." },
    { "q": "Y a-t-il un parking ?", "a": "..." },
    { "q": "Les enfants sont-ils bienvenus ?", "a": "..." },
    { "q": "Que faire en cas d'imprévu ?", "a": "..." }
  ],
  "gifts": { "title": "Liste de cadeaux", "description": "message élégant sur la liste / cagnotte (80 mots)" },
  "accommodations": [
    { "name": "Nom de l'hôtel/lieu", "area": "Quartier ou distance du lieu", "notes": "2-3 phrases : type d'hébergement, ambiance", "promo_code": "code promo si pertinent, sinon vide", "booking_url": "" }
  ],
  "transport": { "title": "Transport", "description": "100 mots max : comment venir, parking, navettes éventuelles" },
  "thank_you": "message de remerciement post-RSVP (40 mots)"
}

Fournis 2 options dans "accommodations" (styles différents, ex. une adresse de charme et une option pratique).`;

    const raw = await callLovableAI({ system, prompt, json: true });
    let blocks: Record<string, Json>;
    try {
      blocks = JSON.parse(raw);
    } catch {
      // try to recover JSON from possible markdown fences
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Réponse IA invalide");
      blocks = JSON.parse(m[0]);
    }

    const { error: e2 } = await context.supabase
      .from("invitations")
      .update({
        blocks: blocks as never,
        theme: data.theme,
        production_status: "review",
        progress: 60,
      })
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId);
    if (e2) throw new Error(e2.message);
    return { blocks, progress: 60 as const };
  });

const saveBlocksSchema = z.object({
  invitation_id: z.string().uuid(),
  blocks: z.record(z.string(), z.unknown()),
  theme: z.string().max(64).optional(),
  production_status: z.enum(["briefing", "design", "review", "ready", "delivered"]).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  // Splash d'entrée optionnel (phase 3) : vidéo Cloudinary, laisser vide pour ne rien changer.
  intro_video_url: z.string().url().max(500).optional().or(z.literal("")),
});

/** Sauvegarde manuelle des blocs (édition / direction artistique). */
export const saveInvitationBlocks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => saveBlocksSchema.parse(i))
  .handler(async ({ data, context }) => {
    const patch: Record<string, unknown> = { blocks: data.blocks };
    if (data.theme) patch.theme = data.theme;
    if (data.production_status) patch.production_status = data.production_status;
    if (data.progress !== undefined) patch.progress = data.progress;
    if (data.intro_video_url !== undefined) patch.intro_video_url = data.intro_video_url || null;
    const { error } = await context.supabase
      .from("invitations")
      .update(patch as never)
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
