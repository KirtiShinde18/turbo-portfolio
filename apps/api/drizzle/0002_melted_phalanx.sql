CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"desc" text NOT NULL,
	"category" text NOT NULL,
	"hero" text NOT NULL,
	"tech" text NOT NULL,
	"live_url" text NOT NULL,
	"github_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "githubURL" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "linkedin" text NOT NULL;