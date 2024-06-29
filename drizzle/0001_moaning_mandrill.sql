DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('Admin', 'User');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'User' NOT NULL;