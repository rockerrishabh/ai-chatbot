import SignInForm from "@/components/auth/SignInForm";

function SignIn() {
  return (
    <div className="w-96 mx-auto">
      <h1 className="mt-10 mb-4 text-xl font-semibold text-center">Sign In</h1>
      <SignInForm />
    </div>
  );
}

export default SignIn;
