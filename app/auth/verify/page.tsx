"use client";

import { verify } from "@/actions/verify";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Verify() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const navigate = useRouter();

  const token = params.get("token");

  const verifyUser = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);

    try {
      const data = await verify(token);
      setError(data?.error);
      setSuccess(data?.success);
    } catch (error) {
      console.error("Error verifying user:", error);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
      const timer = setTimeout(() => {
        navigate.push("/dashboard");
      }, 5000);
      const interval = setInterval(() => {
        setRedirectCountdown((prevCount) =>
          prevCount > 0 ? prevCount - 1 : 0
        );
      }, 1000);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [token, navigate]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <section className="flex flex-col gap-5 justify-center items-center mt-20">
      {isLoading && (
        <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay:-0.3s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay:-0.15s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      )}
      <FormSuccess message={success} />
      <FormError message={error} />
      {success && (
        <p>
          You will be redirected to the dashboard in {redirectCountdown}{" "}
          seconds. You can also{" "}
          <Link
            className="text-indigo-400 hover:text-indigo-500"
            href="/auth/sign-in"
            onClick={(e) => e.preventDefault()}>
            click here
          </Link>{" "}
          to redirect immediately.
        </p>
      )}
    </section>
  );
}

export default Verify;
