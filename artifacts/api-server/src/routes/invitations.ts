import { Router } from "express";
import { db, invitationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreateInvitationBody,
  UpdateInvitationBody,
  GetInvitationParams,
  UpdateInvitationParams,
  DeleteInvitationParams,
} from "@workspace/api-zod";

const router = Router();

// GET /invitations
router.get("/invitations", async (_req, res) => {
  try {
    const rows = await db.select().from(invitationsTable).orderBy(invitationsTable.createdAt);
    const mapped = rows.map(r => ({
      id: r.id,
      coupleName1: r.coupleName1,
      coupleName2: r.coupleName2,
      collection: r.collection,
      formula: r.formula,
      blocks: r.blocks,
      status: r.status,
      slug: r.slug ?? null,
      eventDate: r.eventDate ?? null,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
    res.json(mapped);
  } catch (e) {
    res.status(500).json({ error: "Failed to list invitations" });
  }
});

// POST /invitations
router.post("/invitations", async (req, res) => {
  const parsed = CreateInvitationBody.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: parsed.error.message });

  const { coupleName1, coupleName2, collection, formula, eventDate } = parsed.data;

  // Set default blocks based on formula
  const formulaBlocks: Record<string, string[]> = {
    essentielle: ["video_intro","title_names","date_venue","countdown","rsvp","map_access","share_link"],
    signature: ["video_intro","title_names","date_venue","countdown","rsvp","map_access","share_link","dress_code","our_story","gallery","empreintes"],
    exception: ["video_intro","title_names","date_venue","countdown","rsvp","map_access","share_link","dress_code","our_story","gallery","empreintes","transport","menu","program","wishlist","live_album","playlist","faq","audio_book","thanks"],
  };

  const enabledTypes = formulaBlocks[formula] ?? formulaBlocks["signature"];
  const blocks = enabledTypes.map((type, i) => ({
    id: `${type}_${Date.now()}_${i}`,
    type,
    enabled: true,
    content: {},
    typography: {
      combo: "maison_classique",
      title: { family: "Cormorant Garamond", size: 48, color: "#F9F6F1", bold: false, italic: false, underline: false, strikethrough: false, highlight: "", letterSpacing: 0, lineHeight: 1.1, align: "center" },
      subtitle: { family: "Cormorant Garamond", size: 24, color: "#C9A96E", bold: false, italic: true, underline: false, strikethrough: false, highlight: "", letterSpacing: 2, lineHeight: 1.4, align: "center" },
      body: { family: "Jost", size: 14, color: "rgba(249,246,241,0.7)", bold: false, italic: false, underline: false, strikethrough: false, highlight: "", letterSpacing: 1.5, lineHeight: 1.7, align: "center" },
      other: { family: "Great Vibes", size: 36, color: "#C9A96E", bold: false, italic: false, underline: false, strikethrough: false, highlight: "", letterSpacing: 0, lineHeight: 1.2, align: "center" },
    },
    animation: { trigger: "scroll", entrance: "fadeIn", photoEffect: "none", textEffect: "none" },
    media: { images: [], icons: [] },
  }));

  try {
    const [row] = await db.insert(invitationsTable).values({
      coupleName1,
      coupleName2,
      collection,
      formula,
      blocks: blocks as any,
      eventDate: eventDate ?? null,
    }).returning();

    res.status(201).json({
      id: row.id,
      coupleName1: row.coupleName1,
      coupleName2: row.coupleName2,
      collection: row.collection,
      formula: row.formula,
      blocks: row.blocks,
      status: row.status,
      slug: row.slug ?? null,
      eventDate: row.eventDate ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to create invitation" });
  }
});

// GET /invitations/slug/:slug  — accès public par slug (viewer)
router.get("/invitations/slug/:slug", async (req, res) => {
  const slug = req.params.slug;
  if (!slug) return void res.status(400).json({ error: "slug required" });
  try {
    const { sql } = await import("drizzle-orm");
    const [row] = await db.select().from(invitationsTable).where(sql`${invitationsTable.slug} = ${slug}`);
    if (!row) return void res.status(404).json({ error: "Not found" });
    res.json({
      id: row.id, coupleName1: row.coupleName1, coupleName2: row.coupleName2,
      collection: row.collection, formula: row.formula, blocks: row.blocks,
      status: row.status, slug: row.slug ?? null,
      eventDate: row.eventDate ?? null,
      createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString(),
    });
  } catch (e) { res.status(500).json({ error: "Failed to get invitation" }); }
});

// GET /invitations/:id
router.get("/invitations/:id", async (req, res) => {
  const parsed = GetInvitationParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) return void res.status(400).json({ error: "Invalid id" });

  try {
    const [row] = await db.select().from(invitationsTable).where(eq(invitationsTable.id, parsed.data.id));
    if (!row) return void res.status(404).json({ error: "Not found" });

    res.json({
      id: row.id,
      coupleName1: row.coupleName1,
      coupleName2: row.coupleName2,
      collection: row.collection,
      formula: row.formula,
      blocks: row.blocks,
      status: row.status,
      slug: row.slug ?? null,
      eventDate: row.eventDate ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to get invitation" });
  }
});

// PATCH /invitations/:id
router.patch("/invitations/:id", async (req, res) => {
  const paramsParsed = UpdateInvitationParams.safeParse({ id: Number(req.params.id) });
  if (!paramsParsed.success) return void res.status(400).json({ error: "Invalid id" });

  const bodyParsed = UpdateInvitationBody.safeParse(req.body);
  if (!bodyParsed.success) return void res.status(400).json({ error: bodyParsed.error.message });

  try {
    const [row] = await db.update(invitationsTable)
      .set({ ...bodyParsed.data as any, updatedAt: new Date() })
      .where(eq(invitationsTable.id, paramsParsed.data.id))
      .returning();

    if (!row) return void res.status(404).json({ error: "Not found" });

    res.json({
      id: row.id,
      coupleName1: row.coupleName1,
      coupleName2: row.coupleName2,
      collection: row.collection,
      formula: row.formula,
      blocks: row.blocks,
      status: row.status,
      slug: row.slug ?? null,
      eventDate: row.eventDate ?? null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to update invitation" });
  }
});

// DELETE /invitations/:id
router.delete("/invitations/:id", async (req, res) => {
  const parsed = DeleteInvitationParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) return void res.status(400).json({ error: "Invalid id" });

  try {
    await db.delete(invitationsTable).where(eq(invitationsTable.id, parsed.data.id));
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: "Failed to delete invitation" });
  }
});

export default router;
