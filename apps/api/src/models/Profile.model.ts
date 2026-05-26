import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core"

export const profile = pgTable("profile", {
  id: serial().primaryKey(),

  name: text().notNull(),
  title: text().notNull(),
  bio: text().notNull(),
  journey: text().notNull(),
  work: text().notNull(),
  dob: text().notNull(),

  location: text().notNull(),
  email: text().notNull(),
  mobile: text().notNull(),
  language: text().notNull(),
  
  profileImage: text().notNull(),
  cv: text().notNull(),
  
  // 🔥 numbers should be integer
  yearExp: integer().notNull(),
  projectsCompleted: integer().notNull(),
  technologies: integer().notNull(),
  happyClients: integer().notNull(),
  
  // 🔥 timestamps (important for production)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  
  // link 
  githubURL: text("github_url").notNull(),
  linkedin: text("linkedin").notNull(),
  
})