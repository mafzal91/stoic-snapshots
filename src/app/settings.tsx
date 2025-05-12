"use client";
import * as React from "react";
import { ColorSchemeSelector } from "@/components/colorSchemeSelector";
import { ImagePresetSelector } from "@/components/imagePresetSelector";
import { BorderSelector } from "@/components/borderSelector";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ColorScheme, ImagePresets } from "@/app/common";
import { useColorScheme } from "@/hooks/useColorScheme";
import { updateSettings } from "./actions/updateSettings";
import { DownloadButton } from "@/components/downloadButton";
import { Modal } from "@/components/modal";

type SettingsProps = {
  initialSettings: {
    colorScheme: ColorScheme | null;
    imagePreset: ImagePresets;
    border: boolean;
    likedThemes: Record<string, boolean>;
  };
};

export function Settings({ initialSettings }: SettingsProps) {
  const [open, setOpen] = React.useState(false);
  const [imagePreset, setImagePreset] = React.useState<string>(
    initialSettings.imagePreset || ImagePresets.Screen
  );
  const [border, setBorder] = React.useState<boolean>(
    initialSettings.border ?? true
  );
  const { colorScheme, handleChange } = useColorScheme(
    initialSettings.colorScheme
  );
  const likedTheme = initialSettings?.likedThemes[colorScheme] ?? false;

  const setSelected = (newColorScheme: string) => {
    handleChange(newColorScheme as ColorScheme);
  };

  const saveSettingChange = async ({
    field,
    value,
  }: {
    field: string;
    value: any;
  }) => {
    await updateSettings({ field, value });
  };

  const handleImagePresetChange = async (value: string) => {
    await saveSettingChange({ field: "imagePreset", value });
    if (value === ImagePresets.Screen) {
      await saveSettingChange({ field: "width", value: window.screen.width });
      await saveSettingChange({ field: "height", value: window.screen.height });
    }
    setImagePreset(value);
  };
  const handleBorderChange = async (value: boolean) => {
    await saveSettingChange({ field: "border", value });
    setBorder(value);
  };

  React.useEffect(() => {
    async function updateDimensions() {
      await saveSettingChange({ field: "width", value: window.screen.width });
      await saveSettingChange({
        field: "height",
        value: window.screen.height,
      });
    }
    if (imagePreset === ImagePresets.Screen) {
      updateDimensions();
    }
  }, [imagePreset]);

  return (
    <>
      <button
        aria-label="settings"
        className="p-1 rounded-md text-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
        onClick={() => setOpen(true)}
      >
        <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Settings"
        description="Customize page & export settings"
      >
        <div className="mt-2">
          <ColorSchemeSelector
            value={colorScheme}
            onChange={setSelected}
            isLiked={likedTheme ?? false}
          />
          <br />
          <ImagePresetSelector
            value={imagePreset}
            onChange={handleImagePresetChange}
          />
          <br />
          <BorderSelector value={border} onChange={handleBorderChange} />
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <DownloadButton>Get Image</DownloadButton>
        </div>
      </Modal>
    </>
  );
}
