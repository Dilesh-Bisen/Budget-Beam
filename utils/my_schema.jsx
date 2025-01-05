import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: integer().primaryKey(),
  budget_name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  email: varchar({ length: 255 }).notNull(),
  created_at: timestamp().default("now()"), 
});

export const Expenses = pgTable("expenses", {
  id: integer().primaryKey(),
  budget_name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  budget_ID: integer().references(() => Budgets.id),
  email: varchar({ length: 255 }).notNull(),
  tags: varchar({ length: 255 }).default(""),
  notes: text().default(""),
  created_at: timestamp().default("now()"), 
});
