"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function NavigationLink({
  href,
  children,
  className,
  onClick,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "transition-colors duration-150",
        // Desktop default
        "text-slate-300 hover:text-white",
        // Active state
        isActive &&
        "text-white font-semibold",

        // Allow custom classes from parent components
        className
      )}
    >
      {children}
    </Link>
  );
}
