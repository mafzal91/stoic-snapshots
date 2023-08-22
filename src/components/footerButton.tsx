"use client";
import clsx from "clsx";

const classNames = clsx("group rounded-lg transition-colors");

export function FooterButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className={clsx("m-2 p-1", classNames)}>
      <p
        className={`m-0 text-sm sm:text-md font-crimson-text text-secondary group-hover:text-primary`}
      >
        {children}
      </p>
    </button>
  );
}
