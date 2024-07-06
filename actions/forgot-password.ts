"use server";

import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import { users } from "@/schemas/dbSchema";
import { db } from "@/db";
import { generatePasswordResetToken } from "@/utils/generatePasswordResetToken";

export const forgotPassword = async (values: ForgotPasswordSchema) => {
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email!",
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, parsed.data.email),
  });

  if (!existingUser) {
    return {
      error: "User does not exists!",
    };
  }

  const res = await generatePasswordResetToken(
    existingUser.name,
    existingUser.email
  );

  if (!res?.messageId) {
    return {
      error: "Error while sending Password Reset Mail!",
    };
  }

  return {
    success: "Successfully sent Password Reset Mail! Please check your email!",
  };
};
