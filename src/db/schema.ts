import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  role: varchar({ length: 25 }).notNull(),
});

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHashed: varchar({ length: 255 }).notNull(),
  active: boolean().notNull(),
  idRol: integer()
    .references(() => roles.id)
    .notNull(),
});
