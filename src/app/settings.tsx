"use client";
import * as React from "react";
import { ColorSchemeSelector } from "@/components/colorSchemeSelector";
import { ImagePresetSelector } from "@/components/imagePresetSelector";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ColorScheme } from "@/app/common";
import { useColorScheme } from "@/hooks/useColorScheme";
import { updateSettings } from "./actions/updateSettings";
import { DownloadButton } from "@/components/downloadButton";

type SettingsProps = {
  initialSettings: {
    colorScheme: ColorScheme | null;
    border: boolean;
  };
};

export function Settings({ initialSettings }: SettingsProps) {
  const { colorScheme, border } = initialSettings;
  const [open, setOpen] = React.useState(false);
  const { handleChange } = useColorScheme(initialSettings.colorScheme);

  const setSelected = (newColorScheme: string) => {
    handleChange(newColorScheme as ColorScheme);
  };

  const handleSettingChange = async ({
    field,
    value,
  }: {
    field: string;
    value: any;
  }) => {
    console.log("updateSettings", { field, value });
    await updateSettings({ field, value });
  };

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
                <Dialog.Panel className="relative transform rounded-lg bg-background px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
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
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-1 border-primary sm:mx-0 sm:h-10 sm:w-10">
                      <AdjustmentsHorizontalIcon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div> */}
                    <div className="mt-3 text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-primary"
                      >
                        {/* Customize */}
                      </Dialog.Title>
                      <div className="mt-2">
                        <>
                          <label className="text-primary">Theme</label>
                          <ColorSchemeSelector
                            value={colorScheme}
                            onChange={setSelected}
                          />
                        </>
                        <br />
                        <>
                          <label className="text-primary">
                            Image Dimensions
                          </label>
                          <ImagePresetSelector
                            value={{
                              height: 100,
                              width: 100,
                            }}
                            onChange={setSelected}
                          />
                        </>
                        <br />
                        <>
                          <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                              <input
                                id="border"
                                aria-describedby="border-description"
                                name="border"
                                type="checkbox"
                                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                                checked={border}
                                onChange={(e) =>
                                  handleSettingChange({
                                    field: "border",
                                    value: e.target.checked,
                                  })
                                }
                              />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                              <label
                                htmlFor="border"
                                className="font-medium text-primary"
                              >
                                Enable Border
                              </label>
                            </div>
                          </div>
                        </>
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
