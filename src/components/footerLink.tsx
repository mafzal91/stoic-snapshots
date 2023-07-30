import Link from "next/link";
import { UrlObject } from "url";
import clsx from "clsx";

const classNames = clsx("group rounded-lg transition-colors");

export function FooterLink({
  href,
  children,
  target,
}: {
  href: string | UrlObject;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <Link
      target={target}
      href={href}
      className={clsx(
        "m-2 p-1",
        "focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1",
        classNames
      )}
    >
      <p
        className={`m-0 text-sm sm:text-md font-crimson-text text-secondary group-hover:text-primary`}
      >
        {children}
      </p>
    </Link>
  );
}
