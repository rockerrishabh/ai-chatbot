"use client";

import { verify } from "@/actions/verify";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Verify() {
  const params = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const token = params.get("token");
  const verifyUser = useCallback(() => {
    if (!token) return;
    verify(token).then((data) => {
      setError(data?.error);
      setSuccess(data?.success);
    });
  }, [token]);
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
  return (
    <div>
      <FormSuccess message={success} />
      <FormError message={error} />
    </div>
  );
}

export default Verify;
