import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

function Forgot() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mt-10 mb-4 text-xl font-semibold text-center">
        Forgot Password
      </h1>
      <ForgotPasswordForm />
      <Link
        className="text-center mt-4 block hover:text-indigo-500"
        href={"/auth/sign-in"}>
        Back to Login?
      </Link>
    </div>
  );
}

export default Forgot;
