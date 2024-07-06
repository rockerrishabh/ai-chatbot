import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

function ResetPassword() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mt-10 mb-4 text-xl font-semibold text-center">
        Reset Password
      </h1>
      <ResetPasswordForm />
      <Link
        className="text-center block mt-4 hover:text-indigo-500"
        href={"/auth/sign-in"}>
        Back to Login?
      </Link>
    </div>
  );
}

export default ResetPassword;
