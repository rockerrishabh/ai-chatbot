import { auth } from "@/auth";
import SignUpForm from "@/components/auth/SignUpForm";
import Socials from "@/components/auth/socials";
import Link from "next/link";

async function SignUp() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mt-10 mb-4 text-xl font-semibold text-center">Sign Up</h1>
      <SignUpForm />
      <section className="flex justify-center mb-2">
        <Socials />
      </section>
      <Link
        className="text-center block hover:text-indigo-500"
        href={"/auth/sign-in"}>
        Already have an Account?
      </Link>
    </div>
  );
}

export default SignUp;
