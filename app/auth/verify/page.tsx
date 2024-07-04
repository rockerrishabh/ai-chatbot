"use client";

import { verify } from "@/actions/verify";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Verify() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
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
    }
  }, [token]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <div>
      {isLoading && (
        <div className="flex space-x-2 h-5 w-5 justify-center items-center bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay:-0.3s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay:-0.15s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      )}
      <FormSuccess message={success} />
      <FormError message={error} />
    </div>
  );
}

export default Verify;
