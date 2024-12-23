import { residentMigrationsTable, residentsTable } from '@/db/schema';

export type Resident = typeof residentsTable.$inferInsert;
export type ResidentMigration = typeof residentMigrationsTable.$inferInsert;
