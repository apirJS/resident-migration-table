ALTER TABLE `resident_table` ADD `is_local_resident` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `resident_migrations_table` DROP COLUMN `original_address`;