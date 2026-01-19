ALTER TABLE `demands` ADD `productId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `demands` ADD `demandType` enum('buy','sell','rent','lease') NOT NULL;--> statement-breakpoint
ALTER TABLE `demands` ADD `highlight` varchar(255);