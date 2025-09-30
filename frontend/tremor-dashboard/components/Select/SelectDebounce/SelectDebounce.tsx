"use client";

import { memo, useState, forwardRef } from "react";
import {
  SearchSelect,
  SearchSelectItem,
  SearchSelectProps,
  Text,
} from "@tremor/react";

// Types
import { OptionType } from "@/types";

// Styles
import "@/styles/billing.css";
import { debounce } from "@/helpers";

interface SelectDebounceProps extends Omit<SearchSelectProps, "children"> {
  id: string;
  options: OptionType[];
  label?: string;
}

const SelectDebounce = forwardRef<HTMLInputElement, SelectDebounceProps>(
  ({ id, options, label = "", errorMessage = "", ...props }, ref) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearch = debounce((value: string = "") =>
      setSearchValue(value),
    );

    return (
      <div className="w-full flex flex-col gap-0">
        <label
          htmlFor={id}
          className="text-grey text-sm dark:text-lighter capitalize cursor-pointer">
          {label}
        </label>
        <SearchSelect
          id={id}
          ref={ref}
          className="text-grey dark:text-white dark:border-light dark:focus:border-white"
          searchValue={searchValue}
          enableClear={true}
          onSearchValueChange={handleSearch}
          {...props}>
          {options.map(({ value, option }: OptionType) => (
            <SearchSelectItem
              key={value}
              value={value}
              className="cursor-pointer"
              data-testid="select-option">
              {option}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        {errorMessage && (
          <Text className="text-xs text-red-500 dark:text-red-500">
            {errorMessage}
          </Text>
        )}
      </div>
    );
  },
);

SelectDebounce.displayName = "SelectDebounce";

export default memo(SelectDebounce);
