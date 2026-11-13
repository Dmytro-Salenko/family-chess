CREATE TABLE `families` (
	`id` text PRIMARY KEY NOT NULL,
	`dad` text NOT NULL,
	`son` text,
	`invite` text NOT NULL,
	`dad_seen` integer DEFAULT 0 NOT NULL,
	`son_seen` integer DEFAULT 0 NOT NULL,
	`active_game` text,
	`created` integer NOT NULL
);
