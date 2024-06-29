"use server";

import * as argon2 from "argon2";
import { db } from "@/db";
import { signUpSchema, type SignUpSchema } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import { users } from "@/schemas/dbSchema";

export const signUp = async (values: SignUpSchema) => {
  const parsed = signUpSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = parsed.data;

  const hashedPassword = await argon2.hash(password, {
    hashLength: 32,
  });

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

  return {
    success: "Successfully signed up!",
  };
};
