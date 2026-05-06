"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

function ThemePreviewInjector() {
  const params = useSearchParams();
  const bg = params.get("bg");
  const accent = params.get("accent");
  const primary = params.get("primary");
  const secondary = params.get("secondary");

  const isPreview = bg && accent && primary && secondary;

  useEffect(() => {
    if (!isPreview) return;
    const html = document.documentElement;
    const original = html.getAttribute("data-theme");
    html.setAttribute("data-theme", "preview");
    return () => {
      if (original) html.setAttribute("data-theme", original);
      else html.removeAttribute("data-theme");
    };
  }, [isPreview]);

  if (!isPreview) return null;

  const css = `[data-theme="preview"]{--color-background:#${bg};--color-accent:#${accent};--color-primary:#${primary};--color-secondary:#${secondary};}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export function ThemePreview() {
  return (
    <Suspense>
      <ThemePreviewInjector />
    </Suspense>
  );
}
