import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dbSchema from "@/schemas/dbSchema";

const connectionString = process.env.AUTH_DRIZZLE_URL || "";
const pool = neon(connectionString);

export const db = drizzle(pool, {
  schema: {
    ...dbSchema,
  },
});
