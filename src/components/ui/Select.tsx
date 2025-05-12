import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryList } from "../../data";
import { ICategoryList } from "../../interface";

interface IProps {
  selected: ICategoryList;
  setSelected: (category: ICategoryList) => void;
}

export default function Select({ selected, setSelected }: IProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="space-y-1">
          <Label className="block text-sm font-medium text-gray-700">
            Category
          </Label>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <img
                  src={selected.imageURL}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListboxOptions
                    static
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {CategoryList.map((category) => (
                      <ListboxOption
                        key={category.id}
                        value={category}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-100 text-indigo-900"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={category.imageURL}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={`ml-3 block truncate ${
                                  selected ? "font-semibold" : "font-normal"
                                }`}
                              >
                                {category.name}
                              </span>
                            </div>

                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Listbox>
  );
}
