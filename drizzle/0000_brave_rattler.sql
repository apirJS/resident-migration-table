CREATE TABLE `resident_migrations_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`resident_id` int NOT NULL,
	`migration_status` varchar(50) NOT NULL,
	`migration_date` timestamp NOT NULL,
	`original_address` varchar(255),
	`new_address` varchar(255),
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resident_migrations_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resident_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nik` varchar(16) NOT NULL,
	`name` varchar(255) NOT NULL,
	`gender` varchar(50) NOT NULL,
	`address` varchar(255) NOT NULL,
	`phone_number` varchar(50) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'Active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resident_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `resident_table_nik_unique` UNIQUE(`nik`)
);
--> statement-breakpoint
CREATE INDEX `resident_id_idx` ON `resident_migrations_table` (`resident_id`);