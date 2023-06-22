import Link from "next/link";
import { UrlObject } from "url";

import clsx from "clsx";

const classNames = clsx("group mx-2 rounded-lg transition-colors");

export function FooterLink({
  href,
  children,
}: {
  href: string | UrlObject;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={classNames}>
      <p
        className={`m-0 text-md opacity-50 font-crimson-text text-secondary group-hover:text-primary`}
      >
        {children}
      </p>
    </Link>
  );
}

export function FooterButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className={classNames}>
      <p
        className={`m-0 text-md opacity-50 font-crimson-text text-secondary group-hover:text-primary`}
      >
        {children}
      </p>
    </button>
  );
}
