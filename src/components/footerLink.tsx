import Link from "next/link";
import { UrlObject } from "url";
import clsx from "clsx";

const classNames = clsx("group rounded-lg transition-colors");

export function FooterLink({
  href,
  children,
  target,
  ...rest
}: React.ComponentPropsWithoutRef<"a"> & {
  href: string | UrlObject;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <Link
      target={target}
      href={href}
      className={clsx("py-0 sm:py-2 p-2 sm:my-2", classNames)}
      {...rest}
    >
      <span
        className={`m-0 text-sm sm:text-md font-crimson-text text-secondary group-hover:text-primary`}
      >
        {children}
      </span>
    </Link>
  );
}
