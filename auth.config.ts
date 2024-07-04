import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "./schemas/authSchema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users } from "./schemas/dbSchema";

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Invalid Fields!.");
        }

        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, parsed.data.email),
        });

        if (!existingUser) {
          throw new Error("No User found!.");
        }

        if (!existingUser.password) {
          throw new Error("You used a different provider to Sign Up!.");
        }

        const comparePassword = await bcryptjs.compare(
          parsed.data.password,
          existingUser.password
        );

        if (!comparePassword) {
          throw new Error("Invalid Password!");
        }

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
