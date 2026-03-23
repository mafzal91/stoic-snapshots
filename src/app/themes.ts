export type ThemeColors = {
  background: string;
  accent: string;
  primary: string;
  secondary: string;
};

export const themes: Record<string, ThemeColors> = {
  dark: { background: "#151c25", accent: "#bead9a", primary: "#f6f5eb", secondary: "#807872" },
  light: { background: "#f6f5eb", accent: "#bead9a", primary: "#151c25", secondary: "#807872" },
  "rustic-sunrise": { background: "#f3f4ed", accent: "#536162", primary: "#424642", secondary: "#c06014" },
  "rustic-sunset": { background: "#1f201d", accent: "#a4b0b1", primary: "#ff9025", secondary: "#71776e" },
  "soft-whisper": { background: "#f6f6f6", accent: "#ffe2e2", primary: "#cc7373", secondary: "#aaaaaa" },
  "shadowed-embrace": { background: "#1e1e1e", accent: "#552525", primary: "#a93c3c", secondary: "#888888" },
  "celestial-delight": { background: "#8294c4", accent: "#ffead2", primary: "#ffead2", secondary: "#dbdfea" },
  "dusk-serenade": { background: "#2b3749", accent: "#4e5478", primary: "#c1b890", secondary: "#6e728f" },
  "deep-plum": { background: "#00005c", accent: "#c060a1", primary: "#f0caa3", secondary: "#c060a1" },
  "nightfall-noir": { background: "#050529", accent: "#8d366f", primary: "#d1a77d", secondary: "#8d366f" },
  "peaches-and-cream": { background: "#fff3e2", accent: "#fa9884", primary: "#e74646", secondary: "#fa9884" },
  "terra-cotta-dreams": { background: "#eff5f5", accent: "#497174", primary: "#eb6440", secondary: "#497174" },
  "coastal-breeze": { background: "#c3dbd9", accent: "#bb6464", primary: "#bb6464", secondary: "#cdb699" },
  "fairy-forest": { background: "#235952", accent: "#ecfbfc", primary: "#ffc8bd", secondary: "#ffebd9" },
  "silver-tide": { background: "#b2bfd5", accent: "#c0d8d5", primary: "#f5f3f3", secondary: "#dfdfdf" },
  "golden-earth": { background: "#f7ad45", accent: "#657c6a", primary: "#bb3e00", secondary: "#657c6a" },
  "pale-serenity": { background: "#986d8d", accent: "#87a8a4", primary: "#efe3d0", secondary: "#d9cab3" },
  "retro-hour": { background: "#9cb4cc", accent: "#d3cedf", primary: "#f2d7d9", secondary: "#748da6" },
  "teal-blossom": { background: "#d7f7f5", accent: "#75cac3", primary: "#2a6171", secondary: "#f34573" },
  "meadow-glow": { background: "#f3f0d7", accent: "#cee5d0", primary: "#7a4a20", secondary: "#ffbf86" },
  "midnight-orchid": { background: "#470938", accent: "#1a3e59", primary: "#f2d6eb", secondary: "#5c94bd" },
  "citrus-violet": { background: "#ecffc9", accent: "#64fed6", primary: "#7871bf", secondary: "#82a6ee" },
  "deep-sea": { background: "#2b4450", accent: "#497285", primary: "#dfebed", secondary: "#f78536" },
  "steel-amber": { background: "#dddddd", accent: "#3c8dad", primary: "#125d98", secondary: "#f5a962" },
  "cobalt-ember": { background: "#125d98", accent: "#3c8dad", primary: "#f5a962", secondary: "#dddddd" },
  "ember-dune": { background: "#bb6464", accent: "#c3dbd9", primary: "#cdb699", secondary: "#c8f2ef" },
  "aqua-glow": { background: "#f9fbfc", accent: "#a0dbdb", primary: "#56a7a7", secondary: "#fcea90" },
};

export function generateThemeCSS(): string {
  return Object.entries(themes)
    .map(
      ([name, c]) =>
        `[data-theme="${name}"]{--color-background:${c.background};--color-accent:${c.accent};--color-primary:${c.primary};--color-secondary:${c.secondary};}`
    )
    .join("");
}
