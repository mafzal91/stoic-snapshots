"use client";
import * as React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";
import { DropdownSelector } from "@/components/dropdownSelector";
import { toggleThemeLike } from "@/app/actions/toggleThemeLike";
import { ThemeColors } from "@/app/themes";

const DEBUG_THEMES = new Set(["ember-dune"]);

export function ColorSchemeSelector({
  value,
  onChange,
  isLiked,
  themes,
}: {
  value: string;
  onChange: (value: string) => void;
  isLiked: boolean;
  themes: Record<string, ThemeColors>;
}) {
  const [isDebug, setIsDebug] = React.useState(false);
  React.useEffect(() => {
    setIsDebug(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  const allSchemes = Object.keys(themes);
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
