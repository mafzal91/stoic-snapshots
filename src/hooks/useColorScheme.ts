import * as React from "react";
import { updateSettings } from "@/app/actions/updateSettings";
import { useMediaQuery, useUpdateEffect } from "usehooks-ts";
import { ColorScheme } from "@/app/common";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  colorScheme: ColorScheme;
  handleChange: (name: ColorScheme) => void;
}

function validateColorScheme(colorScheme: string): colorScheme is ColorScheme {
  return (
    colorScheme === ColorScheme.Light ||
    colorScheme === ColorScheme.Dark ||
    colorScheme === ColorScheme.RusticSunrise ||
    colorScheme === ColorScheme.RusticSunset ||
    colorScheme === ColorScheme.SoftWhisper ||
    colorScheme === ColorScheme.ShadowedEmbrace ||
    colorScheme === ColorScheme.CelestialDelight ||
    colorScheme === ColorScheme.DuskSerenade ||
    colorScheme === ColorScheme.DeepPlum ||
    colorScheme === ColorScheme.NightfallNoir ||
    colorScheme === ColorScheme.PeachesAndCream ||
    colorScheme === ColorScheme.System
  );
}

function getIntialColorScheme({
  initialValue,
  isDarkOS,
}: {
  initialValue: string | ColorScheme | null;
  isDarkOS: boolean;
}): ColorScheme {
  if (initialValue && validateColorScheme(initialValue)) {
    return initialValue;
  }

  return isDarkOS ? ColorScheme.Dark : ColorScheme.Light;
}

function clearBodyClass() {
  const body = document.body;
  const classes = body.classList;

  for (var i = classes.length - 1; i >= 0; i--) {
    var className = classes[i];
    if (className.startsWith("theme-")) {
      body.classList.remove(className);
    }
  }
}

export function useColorScheme(
  initialValue: ColorScheme | null
): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(() =>
    getIntialColorScheme({ initialValue, isDarkOS })
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    if (colorScheme === ColorScheme.System) {
      setColorScheme(colorScheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme, isDarkOS]);

  React.useEffect(() => {
    // Update body element class
    console.log("frontend", colorScheme);
    clearBodyClass();
    document.body.classList.add(`theme-${colorScheme}`);
    setColorScheme(colorScheme);
    updateSettings({ field: "color-scheme", value: colorScheme });
  }, [colorScheme]);

  return {
    colorScheme,
    handleChange: (name) =>
      setColorScheme((prev) => {
        if (name) return name;

        return prev === ColorScheme.Dark ? ColorScheme.Light : ColorScheme.Dark;
      }),
  };
}
