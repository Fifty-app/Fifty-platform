ALTER TABLE `users` ADD `subscriptionPlan` enum('pf_free','pf_premium','pj_test','pj_premium') DEFAULT 'pf_free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionBillingCycle` enum('monthly','quarterly') DEFAULT 'monthly';--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionExpiresAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `pjTestAccessExpiresAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `maxProducts` int DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `maxDemands` int DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `maxProposals` int DEFAULT 6 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `additionalTeamUsers` int DEFAULT 0 NOT NULL;