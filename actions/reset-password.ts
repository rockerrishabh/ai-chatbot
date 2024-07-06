"use server";

import { resetPasswordSchema, ResetPasswordSchema } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import { passwordResetTokens, users } from "@/schemas/dbSchema";
import { db } from "@/db";
import bcryptjs from "bcryptjs";

export const resetPassword = async (
  values: ResetPasswordSchema,
  token: string
) => {
  const parsed = resetPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { password, confirmPassword } = parsed.data;

  const existingToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });

  if (!existingToken) {
    return {
      error: "Token does not exists!",
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });

  if (!existingUser) {
    return {
      error: "User does not exists!",
    };
  }

  if (existingToken.expires < new Date()) {
    return {
      error: "Token expired!",
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.token, token));

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  const updatePassword = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, existingUser.id))
    .returning();

  if (!updatePassword[0]) {
    return {
      error: "Error while updating Password!",
    };
  }

  return {
    success: "Successfully Reset Password! Please login again!",
  };
};
