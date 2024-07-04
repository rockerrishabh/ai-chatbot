"use server";

import { signInSchema, type SignInSchema } from "@/schemas/authSchema";
import { signIn as nextAuthSignIn } from "@/auth";
import { AuthError } from "next-auth";

export const signIn = async (values: SignInSchema) => {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email or password",
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
