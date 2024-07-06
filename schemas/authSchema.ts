import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Please enter a Email Address",
      required_error: "Please enter a Email Address",
    })
    .email("Please enter a valid Email Address")
    .min(8, { message: "Email must be at least 8 characters." })
    .max(50, { message: "Email must be less than 50 characters." }),
  password: z
    .string({
      invalid_type_error: "Please enter a Password",
      required_error: "Please enter a Password",
    })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password must be less than 50 characters." }),
});

export const signUpSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Please enter a Name",
      required_error: "Please enter a Name",
    })
    .min(8, { message: "Name must be at least 8 characters." })
    .max(50, { message: "Name must be less than 50 characters." }),
  email: z
    .string({
      invalid_type_error: "Please enter a Email Address",
      required_error: "Please enter a Email Address",
    })
    .email("Please enter a valid Email Address")
    .min(2, { message: "Email must be at least 2 characters." })
    .max(50),
  password: z
    .string({
      invalid_type_error: "Please enter a Password",
      required_error: "Please enter a Password",
    })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password must be less than 50 characters." }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Please enter a Email Address",
      required_error: "Please enter a Email Address",
    })
    .email("Please enter a valid Email Address")
    .min(8, { message: "Email must be at least 8 characters." })
    .max(50, { message: "Email must be less than 50 characters." }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Please enter a Password",
      required_error: "Please enter a Password",
    })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password must be less than 50 characters." }),

  confirmPassword: z
    .string({
      invalid_type_error: "Please enter a Password",
      required_error: "Please enter a Password",
    })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password must be less than 50 characters." }),
});

export const verifyResetPasswordSchema = z.object({
  token: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type VerifyResetPasswordSchema = z.infer<
  typeof verifyResetPasswordSchema
>;
