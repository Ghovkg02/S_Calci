"use server";

import {
  deleteBuildingById,
  getAllBuildings,
  getBuildingsByUserId,
  insertBuilding,
} from "@/db/queries";
import { InsertBuilding } from "@/db/schema";
import { getUser } from "@/lib/lucia";
import { revalidatePath } from "next/cache";

export async function createBuilding(values: InsertBuilding) {
  const building = await insertBuilding(values);
  revalidatePath("/home");
  return building;
}

export async function getCurrentUser() {
  return await getUser();
}

export async function findAllBuildings() {
  return await getAllBuildings();
}

export async function findAllBuildingsByUser(id: number) {
  return await getBuildingsByUserId(id);
}

export async function deleteBuilding(id: number) {
  const building = await deleteBuildingById(id);
  revalidatePath("/home");
  return building;
}
