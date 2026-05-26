import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user =  pgTable("users", {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    mobile: text().notNull().unique(),

    password: text().notNull(),
    role: text().notNull().default("queen"),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),

})