import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  skill: text("skill").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});