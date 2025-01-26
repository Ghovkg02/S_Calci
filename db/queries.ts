import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  buildingsTable,
  InsertBuilding,
  InsertUser,
  userTable,
} from "./schema";

export async function getUserByUsername(username: string) {
  const user = await db
    .selectDistinct()
    .from(userTable)
    .where(eq(userTable.username, username));
  if (!user) return null;
  return user[0];
}

export async function insertUser(values: InsertUser) {
  return db.insert(userTable).values(values).returning();
}

export async function getUserById(id: number) {
  const user = await db
    .selectDistinct()
    .from(userTable)
    .where(eq(userTable.id, id));
  return user[0];
}

export async function getBuildingById(id: number) {
  const existingBuilding = await db
    .selectDistinct()
    .from(buildingsTable)
    .where(eq(buildingsTable.id, id));
  return existingBuilding[0];
}

export async function insertBuilding(values: InsertBuilding) {
  const building = await db.insert(buildingsTable).values(values).returning();
  return building[0];
}

export async function getAllBuildings() {
  return await db
    .select({
      lat: buildingsTable.lat,
      lon: buildingsTable.lon,
      type: buildingsTable.type,
      id: buildingsTable.id,
    })
    .from(buildingsTable);
}

export async function getBuildingsByUserId(id: number) {
  return await db
    .selectDistinct()
    .from(buildingsTable)
    .where(eq(buildingsTable.userId, id));
}

export async function deleteBuildingById(id: number) {
  return await db.delete(buildingsTable).where(eq(buildingsTable.id, id));
}
