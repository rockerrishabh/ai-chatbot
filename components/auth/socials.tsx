import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "@/auth";

function Socials() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          redirectTo: "/dashboard",
        });
      }}
      className="w-full">
      <Button
        className="w-full bg-indigo-300 hover:bg-indigo-500"
        type="submit"
        variant="default"
        size="icon">
        <Image src="/google.svg" alt="Google" height={20} width={20} />
      </Button>
    </form>
  );
}

export default Socials;
