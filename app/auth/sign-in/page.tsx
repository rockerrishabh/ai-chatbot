import SignInForm from "@/components/auth/SignInForm";
import Socials from "@/components/auth/socials";
import Link from "next/link";

function SignIn() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mt-10 mb-4 text-xl font-semibold text-center">Sign In</h1>
      <SignInForm />
      <section className="flex justify-center mb-2">
        <Socials />
      </section>
      <Link
        className="text-center block hover:text-indigo-500"
        href={"/auth/sign-up"}>
        Don&apos;t have an Account?
      </Link>
    </div>
  );
}

export default SignIn;
