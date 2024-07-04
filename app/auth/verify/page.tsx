"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

function Verify() {
  const params = useSearchParams();
  const token = params.get("token");
  const verifyUser = useCallback(() => {
    if (!token) return;
    console.log(token);
  }, [token]);
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
  return <div>Verify</div>;
}

export default Verify;
