"use client";
import * as React from "react";
import { ColorSchemeSelector } from "@/components/colorSchemeSelector";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ColorScheme } from "@/app/common";
import { useColorScheme } from "@/hooks/useColorScheme";

export function Settings({
  initialColorScheme,
}: {
  initialColorScheme: ColorScheme | null;
}) {
  useColorScheme(initialColorScheme);
  const [open, setOpen] = React.useState(false);

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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-1 border-primary sm:mx-0 sm:h-10 sm:w-10">
                      <AdjustmentsHorizontalIcon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div> */}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-primary"
                      >
                        {/* Customize */}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="w-full max-w-[12rem]">
                          <label className="text-primary">Theme</label>
                          <ColorSchemeSelector value={initialColorScheme} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-primary hover:text-background hover:bg-primary border-[1px] border-primary sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
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