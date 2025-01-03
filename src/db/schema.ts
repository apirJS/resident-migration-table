
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const residentsTable = mysqlTable('resident_table', {
  id: serial().primaryKey(),
  nik: varchar({ length: 16 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  gender: varchar({ length: 50, enum: ['Male', 'Female'] }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  original_address: varchar({ length: 255 }),
  phone_number: varchar({ length: 50 }).notNull(),
  is_local_resident: boolean().notNull().default(true),
  status: varchar({ length: 50, enum: ['Active', 'Migrated'] })
    .notNull()
    .default('Active'),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const residentMigrationsTable = mysqlTable(
  'resident_migrations_table',
  {
    id: serial().primaryKey(),
    resident_id: int().notNull(),
    migration_status: varchar({ length: 50, enum: ['Out', 'In'] }).notNull(),
    migration_date: timestamp().notNull(),
    new_address: varchar({ length: 255 }),
    description: text(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => {
    return {
      residentIdIdx: index('resident_id_idx').on(table.resident_id),
    };
  }
);

export const residentsRelation = relations(residentsTable, ({ many }) => ({
  migrations: many(residentMigrationsTable),
}));

export const residentMigrationsRelation = relations(
  residentMigrationsTable,
  ({ one }) => ({
    resident: one(residentsTable, {
      fields: [residentMigrationsTable.resident_id],
      references: [residentsTable.id],
    }),
  })
);

export const residentTableKeys = [
  'id',
  'nik',
  'nama',
  'jenis_kelamin',
  'alamat',
  'alamat_asal',
  'nomor_telepon',
  'penduduk_lokal',
  'status',
  'dibuat_pada',
];

export const residentMigrationTableKeys = [
  'id',
  'id_penduduk',
  'status_migrasi',
  'tanggal_migrasi',
  'alamat_baru',
  'deskripsi',
  'dibuat_pada',
];