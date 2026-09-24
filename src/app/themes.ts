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

const builtInThemes: ThemeData[] = [
  {
    name: "sherbet-sky",
    background: "#8cc0de",
    accent: "#ffd9c0",
    primary: "#faf0d7",
    secondary: "#f4bfbf",
  },
  {
    name: "orchid-blush",
    background: "#f6d5d5",
    accent: "#b08fbb",
    primary: "#8b2f8a",
    secondary: "#ca498c",
  },
];

// Only the DB query is cached; built-in themes are merged afterwards so edits
// to them show up on the next deploy instead of waiting for the cache to expire.
const getDbThemes = unstable_cache(
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
  ["db-themes"],
  { revalidate: 3600, tags: ["all-themes"] }
);

export async function getThemes(): Promise<ThemeData[]> {
  const dbThemes = await getDbThemes();
  const dbNames = new Set(dbThemes.map((t) => t.name));
  return [...builtInThemes.filter((t) => !dbNames.has(t.name)), ...dbThemes];
}

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
