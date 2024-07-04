"use server";

import { signInSchema, type SignInSchema } from "@/schemas/authSchema";
import { signIn as nextAuthSignIn } from "@/auth";
import { AuthError } from "next-auth";
import { eq } from "drizzle-orm";
import { users } from "@/schemas/dbSchema";
import { db } from "@/db";
import { sendMail } from "@/lib/mailer";
import { verificationTemplate } from "@/mail/verificationTemplate";

export const signIn = async (values: SignInSchema) => {
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, parsed.data.email),
  });

  if (!existingUser?.emailVerified) {
    const verificationToken = crypto.randomUUID();

    const { html, subject, email } = verificationTemplate({
      name: existingUser?.name!,
      email: existingUser?.email!,
      verificationToken,
    });

    const res = await sendMail({ html, subject, to: email });

    if (!res?.messageId) {
      return {
        error: "Error while sending Verification Mail!",
      };
    }

    return {
      success: "Successfully sent Verification Mail!",
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
