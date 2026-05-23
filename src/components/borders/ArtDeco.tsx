import clsx from "clsx";

function ArtDecoCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={clsx("absolute w-8 h-8 text-primary z-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <rect x="2" y="2" width="5" height="5" />
        <path d="M14 0 L32 0" />
        <path d="M0 14 L0 32" />
        <path d="M14 0 L14 10 L10 10 L10 14 L0 14" />
      </g>
    </svg>
  );
}

export function ArtDecoBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        <ArtDecoCorner className="top-1 left-1" />
        <ArtDecoCorner className="top-1 right-1 rotate-90" />
        <ArtDecoCorner className="bottom-1 right-1 rotate-180" />
        <ArtDecoCorner className="bottom-1 left-1 -rotate-90" />

        <div className="absolute top-[4px] left-9 right-9 h-px bg-primary" />
        <div className="absolute bottom-[4px] left-9 right-9 h-px bg-primary" />
        <div className="absolute left-[4px] top-9 bottom-9 w-px bg-primary" />
        <div className="absolute right-[4px] top-9 bottom-9 w-px bg-primary" />

        <div className="flex flex-col grow p-8">{children}</div>
      </div>
    </div>
  );
}
