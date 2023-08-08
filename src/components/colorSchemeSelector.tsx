"use client";
import * as React from "react";
import { ColorScheme } from "@/app/common";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";
import { DropdownSelector } from "@/components/dropdownSelector";

const schemes = Object.values(ColorScheme).filter(
  (scheme) => scheme !== "system"
);

export function ColorSchemeSelector({
  value,
  onChange,
}: {
  value: ColorScheme;
  onChange: (value: string) => void;
}) {
  const options = schemes.map((scheme) => ({
    name: convertHyphenatedToTitleCase(scheme),
    value: scheme,
  }));

  return (
    <>
      <label className="text-primary">Theme</label>
      <DropdownSelector options={options} value={value} onChange={onChange} />
    </>
  );
}
