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
import { ICategoryList } from "../../interface";

interface IProps {
  selected: ICategoryList | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: (value: any) => void;
  data: ICategoryList[] | string[];
  label?: string;
}

export default function Select({ selected, setSelected, data, label = "Category" }: IProps) {
  const isCategory = typeof selected !== 'string';

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="space-y-2">
          <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            {label}
          </Label>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-pointer rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3.5 pl-4 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 hover:border-indigo-500 dark:hover:border-indigo-400 group">
              <span className="flex items-center">
                {isCategory && (
                  <div className="h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-colors">
                    <img
                      src={(selected as ICategoryList).imageURL}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span className={`${isCategory ? 'ml-3' : ''} block truncate text-gray-800 dark:text-gray-100 font-medium text-[15px]`}>
                  {isCategory ? (selected as ICategoryList).name : selected}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
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
                  <ListboxOptions className="absolute z-10 mt-2 max-h-[280px] w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-2 text-base shadow-lg ring-1 ring-black/5 dark:ring-white/5 focus:outline-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {data.map((item, index) => (
                      <ListboxOption
                        key={index}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-3.5 pl-4 pr-10 transition-all duration-200 ${
                            active
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                              : "text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          }`
                        }
                        value={item}
                      >
                        {({ selected: isSelected, active }) => (
                          <div className="flex items-center">
                            {isCategory && (
                              <div className={`h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                                active || isSelected
                                  ? "border-indigo-500 dark:border-indigo-400"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}>
                                <img
                                  src={(item as ICategoryList).imageURL}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <span
                              className={`${isCategory ? 'ml-3' : ''} block truncate text-[15px] ${
                                isSelected ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {typeof item === 'string' ? item : item.name}
                            </span>
                            {isSelected && (
                              <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? "text-indigo-600 dark:text-indigo-400" : "text-indigo-500 dark:text-indigo-300"
                              }`}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </div>
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
