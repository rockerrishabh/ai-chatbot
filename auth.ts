import NextAuth, { AuthError, type DefaultSession } from "next-auth";
import { eq } from "drizzle-orm";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import "next-auth/jwt";
import { db } from "./db";
import { users } from "./schemas/dbSchema";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(users.id, user.id!));
    },
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, user.email!),
      });

      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
