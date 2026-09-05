import type { ReactNode } from "react";
import clsx from "clsx";

function BookplateCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={clsx("absolute w-10 h-10 sm:w-12 sm:h-12 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 36C12 22 22 12 36 12 M13 29C26 30 31 21 28 18C24 14 18 20 20 24 M29 13C30 26 21 31 18 28C14 24 20 18 24 20" />
      <path d="M12 12C18 12 19 17 19 19C17 19 12 18 12 12Z" fill="currentColor" />
      <circle cx="35" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="35" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BookplateFlourish({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 80 24"
      className={clsx("absolute left-1/2 -translate-x-1/2 w-20 h-6 text-primary bg-background", className)}
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 12H20C30 12 28 3 22 5C17 7 25 20 40 12C55 20 63 7 58 5C52 3 50 12 60 12H76" />
      <path d="M40 4L44 10L40 17L36 10Z" fill="currentColor" />
    </svg>
  );
}

export function BookplateBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col grow border border-primary p-[5px]">
      <div className="flex flex-col grow min-w-0 border border-primary p-2 sm:p-4">
        {children}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <BookplateCorner className="top-0 left-0" />
        <BookplateCorner className="top-0 right-0 rotate-90" />
        <BookplateCorner className="bottom-0 right-0 rotate-180" />
        <BookplateCorner className="bottom-0 left-0 -rotate-90" />
        <BookplateFlourish className="-top-2" />
        <BookplateFlourish className="-bottom-2 rotate-180" />
      </div>
    </div>
  );
}
