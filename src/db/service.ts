'use server';

import { eq } from 'drizzle-orm';
import db from './db';
import { residentMigrationsTable, residentsTable } from './schema';

export async function getResidents(limit: number = 1000) {
  try {
    return await db.select().from(residentsTable).limit(limit);
  } catch (error) {
    return new Error(
      `Failed to get residents: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

type Resident = typeof residentsTable.$inferInsert;
export async function createResident(data: Resident) {
  try {
    const [result] = await db
      .insert(residentsTable)
      .values(data)
      .$returningId();
    return result.id;
  } catch (error) {
    return new Error(
      `Failed to create resident: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

export async function updateResident(id: number, data: Partial<Resident>) {
  try {
    await db.update(residentsTable).set(data).where(eq(residentsTable.id, id));
    return true;
  } catch (error) {
    return new Error(
      `Failed to update resident: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

export async function deleteResident(id: number) {
  try {
    await db.delete(residentsTable).where(eq(residentsTable.id, id));
    return true;
  } catch (error) {
    return new Error(
      `Failed to delete resident: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

type ResidentMigration = typeof residentMigrationsTable.$inferInsert;
export async function createResidentMigration(data: ResidentMigration) {
  try {
    return await db.insert(residentMigrationsTable).values(data).$returningId();
  } catch (error) {
    return new Error(
      `Failed to create resident migration: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
