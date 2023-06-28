"use client";
import * as React from "react";
import clsx from "clsx";
import { useIsMounted, useUpdateEffect } from "usehooks-ts";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ColorScheme } from "@/app/common";

type scheme = {
  id: ColorScheme;
  name: string;
};

const schemes = [
  { id: ColorScheme.Light, name: "Light" },
  { id: ColorScheme.Dark, name: "Dark" },
  { id: ColorScheme.RusticSunrise, name: "Rustic Sunrise" },
  { id: ColorScheme.RusticSunset, name: "Rustic Sunset" },
  { id: ColorScheme.SoftWhisper, name: "Soft Whisper" },
  { id: ColorScheme.ShadowedEmbrace, name: "Shadowed Embrace" },
  { id: ColorScheme.CelestialDelight, name: "Celestial Delight" },
  { id: ColorScheme.DuskSerenade, name: "Dusk Serenade" },
  { id: ColorScheme.DeepPlum, name: "Deep Plum" },
  { id: ColorScheme.NightfallNoir, name: "Nightfall Noir" },
  { id: ColorScheme.PeachesAndCream, name: "Peaches and Cream" },
  { id: ColorScheme.TerraCottaDreams, name: "Terra Cotta Dreams" },
];

export function SelectMenu({ value }: { value: ColorScheme | null }) {
  const { colorScheme, handleChange } = useColorScheme(value);

  const selected = schemes.find((scheme) => scheme.id === colorScheme)!;

  const setSelected = (newColorScheme: scheme) => {
    handleChange(newColorScheme.id);
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }: { open: boolean }) => (
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-primary sm:text-sm sm:leading-6",
              "ring-1 ring-inset ring-primary",
              "focus:outline-none focus:ring-1 focus:ring-primary",
              "w-full"
            )}
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              id="list"
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background text-base shadow-sm ring-1 ring-primary focus:outline-none sm:text-sm"
            >
              {schemes.map((scheme) => (
                <Listbox.Option
                  key={scheme.id}
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      active ? "bg-primary text-background" : "text-primary",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={scheme}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {scheme.name}
                      </span>

                      {selected ? (
                        <span
                          className={clsx(
                            active ? "text-background" : "text-primary",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
