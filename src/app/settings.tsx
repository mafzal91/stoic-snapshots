"use client";
import * as React from "react";
import { ColorSchemeSelector } from "@/components/colorSchemeSelector";
import { ImagePresetSelector } from "@/components/imagePresetSelector";
import { BorderSelector } from "@/components/borderSelector";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ColorScheme, ImagePresets } from "@/app/common";
import { useColorScheme } from "@/hooks/useColorScheme";
import { updateSettings } from "./actions/updateSettings";
import { DownloadButton } from "@/components/downloadButton";

type SettingsProps = {
  initialSettings: {
    colorScheme: ColorScheme | null;
    imagePreset: ImagePresets;
    border: boolean;
  };
};

export function Settings({ initialSettings }: SettingsProps) {
  const [open, setOpen] = React.useState(false);
  const [imagePreset, setImagePreset] = React.useState<string>(
    initialSettings.imagePreset || ImagePresets.Screen
  );
  const [border, setBorder] = React.useState<boolean>(
    initialSettings.border || true
  );
  const { colorScheme, handleChange } = useColorScheme(
    initialSettings.colorScheme
  );

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
        type="button"
        className="p-1 rounded-md text-primary focus:outline-none focus:ring-1 focus:ring-primary"
        onClick={() => setOpen(true)}
      >
        <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform  w-full rounded-lg bg-background px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:max-w-sm sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-background text-primary hover:text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div>
                    <div className="mt-3 text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-primary"
                      >
                        {/* Customize */}
                      </Dialog.Title>
                      <div className="mt-2">
                        <ColorSchemeSelector
                          value={colorScheme}
                          onChange={setSelected}
                        />
                        <br />
                        <ImagePresetSelector
                          value={imagePreset}
                          onChange={handleImagePresetChange}
                        />
                        <br />
                        <BorderSelector
                          value={border}
                          onChange={handleBorderChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <DownloadButton>Get Image</DownloadButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
