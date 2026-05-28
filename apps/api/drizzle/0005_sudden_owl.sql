CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"role" text NOT NULL,
	"desc" text NOT NULL,
	"working_date" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
