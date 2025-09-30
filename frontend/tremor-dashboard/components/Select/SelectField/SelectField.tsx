"use client";

import { Select, SelectItem, Text } from "@tremor/react";

// Types
import { OptionType } from "@/types";

interface SelectFieldProps {
  options: OptionType[];
  label?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  errorMessage?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const SelectField = ({
  options,
  label = "",
  disabled = false,
  value,
  placeholder = "Select...",
  defaultValue = "",
  name,
  errorMessage = "",
  onChange,
  required = false,
  ...props
}: SelectFieldProps) => {
  const classNameLabel = required
    ? "text-grey text-sm dark:text-lighter capitalize after:content-['*'] after:text-red-500 after:text-md"
    : "text-grey text-sm dark:text-lighter capitalize";

  return (
    <div className="w-full">
      {label && <label className={classNameLabel}>{label}</label>}
      <Select
        className="select-custom text-grey dark:text-white dark:border-light dark:focus:border-white"
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        enableClear={false}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={name}
        {...props}>
        {options.map((item: OptionType) => (
          <SelectItem
            key={item.value}
            value={item.value.toString()}
            data-testid="select-option"
            className="cursor-pointer">
            {item.option}
          </SelectItem>
        ))}
      </Select>
      {errorMessage && (
        <Text className="text-xs text-red-500 dark:text-red-500">
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default SelectField;
