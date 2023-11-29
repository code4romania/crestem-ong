import {
  ChangeEventHandler,
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function MultiSelect({
  name,
  label,
  defaultValues = [],
  options,
  onChange,
}: {
  name: string;
  label: string | ReactNode;
  defaultValues: { id: number; label: string; name: string }[];
  options: { id: number; label: string; name: string }[];
  onChange: ChangeEventHandler;
}) {
  const [selectedItems, setSelectedItems] = useState(defaultValues);
  const [query, setQuery] = useState("");
  const filteredItems =
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

  function handleChange(value: { id: number; label: string; name: string; }[]): void {
    setSelectedItems(value)
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <Combobox value={selectedItems} onChange={handleChange} multiple>
          <div className="relative mt-1">
            <div className="">
              <Combobox.Input
                className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(options) =>
                  options.map((option) => option.name).join(", ")
                }
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                {filteredItems.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nu am găsit niciun domeniu similar.
                  </div>
                ) : (
                  filteredItems.map((option) => (
                    <Combobox.Option
                      key={option.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
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
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}
