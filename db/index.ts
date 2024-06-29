import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dbSchema from "@/schemas/dbSchema";

const connectionString =
  "postgresql://ai-chatbot_owner:dKpThP6UG0Hv@ep-wispy-firefly-a1279od3.ap-southeast-1.aws.neon.tech/ai-chatbot?sslmode=require";
const pool = neon(connectionString);

export const db = drizzle(pool, {
  schema: {
    ...dbSchema,
  },
});
