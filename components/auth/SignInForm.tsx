"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type SignInSchema, signInSchema } from "@/schemas/authSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { signIn } from "@/actions/sign-in";
import FormError from "./FormError";
import { useSearchParams } from "next/navigation";

function SignInForm() {
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "You Signed Up with different Provider"
      : "";

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInSchema) {
    startTransition(() => {
      signIn(values).then((data) => {
        setError(data?.error);
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
        <FormError message={error || urlError} />

        <Button
          disabled={isPending}
          className="w-full bg-indigo-500/90 text-white hover:bg-indigo-500"
          type="submit">
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
      <p className="text-center mt-4 mb-2">Or Sign In with</p>
    </Form>
  );
}

export default SignInForm;
