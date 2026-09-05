import type { ReactNode } from "react";
import clsx from "clsx";

function StampEdge({
  vertical = false,
  className,
}: {
  vertical?: boolean;
  className: string;
}) {
  const width = vertical ? 12 : 16;
  const height = vertical ? 16 : 12;
  const scallop = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <path d="M0 1H2A6 6 0 0 0 14 1H16" transform="${vertical ? "matrix(0 1 1 0 0 0)" : "matrix(1 0 0 1 0 0)"}" fill="none" stroke="black" stroke-width="1.25"/>
  </svg>`;

  return (
    <div
      className={clsx(
        "absolute bg-primary",
        vertical ? "inset-y-3 w-3" : "inset-x-3 h-3",
        className,
      )}
      style={{
        maskImage: `url("data:image/svg+xml,${encodeURIComponent(scallop)}")`,
        maskSize: vertical ? "12px 16px" : "16px 12px",
        // Fit complete scallops to the edge so both ends meet their corners.
        maskRepeat: vertical ? "no-repeat round" : "round no-repeat",
        maskMode: "alpha",
      }}
    />
  );
}

function StampCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={clsx("absolute w-3 h-3 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 12V5Q1 1 5 1H12" />
    </svg>
  );
}

export function PostageStampBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col grow p-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <StampEdge className="top-0" />
        <StampEdge className="bottom-0 rotate-180" />
        <StampEdge vertical className="left-0" />
        <StampEdge vertical className="right-0 rotate-180" />
        <StampCorner className="top-0 left-0" />
        <StampCorner className="top-0 right-0 rotate-90" />
        <StampCorner className="bottom-0 right-0 rotate-180" />
        <StampCorner className="bottom-0 left-0 -rotate-90" />
      </div>
      <div className="relative flex flex-col grow min-w-0 border border-dashed border-primary/50 p-1 sm:p-2">
        {children}
      </div>
    </div>
  );
}
