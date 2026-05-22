import clsx from "clsx";

function BracketCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 25 25"
      className={clsx("absolute w-6 h-6 text-primary z-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 24L14.9286 24L14.9286 6.77466L6.89005 6.77466" />
        <path d="M24 0L24 14.9286L6.77472 14.9286L6.77472 6.89005" />
      </g>
    </svg>
  );
}

export function BracketsBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        <BracketCorner className="top-1 left-1" />
        <BracketCorner className="top-1 right-1 rotate-90" />
        <BracketCorner className="bottom-1 right-1 rotate-180" />
        <BracketCorner className="bottom-1 left-1 -rotate-90" />

        <div className="absolute top-[4px] left-7 right-7 h-px bg-primary" />
        <div className="absolute bottom-[4px] left-7 right-7 h-px bg-primary" />
        <div className="absolute left-[4px] top-7 bottom-7 w-px bg-primary" />
        <div className="absolute right-[4px] top-7 bottom-7 w-px bg-primary" />

        <div className="flex flex-col grow p-8">{children}</div>
      </div>
    </div>
  );
}
