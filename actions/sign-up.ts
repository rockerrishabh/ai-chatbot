"use server";

import bcryptjs from "bcryptjs";
import { db } from "@/db";
import { signUpSchema, type SignUpSchema } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import { users } from "@/schemas/dbSchema";
import { generateVerificationToken } from "@/utils/generateVerificationToken";

export const signUp = async (values: SignUpSchema) => {
  const parsed = signUpSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = parsed.data;

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  const newUser = await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning();

  if (!newUser[0]) {
    return {
      error: "Failed to sign up!",
    };
  }

  const res = await generateVerificationToken(name, email);

  if (!res?.messageId) {
    return {
      error: "Error while sending Verification Mail!",
    };
  }

  return {
    success: "Successfully sent Verification Mail! Please check your email!",
  };
};
