"use server"

import { eq } from 'drizzle-orm';
import db from './db';
import { residentsTable, residentMigrationsTable } from './schema';
import { generateRandomDate, generateRandomNumbers, generateRandomString } from '../lib';

type Resident = typeof residentsTable.$inferInsert;
type ResidentMigration = typeof residentMigrationsTable.$inferInsert;


export async function seed() {
  const startTime = Date.now();
  console.log('Seeding database...');

  const residents = await db.transaction(async (trx) => {
    const data: number[] = [];
    for (let i = 0; i < 5000; i++) {
      const resident: Resident = {
        nik: generateRandomNumbers(16),
        name: generateRandomString(20),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        address: generateRandomString(30),
        phone_number: generateRandomNumbers(20),
        status: Math.random() > 0.5 ? 'Active' : 'Migrated',
        created_at: generateRandomDate(),
        is_local_resident: Math.random() > 0.5,
      };

      if (!resident.is_local_resident) {
        resident.original_address = generateRandomString(30);
      } else {
        resident.original_address = resident.address;
      }

      resident.updated_at = resident.created_at;

      const [result] = await trx
        .insert(residentsTable)
        .values(resident)
        .$returningId();

      data.push(result.id!);
    }

    return data;
  });

  console.log(
    'Seeding residents completed in',
    Date.now() - startTime,
    'ms',
    `(${residents.length} rows)`
  );

  const migrationsOut = await db.transaction(async (trx) => {
    const data: number[] = [];

    const activeResidents = await trx
      .select()
      .from(residentsTable)
      .where(eq(residentsTable.status, 'Active'));

    for (let i = 0; i < 500; i++) {
      const resident = activeResidents[i];
      if (!resident) break;

      const migration: ResidentMigration = {
        resident_id: resident.id!,
        migration_status: 'Out',
        migration_date: generateRandomDate(),
        new_address: generateRandomString(30),
        description: generateRandomString(50),
        created_at: generateRandomDate(),
      };

      const [result] = await trx
        .insert(residentMigrationsTable)
        .values(migration)
        .$returningId();

      await trx
        .update(residentsTable)
        .set({ status: 'Migrated' })
        .where(eq(residentsTable.id, resident.id!));

      data.push(result.id!);
    }

    return data;
  });

  console.log(
    'Seeding migrations (Out) completed in',
    Date.now() - startTime,
    'ms',
    `(${migrationsOut.length} rows)`
  );

  const migrationsIn = await db.transaction(async (trx) => {
    const data: number[] = [];

    const outsiderResidents = await trx
      .select()
      .from(residentsTable)
      .where(eq(residentsTable.is_local_resident, false));

    for (let i = 0; i < 500; i++) {
      const resident = outsiderResidents[i];
      if (!resident) break;

      const migration: ResidentMigration = {
        resident_id: resident.id!,
        migration_status: 'In',
        migration_date: generateRandomDate(),
        new_address: generateRandomString(30),
        description: generateRandomString(50),
        created_at: generateRandomDate(),
      };

      const [result] = await trx
        .insert(residentMigrationsTable)
        .values(migration)
        .$returningId();

      await trx
        .update(residentsTable)
        .set({ status: 'Active' })
        .where(eq(residentsTable.id, resident.id!));

      data.push(result.id!);
    }
    return data;
  });

  console.log(
    'Seeding migrations (In) completed in',
    Date.now() - startTime,
    'ms',
    `(${migrationsIn.length} rows)`
  );

  console.log('Seeding completed in', Date.now() - startTime, 'ms');
}

seed().catch(console.error);