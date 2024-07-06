CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"id" text NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "passwordResetToken_id_token_pk" PRIMARY KEY("id","token"),
	CONSTRAINT "passwordResetToken_token_unique" UNIQUE("token")
);
