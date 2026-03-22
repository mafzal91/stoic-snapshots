"use client";
import * as React from "react";
import clsx from "clsx";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type DropdownOption = {
  name: string;
  value: any;
  colors?: string[];
};

function ColorSwatches({ colors }: { colors: string[] }) {
  return (
    <span className="flex items-center shrink-0 mr-2">
      {colors.map((color, i) => (
        <span
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            backgroundColor: color,
            marginLeft: i > 0 ? -4 : 0,
            border: "1px solid rgba(128,128,128,0.2)",
            display: "inline-block",
            position: "relative",
            zIndex: colors.length - i,
          }}
        />
      ))}
    </span>
  );
}

type DropdownProps = {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
};

export function DropdownSelector({ options, value, onChange }: DropdownProps) {
  const selectedOption: DropdownOption | undefined = options.find(
    (option) => value === option.value
  );
  return (
    <Listbox value={selectedOption?.name} onChange={onChange}>
      {({ open }: { open: boolean }) => (
        <div className="relative">
          <ListboxButton
            className={clsx(
              "relative cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-primary sm:text-sm sm:leading-6",
              "ring-1 ring-inset ring-primary",
              "focus:outline-hidden focus:ring-1 focus:ring-primary",
              "w-full"
            )}
          >
            <span className="flex items-center truncate">
              {selectedOption?.colors && (
                <ColorSwatches colors={selectedOption.colors} />
              )}
              {selectedOption?.name || ""}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            show={open}
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background text-base shadow-xs ring-1 ring-primary focus:outline-hidden sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.name}
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      active ? "bg-primary text-background" : "text-primary",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? "font-semibold" : "font-normal",
                          "flex items-center truncate"
                        )}
                      >
                        {option.colors && (
                          <ColorSwatches colors={option.colors} />
                        )}
                        {option.name}
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
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
