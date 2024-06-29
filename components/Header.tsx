import Link from "next/link";
import ThemeMenu from "./ThemeMenu";
import { playpen } from "@/utils/fonts";
import NavLink from "./NavLink";

function Header() {
  return (
    <header className="border-b border-1">
      <div className="flex items-center justify-between px-5 py-2 md:px-10 md:py-3">
        <h1
          className={`text-2xl font-extrabold hover:scale-105 ${playpen.className}`}>
          <Link href={"/"}>
            AI <span className="text-red-500/90">ChatBot</span>
          </Link>
        </h1>
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-4">
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
            <ThemeMenu />
            <section className="flex items-center space-x-4">
              <Link className="hover:text-indigo-500/90" href={"/sign-in"}>
                Sign In
              </Link>
              <Link
                className="hover:text-indigo-500/90 py-2 px-4 rounded-md border border-1 hover:border-indigo-500/90"
                href={"/sign-up"}>
                Sign Up
              </Link>
            </section>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
