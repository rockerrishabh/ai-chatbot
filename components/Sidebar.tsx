"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import NavLink from "./NavLink";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

function Sidebar({ session }: Props) {
  return (
    <Drawer modal={false} direction="right">
      <DrawerTrigger className="flex md:hidden">
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerClose className="absolute top-4 right-4">
          <XIcon />
        </DrawerClose>
        <DrawerHeader className="h-full items-center">
          <ul className="gap-4 flex flex-col">
            <NavLink className="hover:text-indigo-500/90 text-center" href="/">
              Chat
            </NavLink>
            <NavLink
              className="hover:text-indigo-500/90 text-center"
              href="/about-us">
              About Us
            </NavLink>
            <NavLink
              className="hover:text-indigo-500/90 text-center"
              href="/contact-us">
              Contact Us
            </NavLink>

            {!session && (
              <NavLink
                className="hover:text-indigo-500/90 text-center"
                href={"/auth/sign-in"}>
                Sign In
              </NavLink>
            )}
            <NavLink
              className="hover:text-indigo-500/90 text-center px-4 py-2 border hover:border-indigo-500/90 rounded"
              href={session ? "/dashboard" : "/auth/sign-up"}>
              {session ? "Dashboard" : "Sign Up"}
            </NavLink>
          </ul>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

export default Sidebar;
