import * as React from "react";
import { updateSettings } from "@/app/actions/updateSettings";
import { useMediaQuery } from "usehooks-ts";
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
    colorScheme === ColorScheme.TerraCottaDreams ||
    colorScheme === ColorScheme.CoastalBreeze ||
    colorScheme === ColorScheme.FairyForest ||
    colorScheme === ColorScheme.SilverTide ||
    colorScheme === ColorScheme.GoldenEarth ||
    colorScheme === ColorScheme.PaleSerenity ||
    colorScheme === ColorScheme.RetroHour ||
    colorScheme === ColorScheme.TealBlossom ||
    colorScheme === ColorScheme.MeadowGlow01 ||
    colorScheme === ColorScheme.MeadowGlow02 ||
    colorScheme === ColorScheme.MeadowGlow03 ||
    colorScheme === ColorScheme.MeadowGlow04 ||
    colorScheme === ColorScheme.MeadowGlow05 ||
    colorScheme === ColorScheme.MeadowGlow06 ||
    colorScheme === ColorScheme.MeadowGlow07 ||
    colorScheme === ColorScheme.MeadowGlow08 ||
    colorScheme === ColorScheme.MeadowGlow09 ||
    colorScheme === ColorScheme.MeadowGlow10 ||
    colorScheme === ColorScheme.MeadowGlow11 ||
    colorScheme === ColorScheme.MeadowGlow12 ||
    colorScheme === ColorScheme.MeadowGlow13 ||
    colorScheme === ColorScheme.MeadowGlow14 ||
    colorScheme === ColorScheme.MeadowGlow15 ||
    colorScheme === ColorScheme.MeadowGlow16 ||
    colorScheme === ColorScheme.MeadowGlow17 ||
    colorScheme === ColorScheme.MeadowGlow18 ||
    colorScheme === ColorScheme.MeadowGlow19 ||
    colorScheme === ColorScheme.MeadowGlow20 ||
    colorScheme === ColorScheme.MeadowGlow21 ||
    colorScheme === ColorScheme.MeadowGlow22 ||
    colorScheme === ColorScheme.MeadowGlow23 ||
    colorScheme === ColorScheme.MeadowGlow24 ||
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
  React.useEffect(() => {
    if (colorScheme === ColorScheme.System) {
      setColorScheme(colorScheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme, isDarkOS]);

  React.useEffect(() => {
    // Update body element class
    clearBodyClass();
    document.body.classList.add(`theme-${colorScheme}`);
    updateSettings({ field: "colorScheme", value: colorScheme }).then(() => {
      setColorScheme(colorScheme);
    });
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
