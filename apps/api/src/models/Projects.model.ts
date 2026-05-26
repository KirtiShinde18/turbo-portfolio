import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),
  desc: text("desc").notNull(),
  category: text("category").notNull(),

  hero: text("hero").notNull(), // Cloudinary image URL

  tech: text("tech").notNull(), // store comma-separated OR JSON later

  liveURL: text("live_url").notNull(),
  githubURL: text("github_url").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});