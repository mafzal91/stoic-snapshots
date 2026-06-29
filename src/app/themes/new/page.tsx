"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@/components/loader";

type Role = "background" | "accent" | "primary" | "secondary";

const ROLES: { key: Role; label: string; hint: string }[] = [
  { key: "background", label: "Background", hint: "Page background" },
  { key: "accent", label: "Accent", hint: "Cards & secondary surfaces" },
  { key: "primary", label: "Primary", hint: "Main text / foreground" },
  { key: "secondary", label: "Secondary", hint: "Highlights & buttons" },
];

const DEFAULTS: Record<Role, string> = {
  background: "#fff5de",
  accent: "#c6b4ce",
  primary: "#3c5186",
  secondary: "#9b72aa",
};

const HEX_RE = /^#?[0-9a-fA-F]{6}$/;

function normalizeHex(value: string): string {
  const v = value.trim();
  return v.startsWith("#") ? v : `#${v}`;
}

function AddThemeForm() {
  const params = useSearchParams();

  const [name, setName] = React.useState(params.get("name") ?? "");
  const [colors, setColors] = React.useState<Record<Role, string>>(() => ({
    background: normalizeHex(params.get("bg") ?? DEFAULTS.background),
    accent: normalizeHex(params.get("accent") ?? DEFAULTS.accent),
    primary: normalizeHex(params.get("primary") ?? DEFAULTS.primary),
    secondary: normalizeHex(params.get("secondary") ?? DEFAULTS.secondary),
  }));

  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<
    { type: "success"; name: string } | { type: "error"; messages: string[] } | null
  >(null);

  const setColor = (role: Role, value: string) =>
    setColors((prev) => ({ ...prev, [role]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    if (!name.trim()) errors.push("Name is required");
    for (const { key, label } of ROLES) {
      if (!HEX_RE.test(colors[key])) {
        errors.push(`${label} must be a 6-digit hex color`);
      }
    }
    if (errors.length > 0) {
      setResult({ type: "error", messages: errors });
      return;
    }

    setResult(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/themes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim().toLowerCase().replace(/\s+/g, "-"),
            background: colors.background.replace("#", ""),
            accent: colors.accent.replace("#", ""),
            primary: colors.primary.replace("#", ""),
            secondary: colors.secondary.replace("#", ""),
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const messages: string[] = data.errors ??
            (data.error ? [data.error] : ["Something went wrong"]);
          setResult({ type: "error", messages });
          return;
        }

        const theme = await res.json();
        setResult({ type: "success", name: theme.name });
      } catch {
        setResult({ type: "error", messages: ["Network error — please try again"] });
      }
    });
  };

  return (
    <div className="w-full max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-semibold text-primary mb-1">Add a Theme</h1>
      <p className="text-secondary mb-8">
        Pick four colors, name it, and save it to the theme library.
      </p>

      {/* Live preview */}
      <div
        className="rounded-lg border border-primary overflow-hidden mb-8"
        style={{ backgroundColor: colors.background }}
      >
        <div className="p-6">
          <div
            className="rounded-md p-4 mb-4"
            style={{ backgroundColor: colors.accent }}
          >
            <p
              className="text-lg font-semibold"
              style={{ color: colors.primary }}
            >
              The happiness of your life depends upon the quality of your
              thoughts.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: colors.primary }}>— Marcus Aurelius</span>
            <span
              className="rounded-md px-3 py-1 text-sm font-semibold"
              style={{ backgroundColor: colors.secondary, color: colors.background }}
            >
              {name.trim() || "Preview"}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="theme-name"
            className="block text-sm font-medium text-primary mb-1"
          >
            Theme name
          </label>
          <input
            id="theme-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Iris Cream"
            className="focus:ring-primary focus:border-primary block w-full shadow-xs sm:text-sm border-primary rounded-md"
          />
          <p className="text-xs text-secondary mt-1">
            Saved as <code>{name.trim().toLowerCase().replace(/\s+/g, "-") || "iris-cream"}</code>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {ROLES.map(({ key, label, hint }) => (
            <div key={key}>
              <label
                htmlFor={`color-${key}`}
                className="block text-sm font-medium text-primary"
              >
                {label}
              </label>
              <p className="text-xs text-secondary mb-1">{hint}</p>
              <div className="flex items-center gap-2">
                <input
                  id={`color-${key}`}
                  type="color"
                  value={HEX_RE.test(colors[key]) ? normalizeHex(colors[key]) : "#000000"}
                  onChange={(e) => setColor(key, e.target.value)}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-md border border-primary bg-transparent p-0.5"
                  aria-label={`${label} color picker`}
                />
                <input
                  type="text"
                  value={colors[key]}
                  onChange={(e) => setColor(key, normalizeHex(e.target.value))}
                  placeholder="#000000"
                  className="focus:ring-primary focus:border-primary block w-full shadow-xs sm:text-sm border-primary rounded-md font-mono"
                />
              </div>
            </div>
          ))}
        </div>

        {result?.type === "error" && (
          <ul className="mb-4 list-disc list-inside text-sm text-secondary">
            {result.messages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}

        {result?.type === "success" && (
          <p className="mb-4 text-sm font-semibold text-primary">
            Saved “{result.name}”! It’s now available in the theme picker.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center rounded-md bg-background px-4 py-2 text-sm font-semibold text-primary hover:text-background hover:bg-primary border border-primary disabled:cursor-not-allowed disabled:text-background disabled:bg-primary"
        >
          {isPending ? <Loader /> : "Save theme"}
        </button>
      </form>
    </div>
  );
}

export default function AddThemePage() {
  return (
    <Suspense fallback={<Loader />}>
      <AddThemeForm />
    </Suspense>
  );
}
