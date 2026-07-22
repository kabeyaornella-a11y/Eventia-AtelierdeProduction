import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const rsvpTable = pgTable("rsvp_responses", {
  id: serial("id").primaryKey(),
  invitationId: text("invitation_id").notNull(),
  guestName: text("guest_name").notNull(),
  attendance: text("attendance").notNull(),   // "yes" | "no" | "maybe"
  guestCount: text("guest_count"),
  dietary: text("dietary"),
  message: text("message"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
