import { Router } from "express";
import { db, contactRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const VALID_STATUSES = ["pending", "accepted", "refused", "converted"] as const;

function validateCreate(body: any): { ok: true; data: any } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  if (!body.name1 || typeof body.name1 !== "string") return { ok: false, error: "name1 is required" };
  if (!body.name2 || typeof body.name2 !== "string") return { ok: false, error: "name2 is required" };
  if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) return { ok: false, error: "valid email is required" };
  return {
    ok: true,
    data: {
      name1: body.name1,
      name2: body.name2,
      email: body.email,
      phone: typeof body.phone === "string" ? body.phone : undefined,
      eventDate: typeof body.eventDate === "string" ? body.eventDate : undefined,
      guestCount: typeof body.guestCount === "string" ? body.guestCount : undefined,
      collection: typeof body.collection === "string" ? body.collection : undefined,
      formula: typeof body.formula === "string" ? body.formula : undefined,
      message: typeof body.message === "string" ? body.message : undefined,
      source: typeof body.source === "string" ? body.source : "vitrine",
    },
  };
}

function validateUpdate(body: any): { ok: true; data: any } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const data: any = {};
  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) return { ok: false, error: "Invalid status" };
    data.status = body.status;
  }
  if (typeof body.invitationId === "string") data.invitationId = body.invitationId;
  if (typeof body.collection === "string") data.collection = body.collection;
  if (typeof body.formula === "string") data.formula = body.formula;
  return { ok: true, data };
}

// ─── Routes ────────────────────────────────────────────────────────────────

// GET /contact-requests  — toutes les demandes (usage Studio uniquement)
router.get("/contact-requests", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(contactRequestsTable)
      .orderBy(contactRequestsTable.createdAt);
    res.json(rows.map(serialize));
  } catch {
    res.status(500).json({ error: "Failed to list contact requests" });
  }
});

// GET /contact-requests/pending — raccourci pour le dashboard
router.get("/contact-requests/pending", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(contactRequestsTable)
      .where(eq(contactRequestsTable.status, "pending"))
      .orderBy(contactRequestsTable.createdAt);
    res.json(rows.map(serialize));
  } catch {
    res.status(500).json({ error: "Failed to list pending requests" });
  }
});

// POST /contact-requests — reçoit une demande depuis le site vitrine ou Studio
router.post("/contact-requests", async (req, res) => {
  const parsed = validateCreate(req.body);
  if (!parsed.ok) return void res.status(400).json({ error: parsed.error });

  try {
    const [row] = await db
      .insert(contactRequestsTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(serialize(row));
  } catch {
    res.status(500).json({ error: "Failed to create contact request" });
  }
});

// PATCH /contact-requests/:id — Studio met à jour le statut
router.patch("/contact-requests/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return void res.status(400).json({ error: "Invalid id" });

  const parsed = validateUpdate(req.body);
  if (!parsed.ok) return void res.status(400).json({ error: parsed.error });

  try {
    const [row] = await db
      .update(contactRequestsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(contactRequestsTable.id, id))
      .returning();
    if (!row) return void res.status(404).json({ error: "Not found" });
    res.json(serialize(row));
  } catch {
    res.status(500).json({ error: "Failed to update contact request" });
  }
});

// DELETE /contact-requests/:id
router.delete("/contact-requests/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return void res.status(400).json({ error: "Invalid id" });

  try {
    await db.delete(contactRequestsTable).where(eq(contactRequestsTable.id, id));
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete contact request" });
  }
});

// ─── Helpers ───────────────────────────────────────────────────────────────
function serialize(r: typeof contactRequestsTable.$inferSelect) {
  return {
    id: r.id,
    name1: r.name1,
    name2: r.name2,
    email: r.email,
    phone: r.phone ?? null,
    eventDate: r.eventDate ?? null,
    guestCount: r.guestCount ?? null,
    collection: r.collection ?? null,
    formula: r.formula ?? null,
    message: r.message ?? null,
    status: r.status,
    invitationId: r.invitationId ?? null,
    source: r.source,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export default router;
