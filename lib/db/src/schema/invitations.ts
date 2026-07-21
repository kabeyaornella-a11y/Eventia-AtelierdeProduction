import { pgTable, serial, text, jsonb, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const invitationsTable = pgTable("invitations", {
  id: serial("id").primaryKey(),
  coupleName1: text("couple_name_1").notNull(),
  coupleName2: text("couple_name_2").notNull(),
  collection: text("collection").notNull().default("voiles"),
  formula: text("formula").notNull().default("signature"),
  blocks: jsonb("blocks").notNull().default([]),
  status: text("status").notNull().default("draft"),
  slug: text("slug").unique(),
  eventDate: date("event_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertInvitationSchema = createInsertSchema(invitationsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertInvitation = z.infer<typeof insertInvitationSchema>;
export type Invitation = typeof invitationsTable.$inferSelect;
