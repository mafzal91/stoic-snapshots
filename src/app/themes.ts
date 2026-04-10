import { Database } from "@/utilities/database";
import { unstable_cache } from "next/cache";

export type ThemeColors = {
  background: string;
  accent: string;
  primary: string;
  secondary: string;
};

export type ThemeData = ThemeColors & {
  name: string;
};

export const getThemes = unstable_cache(
  async (): Promise<ThemeData[]> => {
    const db = new Database();
    const rows = await db.findAllThemes();
    return rows.map((r) => ({
      name: r.name,
      background: r.background,
      accent: r.accent,
      primary: r.primary,
      secondary: r.secondary,
    }));
  },
  ["all-themes"],
  { revalidate: 3600 }
);

export function themesToRecord(
  themes: ThemeData[]
): Record<string, ThemeColors> {
  return Object.fromEntries(
    themes.map((t) => [
      t.name,
      {
        background: t.background,
        accent: t.accent,
        primary: t.primary,
        secondary: t.secondary,
      },
    ])
  );
}

export function generateThemeCSS(themes: ThemeData[]): string {
  return themes
    .map(
      (t) =>
        `[data-theme="${t.name}"]{--color-background:${t.background};--color-accent:${t.accent};--color-primary:${t.primary};--color-secondary:${t.secondary};}`,
    )
    .join("");
}
