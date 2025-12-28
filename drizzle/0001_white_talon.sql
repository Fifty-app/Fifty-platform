CREATE TABLE `demands` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`type` varchar(100) NOT NULL,
	`budget` int NOT NULL,
	`location` varchar(255) NOT NULL,
	`tags` text,
	`status` enum('active','closed') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `demands_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`senderId` int NOT NULL,
	`recipientId` int NOT NULL,
	`subject` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`transactionType` enum('vender','alugar') NOT NULL,
	`propertyType` varchar(100) NOT NULL,
	`value` int NOT NULL,
	`cep` varchar(10),
	`street` varchar(255),
	`number` varchar(20),
	`neighborhood` varchar(100),
	`city` varchar(100),
	`state` varchar(2),
	`rooms` int,
	`parking` int,
	`propertyStatus` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`demandId` int NOT NULL,
	`brokerId` int NOT NULL,
	`productId` int,
	`message` text,
	`status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `proposals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `creci` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `creciType` enum('F','J');--> statement-breakpoint
ALTER TABLE `users` ADD `creciStatus` enum('pending','approved','rejected') DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `accountType` enum('free','premium') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `xp` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `level` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `badges` text;