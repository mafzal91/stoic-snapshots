"use client";
import * as React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ColorScheme } from "@/app/common";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";
import { DropdownSelector } from "@/components/dropdownSelector";
import { toggleThemeLike } from "@/app/actions/toggleThemeLike";

// TODO: remove this filter when done testing new palette themes
const newPaletteThemes = new Set([
  "steel-amber", "silver-navy", "slate-honey", "misty-saffron", "pale-sunset",
  "warm-slate", "navy-dusk", "deep-amber", "cobalt-mist", "cobalt-ember",
  "midnight-gold", "deep-saffron", "ocean-pebble", "lagoon-warmth",
  "cerulean-mist", "teal-flame", "aqua-honey", "azure-spice", "golden-coast",
  "amber-haze", "harvest-navy", "warm-indigo", "sunlit-ocean", "citrus-tide",
]);
const schemes = Object.values(ColorScheme).filter(
  (scheme) => newPaletteThemes.has(scheme)
);

export function ColorSchemeSelector({
  value,
  onChange,
  isLiked,
}: {
  value: ColorScheme;
  onChange: (value: string) => void;
  isLiked: boolean;
}) {
  const options = schemes.map((scheme) => ({
    name: convertHyphenatedToTitleCase(scheme),
    value: scheme,
  }));

  const handleToggle = async () => {
    await toggleThemeLike();
  };

  return (
    <>
      <label className="text-primary">Theme</label>
      <div className="flex items-center">
        <div className="grow">
          <DropdownSelector
            options={options}
            value={value}
            onChange={onChange}
          />
        </div>
        &nbsp;&nbsp;
        <button
          title={isLiked ? "Click to unlike theme" : "Click to like theme"}
          aria-label={isLiked ? "unlike theme" : "like theme"}
          className="p-1 rounded-md text-primary"
          onClick={handleToggle}
        >
          {isLiked ? (
            <HeartIconSolid className="h-6 w-6" aria-hidden="true" />
          ) : (
            <HeartIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
