import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { type ChangeEventHandler, Fragment, useEffect, useState } from "react";

export default function MultiSelect({
  name,
  label,
  defaultValues = [],
  options,
  onChange,
  required = false,
}: {
  name: string;
  label: string;
  defaultValues: { id: string; label: string; name: string }[];
  options: { id: string | number; label: string; name: string }[];
  onChange: (event: { target: any; type?: any }) => Promise<void | boolean>;
  required?: boolean;
}) {
  const [selectedItems, setSelectedItems] = useState(defaultValues);
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    onChange({
      target: {
        value: selectedItems.map(({ id }) => id),
        name: name,
      },
    });
  }, [selectedItems]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
          {required && <span className="text-red-700 ml-1.5">*</span>}
        </label>
        <Combobox value={selectedItems} onChange={setSelectedItems} multiple>
          <div className="relative mt-1">
            <div className="">
              <ComboboxInput<{ label: string; name: string }[]>
                className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(options) =>
                  options.map((option) => option.name).join(", ")
                }
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nu am găsit niciun domeniu similar.
                  </div>
                ) : (
                  filteredPeople.map((option) => (
                    <ComboboxOption
                      key={option.id}
                      className={({ selected }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          selected ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ focus, selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              focus ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                selected ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}
