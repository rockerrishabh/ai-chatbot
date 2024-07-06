"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/authSchema";
import { forgotPassword } from "@/actions/forgot-password";

function ForgotPasswordForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordSchema) {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-indigo-500"
                  type="email"
                  placeholder="Enter your email"
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
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
