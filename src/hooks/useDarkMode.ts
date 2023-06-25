import * as React from "react";
import { updateColorScheme } from "@/app/actions/updateColorScheme";
import { useMediaQuery, useUpdateEffect } from "usehooks-ts";
import { ColorScheme } from "@/app/common";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  colorScheme: ColorScheme;
  handleChange: (name: ColorScheme) => void;
}

function getIntialColorScheme({
  initialValue,
  isDarkOS,
}: {
  initialValue: ColorScheme;
  isDarkOS: boolean;
}): ColorScheme {
  if (initialValue) {
    return initialValue;
  }

  return isDarkOS ? ColorScheme.Dark : ColorScheme.Light;
}

export function useDarkMode(initialValue: ColorScheme): UseDarkModeOutput {
  const [_, startTransition] = React.useTransition();

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(() =>
    getIntialColorScheme({ initialValue, isDarkOS })
  );

  // const [optimisticMessages, addOptimisticMessage] =
  //   React.experimental_useOptimistic(messages, (state, newMessage) => [
  //     ...state,
  //     { message: newMessage, sending: true },
  //   ]);

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    if (colorScheme === ColorScheme.System) {
      setColorScheme(colorScheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme, isDarkOS]);

  React.useEffect(() => {
    startTransition(() => {
      setColorScheme(colorScheme);
      updateColorScheme(colorScheme);
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
