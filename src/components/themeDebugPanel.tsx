"use client";
import * as React from "react";
import { ColorScheme } from "@/app/common";
import { themes } from "@/app/themes";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";

export function ThemeDebugPanel({
  initialColorScheme,
}: {
  initialColorScheme: ColorScheme | null;
}) {
  const [active, setActive] = React.useState<string>(
    initialColorScheme ?? "light"
  );

  const handleThemeChange = (theme: string) => {
    setActive(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm p-2 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {Object.entries(themes).map(([key, colors]) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs text-white border transition-all ${
              active === key
                ? "border-white bg-white/20"
                : "border-white/20 hover:border-white/50"
            }`}
          >
            <div className="flex gap-0.5 shrink-0">
              {[
                colors.background,
                colors.accent,
                colors.primary,
                colors.secondary,
              ].map((c, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span className="whitespace-nowrap">
              {convertHyphenatedToTitleCase(key)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
