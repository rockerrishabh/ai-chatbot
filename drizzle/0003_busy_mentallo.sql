ALTER TABLE "verificationToken" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_token_unique" UNIQUE("token");