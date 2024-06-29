import { auth, signIn } from "@/auth";
import SignUpForm from "@/components/auth/SignUpForm";

async function SignUp() {
  const session = await auth();

  return (
    <div className="w-96 mx-auto">
      <h1 className="mt-10 mb-4 text-xl font-semibold text-center">Sign Up</h1>
      <SignUpForm />
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}></form>
    </div>
  );
}

export default SignUp;
