import Link from "next/link";
import ThemeMenu from "./ThemeMenu";
import { playpen } from "@/utils/fonts";
import NavLink from "./NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import Sidebar from "./Sidebar";

async function Header() {
  const session = await auth();
  return (
    <header className="border-b border-1">
      <div className="flex items-center justify-between px-5 py-2 md:px-10 md:py-3">
        <h1
          className={`text-2xl font-extrabold hover:scale-105 ${playpen.className}`}>
          <Link href={"/"}>
            AI <span className="text-red-500/90">ChatBot</span>
          </Link>
        </h1>
        <nav className="flex items-center space-x-8">
          <ul className="hidden md:flex items-center space-x-4">
            <NavLink className="hover:text-indigo-500/90" href="/">
              Chat
            </NavLink>
            <NavLink className="hover:text-indigo-500/90" href="/about-us">
              About Us
            </NavLink>
            <NavLink className="hover:text-indigo-500/90" href="/contact-us">
              Contact Us
            </NavLink>
          </ul>
          <div className="flex items-center space-x-6">
            <section className="flex px-5 items-center space-x-4">
              <ThemeMenu />
              {!session && (
                <Link
                  className="hidden md:flex hover:text-indigo-500/90"
                  href={"/auth/sign-in"}>
                  Sign In
                </Link>
              )}
              <Link
                className="hidden md:flex hover:text-indigo-500/90 py-2 px-4 rounded-md border hover:border-indigo-500/90"
                href={session ? "/dashboard" : "/auth/sign-up"}>
                {session ? "Dashboard" : "Sign Up"}
              </Link>

              {session && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus-visible:outline-none">
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user.name!}
                        width={40}
                        height={40}
                      />
                      <AvatarFallback>
                        {session.user?.name?.split(" ")[0][0]}{" "}
                        {session.user?.name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <form
                        action={async () => {
                          "use server";
                          await signOut({
                            redirectTo: "/",
                          });
                        }}>
                        <button type="submit">Sign Out</button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Sidebar session={session} />
            </section>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
