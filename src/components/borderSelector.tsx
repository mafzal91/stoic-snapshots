import React from "react";
import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Border } from "@/components/border";
import { BorderStyle } from "@/app/common";

type BorderSelectorProps = {
  value: BorderStyle;
  onChange: (value: BorderStyle) => void;
};

const BORDER_STYLE_OPTIONS = [
  { name: "Corners", value: BorderStyle.Corners },
  { name: "Brackets", value: BorderStyle.Brackets },
  { name: "Diamonds", value: BorderStyle.Diamonds },
  { name: "Sparkles", value: BorderStyle.Sparkles },
  { name: "Art Deco", value: BorderStyle.ArtDeco },
  { name: "NYC Subway", value: BorderStyle.NYCSubway },
  { name: "NYC Subway Thin", value: BorderStyle.NYCSubwayThin },
  { name: "NYC Subway 3 Rows", value: BorderStyle.NYCSubwayThreeRows },
  { name: "Greek Key", value: BorderStyle.GreekKey },
  { name: "Bookplate", value: BorderStyle.Bookplate },
  { name: "Architectural", value: BorderStyle.Architectural },
  { name: "Postage Stamp", value: BorderStyle.PostageStamp },
  { name: "Roman Mosaic", value: BorderStyle.RomanMosaic },
  { name: "Letterpress", value: BorderStyle.Letterpress },
  { name: "None", value: BorderStyle.None },
];

function BorderPreview({ borderStyle }: { borderStyle: BorderStyle }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 360 224"
      className="block w-full aspect-[45/28]"
    >
      <foreignObject width="360" height="224">
        <div className="flex h-full w-full bg-background p-3">
          <Border borderStyle={borderStyle}>
            <div className="flex grow flex-col items-center justify-center gap-2 text-center">
              <span className="font-eb-garamond text-[26px] leading-snug text-primary">
                A moment of clarity.
              </span>
              <span className="font-crimson-text text-[14px] text-secondary">
                Stoic Snapshots
              </span>
            </div>
          </Border>
        </div>
      </foreignObject>
    </svg>
  );
}

export const BorderSelector: React.FC<BorderSelectorProps> = ({
  value,
  onChange,
}) => {
  const groupId = React.useId();

  return (
    <fieldset className="flex min-h-40 min-w-0 flex-col" aria-describedby={`${groupId}-description`}>
      <legend className="shrink-0 text-primary">
        Border Style
      </legend>
      <p id={`${groupId}-description`} className="mt-1 shrink-0 text-xs text-secondary">
        Choose a frame. Previews use your current theme.
      </p>
      <div className="mt-3 grid min-h-0 max-h-[min(24rem,50dvh)] grid-cols-[repeat(auto-fit,minmax(min(100%,7rem),1fr))] gap-3 overflow-y-auto overscroll-contain p-1 sm:grid-cols-3">
        {BORDER_STYLE_OPTIONS.map((option) => (
          <label key={option.value} className="relative min-w-0 cursor-pointer">
            <input
              type="radio"
              name={groupId}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              onFocus={(event) => event.currentTarget.parentElement?.scrollIntoView({
                block: "nearest",
                inline: "nearest",
              })}
              className="peer sr-only"
            />
            <span className="flex h-full flex-col overflow-hidden rounded-md border border-secondary/40 bg-background transition-colors hover:border-primary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
              <BorderPreview borderStyle={option.value} />
              <span className="flex min-h-12 items-center justify-between gap-1 px-2 pb-2 text-xs leading-snug text-primary">
                <span className={clsx("min-w-0 [overflow-wrap:anywhere]", value === option.value && "font-semibold")}>
                  {option.name}
                </span>
                <CheckCircleIcon
                  aria-hidden="true"
                  className={clsx(
                    "h-4 w-4 shrink-0",
                    value === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
