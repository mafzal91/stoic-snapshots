import React from "react";
import { DropdownSelector } from "@/components/dropdownSelector";
import { BorderStyle } from "@/app/common";

type BorderSelectorProps = {
  value: BorderStyle;
  onChange: (value: BorderStyle) => void;
};

const BORDER_STYLE_OPTIONS = [
  { name: "Corners", value: BorderStyle.Corners },
  { name: "Brackets", value: BorderStyle.Brackets },
  { name: "Diamonds", value: BorderStyle.Diamonds },
  { name: "Sparkles", value: BorderStyle.Sparkles },
  { name: "Art Deco", value: BorderStyle.ArtDeco },
  { name: "NYC Subway", value: BorderStyle.NYCSubway },
  { name: "NYC Subway Thin", value: BorderStyle.NYCSubwayThin },
  { name: "NYC Subway 3 Rows", value: BorderStyle.NYCSubwayThreeRows },
  { name: "Greek Key", value: BorderStyle.GreekKey },
  { name: "Bookplate", value: BorderStyle.Bookplate },
  { name: "Architectural", value: BorderStyle.Architectural },
  { name: "Postage Stamp", value: BorderStyle.PostageStamp },
  { name: "Roman Mosaic", value: BorderStyle.RomanMosaic },
  { name: "Letterpress", value: BorderStyle.Letterpress },
  { name: "None", value: BorderStyle.None },
];

export const BorderSelector: React.FC<BorderSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <label htmlFor="borderStyle" className="text-primary">
        Border Style
      </label>
      <DropdownSelector
        options={BORDER_STYLE_OPTIONS}
        value={value}
        onChange={(value: string) => onChange(value as BorderStyle)}
      />
    </>
  );
};
