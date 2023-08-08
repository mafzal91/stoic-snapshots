"use client";
import * as React from "react";
import { DropdownSelector } from "./dropdownSelector";
import { imageDimensions } from "@/utilities/constants";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";

export function ImagePresetSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const options = imageDimensions.map((preset) => ({
    name: convertHyphenatedToTitleCase(preset.name),
    value: preset.name,
  }));

  return (
    <div>
      <label className="text-primary">Image Dimensions</label>
      <DropdownSelector options={options} value={value} onChange={onChange} />
    </div>
  );
}
