CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
