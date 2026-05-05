import * as React from "react";
import { updateSettings } from "@/app/actions/updateSettings";
import { useMediaQuery } from "usehooks-ts";
import { SYSTEM_SCHEME, DARK_SCHEME, LIGHT_SCHEME } from "@/app/common";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  colorScheme: string;
  handleChange: (name: string) => void;
}

function validateColorScheme(
  colorScheme: string,
  validNames: Set<string>
): boolean {
  return validNames.has(colorScheme) || colorScheme === SYSTEM_SCHEME;
}

function getInitialColorScheme({
  initialValue,
  isDarkOS,
  validNames,
}: {
  initialValue: string | null;
  isDarkOS: boolean;
  validNames: Set<string>;
}): string {
  if (initialValue && validateColorScheme(initialValue, validNames)) {
    return initialValue;
  }

  return isDarkOS ? DARK_SCHEME : LIGHT_SCHEME;
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
  initialValue: string | null,
  validThemeNames: Set<string>,
): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [colorScheme, setColorScheme] = React.useState<string>(() =>
    getInitialColorScheme({ initialValue, isDarkOS, validNames: validThemeNames }),
  );

  // Update darkMode if os prefers changes
  React.useEffect(() => {
    if (colorScheme === SYSTEM_SCHEME) {
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

        return prev === DARK_SCHEME ? LIGHT_SCHEME : DARK_SCHEME;
      }),
  };
}
