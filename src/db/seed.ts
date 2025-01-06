'use server';
import { fakerID_ID as faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';
import db from './db';
import { residentsTable, residentMigrationsTable } from './schema';
import {
  generateRandomDate,
  generateRandomNumbers,
} from '../lib';

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
        name: faker.person.fullName(),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        address: faker.location.streetAddress({ useFullAddress: true }),
        phone_number: faker.phone.number(),
        status: Math.random() > 0.5 ? 'Active' : 'Migrated',
        created_at: generateRandomDate(),
        is_local_resident: Math.random() > 0.5,
        original_address: '',
        updated_at: new Date(),
      };

      if (!resident.is_local_resident) {
        resident.original_address = faker.location.streetAddress({ useFullAddress: true });
      } else {
        resident.original_address = resident.address;
      }

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
        new_address: faker.location.streetAddress({ useFullAddress: true }),
        description: faker.lorem.sentence(),
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
        new_address: faker.location.streetAddress({ useFullAddress: true }),
        description: faker.lorem.sentence(),
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


