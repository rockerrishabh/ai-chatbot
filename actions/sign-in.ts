"use server";

import { signInSchema, type SignInSchema } from "@/schemas/authSchema";

export const signIn = async (values: SignInSchema) => {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email or password",
    };
  }

  return {
    success: "Successfully signed in",
  };
};
