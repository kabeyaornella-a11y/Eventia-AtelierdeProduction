import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactRequestsTable = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  // Infos couple
  name1: text("name1").notNull(),
  name2: text("name2").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  // Projet
  eventDate: text("event_date"),          // string libre (ex: "15 juin 2026")
  guestCount: text("guest_count"),        // ex: "80-120 invités"
  collection: text("collection"),         // voiles / seuils / écrins / union
  formula: text("formula"),              // essentielle / signature / exception
  message: text("message"),              // message libre du formulaire vitrine
  // Statut Studio
  status: text("status").notNull().default("pending"),  // pending | accepted | refused | converted
  invitationId: text("invitation_id"),    // lié à une invitation une fois convertie
  // Source
  source: text("source").notNull().default("vitrine"), // vitrine | manual
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertContactRequestSchema = createInsertSchema(contactRequestsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  invitationId: true,
});

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequestsTable.$inferSelect;
