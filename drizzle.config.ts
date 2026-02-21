import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./app/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    // For local development
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/00000000-0000-0000-0000-000000000000.sqlite",
  },
});
