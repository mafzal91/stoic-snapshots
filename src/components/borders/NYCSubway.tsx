import type { ReactNode } from "react";
import clsx from "clsx";

type TileRows = 3 | 5;

function MosaicBand({
  vertical = false,
  rows,
  className,
}: {
  vertical?: boolean;
  rows: TileRows;
  className: string;
}) {
  const colors = rows === 3
    ? ["primary", "accent", "primary"]
    : ["secondary", "primary", "accent", "primary", "secondary"];
  const colorStops = colors.map((color, index) =>
    `var(--color-${color}) calc(var(--tile-size) * ${index}) calc(var(--tile-size) * ${index + 1})`
  ).join(", ");

  return (
    <div
      className={clsx(
        "absolute",
        vertical
          ? "inset-y-[var(--mosaic-size)] w-[var(--mosaic-size)]"
          : "inset-x-[var(--mosaic-size)] h-[var(--mosaic-size)]",
        className,
      )}
      style={{
        // The first two layers cut grout lines through the colored tile bands.
        backgroundImage: `
          repeating-linear-gradient(to right, var(--color-background) 0 1px, transparent 1px var(--tile-size)),
          repeating-linear-gradient(to bottom, var(--color-background) 0 1px, transparent 1px var(--tile-size)),
          linear-gradient(${vertical ? "to right" : "to bottom"}, ${colorStops})`,
      }}
    />
  );
}

function MosaicCorner({ rows, className }: { rows: TileRows; className: string }) {
  const center = (rows - 1) / 2;

  return (
    <svg
      viewBox={`0 0 ${rows * 8} ${rows * 8}`}
      className={clsx(
        "absolute w-[var(--mosaic-size)] h-[var(--mosaic-size)]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: rows * rows }, (_, index) => {
        const x = index % rows;
        const y = Math.floor(index / rows);
        const distance = Math.abs(x - center) + Math.abs(y - center);

        return (
          <rect
            key={index}
            x={x * 8 + 0.5}
            y={y * 8 + 0.5}
            width="7"
            height="7"
            className={
              distance === 0
                ? "fill-accent"
                : distance <= center
                  ? "fill-primary"
                  : "fill-secondary"
            }
          />
        );
      })}
    </svg>
  );
}

export function NYCSubwayBorder({
  children,
  thin = false,
  rows = 5,
}: {
  children: ReactNode;
  thin?: boolean;
  rows?: TileRows;
}) {
  return (
    <div
      className={clsx(
        "relative flex flex-col grow border border-primary bg-background p-[calc(var(--mosaic-size)+5px)]",
        rows === 3
          ? "[--mosaic-size:calc(var(--tile-size)*3)]"
          : "[--mosaic-size:calc(var(--tile-size)*5)]",
        thin
          ? "[--tile-size:2px] min-[480px]:[--tile-size:3px] sm:[--tile-size:4px]"
          : "[--tile-size:4px] min-[480px]:[--tile-size:6px] sm:[--tile-size:8px]",
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <MosaicBand rows={rows} className="top-0" />
        <MosaicBand rows={rows} className="bottom-0" />
        <MosaicBand rows={rows} vertical className="left-0" />
        <MosaicBand rows={rows} vertical className="right-0" />
        <MosaicCorner rows={rows} className="top-0 left-0" />
        <MosaicCorner rows={rows} className="top-0 right-0" />
        <MosaicCorner rows={rows} className="bottom-0 left-0" />
        <MosaicCorner rows={rows} className="bottom-0 right-0" />
      </div>
      <div className="relative flex flex-col grow min-w-0 border border-primary">
        {children}
      </div>
    </div>
  );
}
