import { useId, type ReactNode } from "react";
import clsx from "clsx";

function RomanBand({
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
        vertical ? "inset-y-7 w-5 h-[calc(100%-56px)]" : "inset-x-7 h-5 w-[calc(100%-56px)]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width={vertical ? 20 : 32}
          height={vertical ? 32 : 20}
          patternUnits="userSpaceOnUse"
        >
          <g transform={vertical ? "matrix(0 1 1 0 0 0)" : undefined}>
            <path d="M0 1H32 M0 19H32" stroke="currentColor" strokeWidth="0.75" />
            <rect x="2" y="6" width="8" height="8" className="fill-accent" stroke="currentColor" />
            <path d="M22 3L29 10L22 17L15 10Z" fill="currentColor" />
            <path d="M22 7L25 10L22 13L19 10Z" className="fill-background" />
            <path d="M6 6V14 M2 10H10" className="stroke-background" strokeWidth="0.75" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function RomanMedallion({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={clsx("absolute w-7 h-7 text-primary", className)}
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="30" height="30" />
      <path d="M16 3L29 16L16 29L3 16Z" className="fill-accent" />
      <circle cx="16" cy="16" r="8" className="fill-background" />
      <path d="M16 9L18 14L23 16L18 18L16 23L14 18L9 16L14 14Z" fill="currentColor" />
      <path d="M3 3L7 7 M25 25L29 29 M3 29L7 25 M25 7L29 3" />
    </svg>
  );
}

export function RomanMosaicBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col grow p-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <RomanBand className="top-1" />
        <RomanBand className="bottom-1" />
        <RomanBand vertical className="left-1" />
        <RomanBand vertical className="right-1" />
        <RomanMedallion className="top-0 left-0" />
        <RomanMedallion className="top-0 right-0" />
        <RomanMedallion className="bottom-0 left-0" />
        <RomanMedallion className="bottom-0 right-0" />
      </div>
      <div className="relative flex flex-col grow min-w-0 border border-primary/50">
        {children}
      </div>
    </div>
  );
}
