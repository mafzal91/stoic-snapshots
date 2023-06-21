import Link from "next/link";
import clsx from "clsx";

// const classNames = clsx(
//   "group rounded-lg px-5 py-2 transition-colors",
//   "border border-transparent hover:border-primary"
// );

export function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "group rounded-lg px-5 py-2 transition-colors",
        "border border-transparent hover:border-primary"
      )}
    >
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
    <button
      onClick={onClick}
      className={clsx(
        "group rounded-lg px-5 py-2 transition-colors",
        "border border-transparent hover:border-primary"
      )}
    >
      <p
        className={`m-0 text-md opacity-50 font-crimson-text text-secondary group-hover:text-primary`}
      >
        {children}
      </p>
    </button>
  );
}
