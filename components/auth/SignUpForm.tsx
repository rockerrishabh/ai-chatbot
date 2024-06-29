"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpSchema } from "@/schemas/authSchema";

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
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useTransition } from "react";
import { signUp } from "@/actions/sign-up";
import Image from "next/image";
import Link from "next/link";

function SignUpForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpSchema) {
    setError("");
    setSuccess("");
    startTransition(() => {
      signUp(values).then((data) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          Sign Up
        </Button>
      </form>
      <p className="text-center mt-4 mb-2">Or Sign Up with</p>
      <section className="flex justify-center mb-2">
        <Button type="button" variant="ghost" size="icon">
          <Image src="/google.svg" alt="Google" height={20} width={20} />
        </Button>
      </section>
      <Link
        className="text-center block hover:text-indigo-500"
        href={"/sign-in"}>
        Already have an Account?
      </Link>
    </Form>
  );
}

export default SignUpForm;
