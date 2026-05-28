import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),

  companyName: text("company_name").notNull(),
  role: text("role").notNull(),
  desc: text("desc").notNull(),
  workingDate: text("working_date").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});