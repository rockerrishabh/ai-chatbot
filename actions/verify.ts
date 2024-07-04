"use server";

import { db } from "@/db";
import { users, verificationTokens } from "@/schemas/dbSchema";
import { eq } from "drizzle-orm";

export const verify = async (token: string) => {
  if (!token) {
    return { error: "Invalid Token!" };
  }

  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!existingToken) {
    return { error: "Token not found!" };
  }

  if (existingToken.expires < new Date()) {
    return { error: "Token expired!" };
  }

  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, existingToken.email));

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.email, existingToken.email));

  return { success: "Successfully Verified!" };
};
