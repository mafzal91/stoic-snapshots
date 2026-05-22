import clsx from "clsx";

function DiamondCorner({
  className,
  filled = false,
}: {
  className: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 33 33"
      className={clsx("absolute w-8 h-8 text-primary z-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <path d="M1 33V22.6C13.0861 22.6 22.8839 12.9293 22.8839 1H33" />
        <path
          d="M7.36328 2.14941C8.54299 4.36813 10.3586 6.18327 12.5771 7.36328C10.3587 8.5431 8.5431 10.3587 7.36328 12.5771C6.18327 10.3586 4.36813 8.54299 2.14941 7.36328C4.36823 6.18338 6.18338 4.36823 7.36328 2.14941Z"
          fill={filled ? "currentColor" : "none"}
        />
      </g>
    </svg>
  );
}

export function DiamondsBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        <DiamondCorner filled className="top-1 left-1" />
        <DiamondCorner className="top-1 right-1 rotate-90" />
        <DiamondCorner filled className="bottom-1 right-1 rotate-180" />
        <DiamondCorner className="bottom-1 left-1 -rotate-90" />

        <div className="absolute top-[4px] left-9 right-9 h-px bg-primary" />
        <div className="absolute bottom-[4px] left-9 right-9 h-px bg-primary" />
        <div className="absolute left-[4px] top-9 bottom-9 w-px bg-primary" />
        <div className="absolute right-[4px] top-9 bottom-9 w-px bg-primary" />

        <div className="flex flex-col grow p-8">{children}</div>
      </div>
    </div>
  );
}
