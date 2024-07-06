"use server";

import { signInSchema, type SignInSchema } from "@/schemas/authSchema";
import { signIn as nextAuthSignIn } from "@/auth";
import { AuthError } from "next-auth";
import { eq } from "drizzle-orm";
import { users } from "@/schemas/dbSchema";
import { db } from "@/db";
import { generateVerificationToken } from "@/utils/generateVerificationToken";
import bcryptjs from "bcryptjs";

export const signIn = async (values: SignInSchema) => {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email or password!",
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

  if (!existingUser.password) {
    return { error: "You used a different provider to Sign Up!." };
  }

  const comparePassword = await bcryptjs.compare(
    parsed.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    return {
      error: "Invalid Password!",
    };
  }

  if (!existingUser?.emailVerified) {
    const res = await generateVerificationToken(
      existingUser?.name,
      existingUser?.email
    );

    if (!res?.messageId) {
      return {
        error: "Error while sending Verification Mail!",
      };
    }

    return {
      success:
        "Successfully sent Verification Mail! Please verify your account before signing in.",
    };
  }

  try {
    await nextAuthSignIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials!",
          };
        default:
          return {
            error: "Invalid Credentials!",
          };
      }
    }
    throw error;
  }
};
