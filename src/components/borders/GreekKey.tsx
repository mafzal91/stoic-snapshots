import { useId, type ReactNode } from "react";
import clsx from "clsx";

function KeyBand({
  vertical = false,
  className,
}: {
  vertical?: boolean;
  className: string;
}) {
  const patternId = useId();

  return (
    <svg
      className={clsx(
        "absolute text-primary",
        vertical ? "inset-y-5 w-5 h-[calc(100%-40px)]" : "inset-x-5 h-5 w-[calc(100%-40px)]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 32 32"
          patternTransform={vertical ? "matrix(0 1 1 0 0 0)" : undefined}
        >
          <path
            d="M0 27H32 M28 27V5H4V21H20V11H12V15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function KeyCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={clsx("absolute w-5 h-5 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 27H5V5H27V21H13V13H19" />
    </svg>
  );
}

export function GreekKeyBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col grow p-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <KeyBand className="top-0" />
        <KeyBand className="bottom-0 rotate-180" />
        <KeyBand vertical className="left-0" />
        <KeyBand vertical className="right-0 rotate-180" />
        <KeyCorner className="top-0 left-0" />
        <KeyCorner className="top-0 right-0 rotate-90" />
        <KeyCorner className="bottom-0 right-0 rotate-180" />
        <KeyCorner className="bottom-0 left-0 -rotate-90" />
      </div>
      <div className="relative flex flex-col grow min-w-0 border border-primary/50">
        {children}
      </div>
    </div>
  );
}
