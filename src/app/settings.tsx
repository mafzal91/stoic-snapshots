"use client";
import * as React from "react";
import { ColorSchemeSelector } from "@/components/colorSchemeSelector";
import { ImagePresetSelector } from "@/components/imagePresetSelector";
import { BorderSelector } from "@/components/borderSelector";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { BorderStyle, ImagePresets } from "@/app/common";
import { ThemeColors } from "@/app/themes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { updateSettings } from "./actions/updateSettings";
import { DownloadButton } from "@/components/downloadButton";
import { Modal } from "@/components/modal";

type SettingsProps = {
  children: React.ReactNode;
  initialSettings: {
    colorScheme: string | null;
    imagePreset: ImagePresets;
    borderStyle: BorderStyle;
    likedThemes: Record<string, boolean>;
  };
  themes: Record<string, ThemeColors>;
};

const OpenSettingsContext = React.createContext<{
  openSettings: () => void;
  registerTrigger: (node: HTMLButtonElement | null) => void;
} | null>(null);

export function SettingsButton() {
  const settings = React.useContext(OpenSettingsContext);

  if (!settings) {
    throw new Error("SettingsButton must be rendered inside Settings");
  }
  const { openSettings, registerTrigger } = settings;

  return (
    <button
      ref={registerTrigger}
      aria-label="settings"
      className="p-1 rounded-md text-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
      onClick={openSettings}
    >
      <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}

export function Settings({ children, initialSettings, themes }: SettingsProps) {
  const [open, setOpen] = React.useState(false);
  const openSettings = React.useCallback(() => setOpen(true), []);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const registerTrigger = React.useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node;
  }, []);
  const [imagePreset, setImagePreset] = React.useState<string>(
    initialSettings.imagePreset || ImagePresets.Screen
  );
  const [borderStyle, setBorderStyle] = React.useState<BorderStyle>(
    initialSettings.borderStyle ?? BorderStyle.Corners
  );
  const validThemeNames = React.useMemo(
    () => new Set(Object.keys(themes)),
    [themes]
  );
  const { colorScheme, handleChange } = useColorScheme(
    initialSettings.colorScheme,
    validThemeNames,
  );
  const likedTheme = initialSettings?.likedThemes[colorScheme] ?? false;

  const setSelected = (newColorScheme: string) => {
    handleChange(newColorScheme);
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
  const handleBorderStyleChange = async (value: BorderStyle) => {
    await saveSettingChange({ field: "borderStyle", value });
    setBorderStyle(value);
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
    <OpenSettingsContext.Provider value={{ openSettings, registerTrigger }}>
      {children}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Settings"
        description="Customize page & export settings"
        size="wide"
        returnFocusRef={triggerRef}
      >
        <div className="mt-5 flex min-h-0 flex-col gap-5 overflow-y-auto">
          <div className="grid shrink-0 gap-5 sm:grid-cols-2">
            <div className="min-w-0">
              <ColorSchemeSelector
                value={colorScheme}
                onChange={setSelected}
                isLiked={likedTheme ?? false}
                themes={themes}
              />
            </div>
            <div className="min-w-0">
              <ImagePresetSelector
                value={imagePreset}
                onChange={handleImagePresetChange}
              />
            </div>
          </div>
          <BorderSelector
            value={borderStyle}
            onChange={handleBorderStyleChange}
          />
        </div>
        <div className="mt-5 shrink-0 sm:mt-4 sm:flex sm:flex-row-reverse">
          <DownloadButton>Get Image</DownloadButton>
        </div>
      </Modal>
    </OpenSettingsContext.Provider>
  );
}
