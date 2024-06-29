import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className: string;
  href: string;
};

function NavLink({ children, className, href }: Props) {
  return (
    <li className={className}>
      <Link href={href}>{children}</Link>
    </li>
  );
}

export default NavLink;
