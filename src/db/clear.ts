"use server"

import db from "./db";
import { residentsTable, residentMigrationsTable } from "./schema";

export async function clear() {
  const startTime = Date.now();
  console.log('Clearing database...');

  await db.delete(residentMigrationsTable)
  console.log('Cleared resident migrations table');

  await db.delete(residentsTable)
  console.log('Cleared residents table');

  console.log('Database cleared in', Date.now() - startTime, 'ms');
}

clear().catch(console.error);