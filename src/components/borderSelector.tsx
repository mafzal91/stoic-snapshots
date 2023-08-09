import React from "react";
import { DropdownSelector } from "@/components/dropdownSelector";

type BorderSelectorProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const BorderSelector: React.FC<BorderSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <label htmlFor="border" className="text-primary">
        Enable Border
      </label>
      <DropdownSelector
        options={[
          { name: "Enabled", value: "true" },
          { name: "Disabled", value: "false" },
        ]}
        value={value ? "true" : "false"}
        onChange={(value: string) => onChange(value === "true")}
      />
    </>
  );
};
