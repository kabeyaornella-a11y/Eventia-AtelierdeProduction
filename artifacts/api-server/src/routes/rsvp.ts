import { Router } from "express";
import { db, rsvpTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// POST /rsvp — convive soumet sa réponse
router.post("/rsvp", async (req, res) => {
  const { invitationId, guestName, attendance, guestCount, dietary, message, email, phone } = req.body ?? {};
  if (!invitationId || !guestName || !attendance) {
    return void res.status(400).json({ error: "invitationId, guestName, attendance requis" });
  }
  if (!["yes", "no", "maybe"].includes(attendance)) {
    return void res.status(400).json({ error: "attendance doit être yes | no | maybe" });
  }
  try {
    const [row] = await db.insert(rsvpTable).values({
      invitationId: String(invitationId),
      guestName: String(guestName),
      attendance: String(attendance),
      guestCount: guestCount ? String(guestCount) : null,
      dietary: dietary ? String(dietary) : null,
      message: message ? String(message) : null,
      email: email ? String(email) : null,
      phone: phone ? String(phone) : null,
    }).returning();
    res.status(201).json({ success: true, id: row.id });
  } catch (e) {
    res.status(500).json({ error: "Échec de l'enregistrement RSVP" });
  }
});

// GET /rsvp/:invitationId — Ornelle consulte les réponses (Studio)
router.get("/rsvp/:invitationId", async (req, res) => {
  try {
    const rows = await db.select().from(rsvpTable)
      .where(eq(rsvpTable.invitationId, req.params.invitationId))
      .orderBy(rsvpTable.createdAt);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Échec de la récupération des RSVP" });
  }
});

export default router;
