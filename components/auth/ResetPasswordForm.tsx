"use client";

import { resetPassword } from "@/actions/reset-password";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchema } from "@/schemas/authSchema";

function ResetPasswordForm() {
  const params = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const token = params.get("token");
  const navigate = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const countdown = () => {
    const timer = setTimeout(() => {
      navigate.push("/auth/sign-in");
    }, 5000);
    const interval = setInterval(() => {
      setRedirectCountdown((prevCount) => Math.max(0, prevCount - 1));
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  };

  const onSubmit = (values: ResetPasswordSchema) => {
    setError("");
    setSuccess("");
    if (!token) {
      setError("No token received!");
      countdown();
      return;
    }
    startTransition(() => {
      resetPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        countdown();
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-indigo-500"
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-indigo-500"
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          className="w-full bg-indigo-500/90 text-white hover:bg-indigo-500"
          type="submit">
          {isPending ? "Loading..." : "Reset Password"}
        </Button>
      </form>
      {error ||
        (success && (
          <p>
            You will be redirected to the sign in {redirectCountdown} seconds.
            You can also{" "}
            <Link
              className="text-indigo-400 hover:text-indigo-500"
              href="/auth/sign-in">
              click here
            </Link>{" "}
            to redirect immediately.
          </p>
        ))}
    </Form>
  );
}

export default ResetPasswordForm;
