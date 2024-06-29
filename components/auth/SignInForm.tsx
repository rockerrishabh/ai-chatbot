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
import FormSuccess from "./FormSuccess";
import Image from "next/image";
import Link from "next/link";

function SignInForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

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
        setError(data.error);
        setSuccess(data.success);
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
                <Input type="email" placeholder="Enter your email" {...field} />
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
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button
          className="w-full bg-indigo-500/90 text-white hover:bg-indigo-500"
          type="submit">
          Sign In
        </Button>
      </form>
      <p className="text-center mt-4 mb-2">Or Sign In with</p>
      <section className="flex justify-center mb-2">
        <Button type="button" variant="ghost" size="icon">
          <Image src="/google.svg" alt="Google" height={20} width={20} />
        </Button>
      </section>
      <Link
        className="text-center block hover:text-indigo-500"
        href={"/sign-up"}>
        Don&apos;t have an Account?
      </Link>
    </Form>
  );
}

export default SignInForm;
