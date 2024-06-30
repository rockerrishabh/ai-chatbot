import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { signInSchema } from "./schemas/authSchema";
import { users } from "./schemas/dbSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
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
  session: {
    strategy: "database",
  },
});
