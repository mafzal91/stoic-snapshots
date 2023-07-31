"use client";
import * as React from "react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ImagePresets } from "@/app/common";
import { convertHyphenatedToTitleCase } from "@/utilities/convert-hyphenated-to-title";

type ImageDimensions = { width: number; height: number };

const imageDimensions: (ImageDimensions & { name: string })[] = [
  { name: ImagePresets.Screen, width: 1920, height: 1080 },
  { name: ImagePresets.InstagramSquare, width: 1080, height: 1080 },
  { name: ImagePresets.InstagramPortrait, width: 1080, height: 1350 },
  { name: ImagePresets.InstagramLandscape, width: 1080, height: 566 },
  { name: ImagePresets.InstagramStory, width: 1080, height: 1920 },
  { name: ImagePresets.FacebookStandard, width: 1200, height: 628 },
  { name: ImagePresets.TwitterStandard, width: 600, height: 335 },
  { name: ImagePresets.LinkedInStandard, width: 1200, height: 627 },
  { name: ImagePresets.TumblrStandard, width: 500, height: 750 },
];

export function ImagePresetSelector({
  value,
  onChange,
}: {
  value: ImageDimensions;
  onChange: (value: string) => void;
}) {
  const selected: string =
    imageDimensions.find((dimensions) => {
      return (
        value.height === dimensions.height && value.width === dimensions.width
      );
    })?.name ?? ImagePresets.Custom;

  return (
    <Listbox value={selected} onChange={onChange}>
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
            <span className="block truncate">
              {convertHyphenatedToTitleCase(selected)}
            </span>
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
              {imageDimensions.map((dimensions) => (
                <Listbox.Option
                  key={dimensions.name}
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      active ? "bg-primary text-background" : "text-primary",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={dimensions.name}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {convertHyphenatedToTitleCase(dimensions.name)}
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
