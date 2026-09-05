import type { ReactNode } from "react";
import clsx from "clsx";

function DraftingCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={clsx("absolute w-6 h-6 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 12.5H9.5 M12.5 0V9.5 M8.5 16.5L16.5 8.5" />
      <circle cx="12.5" cy="12.5" r="3" className="fill-background" />
    </svg>
  );
}

export function ArchitecturalBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col grow p-5 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-3 border border-primary/70" />
        <DraftingCorner className="top-0 left-0" />
        <DraftingCorner className="top-0 right-0 rotate-90" />
        <DraftingCorner className="bottom-0 left-0 -rotate-90" />
        <DraftingCorner className="bottom-0 right-0 rotate-180" />
        <div className="absolute top-2 left-1/2 h-2 w-px bg-secondary" />
        <div className="absolute bottom-2 left-1/2 h-2 w-px bg-secondary" />
        <div className="absolute left-2 top-1/2 w-2 h-px bg-secondary" />
        <div className="absolute right-2 top-1/2 w-2 h-px bg-secondary" />
      </div>
      <div className="relative flex flex-col grow min-w-0">{children}</div>
    </div>
  );
}
