import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className: string;
  href: string;
};

function NavLink({ children, className, href }: Props) {
  return (
    <Link href={href}>
      <li className={className}>{children}</li>
    </Link>
  );
}

export default NavLink;
