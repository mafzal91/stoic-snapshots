---
name: colorhunt-theme
description: Generate new themes from a colorhunt.co palette URL. Triggered when user provides a colorhunt.co link.
---

# ColorHunt Theme Generator

## When to Use This Skill

Use this skill when the user provides a **colorhunt.co** URL, such as:
- `https://colorhunt.co/palette/dddddd125d983c8dadf5a962/`
- Any link matching `colorhunt.co/palette/*`

## How to Extract Colors from the URL

The palette colors are embedded in the URL path as concatenated 6-character hex values (without `#`).

**Example URL:** `https://colorhunt.co/palette/dddddd125d983c8dadf5a962/`

Split the palette slug into 4 colors (each 6 chars):
- `dddddd` → `#dddddd`
- `125d98` → `#125d98`
- `3c8dad` → `#3c8dad`
- `f5a962` → `#f5a962`

The slug is exactly 24 characters = 4 × 6-char hex codes.

## Color Role Assignment

Assign the 4 extracted colors to theme roles based on lightness and contrast:

- **`--color-background`**: The darkest or most neutral color (typically used as the page background). For light themes, pick the lightest. For dark themes, pick the darkest.
- **`--color-accent`**: A mid-tone color that complements the background (used for cards, containers, secondary surfaces).
- **`--color-primary`**: The color with the highest contrast against the background (main text/foreground). Must be readable on top of `--color-background`.
- **`--color-secondary`**: The most vivid or saturated pop color (used for highlights, buttons, accents).

Use your judgment to determine lightness: for a light palette, the lightest color becomes background; for a dark palette, the darkest becomes background.

## Theme Naming

Generate a creative, evocative 2-3 word theme name that captures the mood or aesthetic of the palette. Examples of good names: "Ocean Mist", "Meadow Glow", "Rustic Sunrise", "Midnight Orchid".

Convert the name to:
- **PascalCase** for the TypeScript enum key: `OceanMist`
- **kebab-case** for the enum value and CSS selector: `ocean-mist`

## Files to Modify

There are exactly 3 files to update:

### 1. `src/app/common.ts`
Add the new enum entry to the `ColorScheme` enum, before the closing `}`:

```typescript
export enum ColorScheme {
  // ... existing entries ...
  DeepSea = "deep-sea",
  NewThemeName = "new-theme-name",  // add here
}
```

### 2. `src/app/themes.ts`
Add the new theme entry to the `themes` record, before the closing `};`. The CSS for all themes is generated from this file — do **not** edit `globals.css` for theme colors.

```typescript
export const themes: Record<string, ThemeColors> = {
  // ... existing entries ...
  "deep-sea": { background: "#2b4450", accent: "#497285", primary: "#dfebed", secondary: "#f78536" },
  "new-theme-name": { background: "#xxxxxx", accent: "#xxxxxx", primary: "#xxxxxx", secondary: "#xxxxxx" },
};
```

### 3. `src/hooks/useColorScheme.ts`
Add the new theme to the `validateColorScheme` function, before `colorScheme === ColorScheme.System`:

```typescript
function validateColorScheme(colorScheme: string): colorScheme is ColorScheme {
  return (
    // ... existing entries ...
    colorScheme === ColorScheme.DeepSea ||
    colorScheme === ColorScheme.NewThemeName ||  // add here
    colorScheme === ColorScheme.System
  );
}
```

## Full Workflow

1. **Parse the URL** — extract the 24-char palette slug, split into 4 hex colors.
2. **Assign roles** — map colors to background, accent, primary, secondary based on lightness/contrast.
3. **Name the theme** — generate a creative name, derive PascalCase and kebab-case variants.
4. **Show the user** — briefly display the extracted colors, the role mapping, and the proposed theme name. Ask for confirmation or alternative name if unsure.
5. **Apply changes** — update all 3 files (`src/app/common.ts`, `src/app/themes.ts`, `src/hooks/useColorScheme.ts`).
6. **Confirm** — tell the user the theme name and that it's ready to use.

## Example

Given URL: `https://colorhunt.co/palette/dddddd125d983c8dadf5a962/`

Colors extracted:
- `#dddddd` (light gray)
- `#125d98` (deep blue)
- `#3c8dad` (steel blue)
- `#f5a962` (warm amber)

Role assignment:
- background: `#dddddd` (lightest — light theme)
- accent: `#3c8dad` (mid-tone complement)
- primary: `#125d98` (darkest, high contrast on light bg)
- secondary: `#f5a962` (warm pop color)

Theme name: **"Steel Amber"** → enum: `SteelAmber = "steel-amber"`
