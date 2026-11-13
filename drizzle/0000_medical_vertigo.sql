CREATE TABLE `games` (
	`id` text PRIMARY KEY NOT NULL,
	`white` text NOT NULL,
	`black` text,
	`invite` text NOT NULL,
	`moves` text DEFAULT '[]' NOT NULL,
	`result` text,
	`version` integer DEFAULT 0 NOT NULL,
	`created` integer NOT NULL
);
