"use client";
import * as React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ColorScheme } from "@/app/common";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";
import { DropdownSelector } from "@/components/dropdownSelector";
import { toggleThemeLike } from "@/app/actions/toggleThemeLike";
import { themes } from "@/app/themes";

const DEBUG_THEMES = new Set([
  ColorScheme.TerraMist,
  ColorScheme.EmberDune,
  ColorScheme.TerraFrost,
  ColorScheme.EmberWheat,
  ColorScheme.ClaySage,
  ColorScheme.DuneSage,
  ColorScheme.DuneFrost,
  ColorScheme.SandFrost,
  ColorScheme.DuneRose,
  ColorScheme.WheatSage,
  ColorScheme.SeaWheat,
  ColorScheme.SeaFrost,
  ColorScheme.MistRose,
  ColorScheme.TealFrost,
  ColorScheme.MistSand,
  ColorScheme.FrostWheat,
  ColorScheme.FrostSage,
  ColorScheme.IceRose,
  ColorScheme.MintTeal,
  ColorScheme.AquaSand,
]);

const allSchemes = Object.values(ColorScheme).filter(
  (scheme) => scheme !== ColorScheme.System
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
  const [isDebug, setIsDebug] = React.useState(false);
  React.useEffect(() => {
    setIsDebug(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  const schemes = isDebug
    ? allSchemes.filter((s) => DEBUG_THEMES.has(s))
    : allSchemes;

  const options = schemes.map((scheme) => ({
    name: convertHyphenatedToTitleCase(scheme),
    value: scheme,
    colors: themes[scheme]
      ? [themes[scheme].background, themes[scheme].accent, themes[scheme].primary, themes[scheme].secondary]
      : undefined,
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
