CREATE TABLE `booth_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`path` text,
	`current_view` text DEFAULT 'home' NOT NULL,
	`answers_json` text DEFAULT '[]' NOT NULL,
	`summary_json` text,
	`payload_json` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
