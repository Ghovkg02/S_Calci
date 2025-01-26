import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userTable = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export const loginFormSchema = createSelectSchema(userTable, {
  id: z.string().optional(),
});

export const signupFormSchema = createInsertSchema(userTable, {
  username: z
    .string()
    .min(6, {
      message: "Username must be at least 6 characters long",
    })
    .max(20, {
      message: "Username must between 6-20 characters",
    }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters long",
  }),
});

export const buildingsTable = sqliteTable("buildings", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  lat: integer("lat").notNull(),
  lon: integer("lon").notNull(),
  occupancy: integer("occupancy").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
  length: integer("length").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
});

export type InsertBuilding = typeof buildingsTable.$inferInsert;
export type SelectBuilding = typeof buildingsTable.$inferSelect;

const longitudeError = {
  message: "-180° to 180°",
};

const latitudeError = {
  message: "-90° to 90°",
};

export const insertBuildingFormSchema = createInsertSchema(buildingsTable, {
  lon: z.coerce.number().min(-180, longitudeError).max(180, longitudeError),
  lat: z.coerce.number().min(-90, latitudeError).max(90, latitudeError),
  occupancy: z.coerce.number(),
  height: z.coerce.number(),
  length: z.coerce.number(),
  width: z.coerce.number(),
  userId: z.number().optional(),
  name: z
    .string()
    .min(3, { message: "6-20 characters" })
    .max(20, { message: "6-20 characters" }),
  type: z.enum(['residential', 'apartment', 'shop', 'office', 'commercial'])
});
