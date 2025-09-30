"use client";

import { useCallback } from "react";

// Components
import { InputSearch } from "@/components";

import { debounce } from "@/helpers";

export interface InputDebounceProps {
  field: string;
  debounceTime?: number;
  errorMessage?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string, field: string) => void;
}

const InputDebounce = ({
  field,
  debounceTime = 1000,
  errorMessage,
  placeholder,
  value: defaultValue = "",
  onChange,
  ...otherProps
}: InputDebounceProps) => {
  const handleChange = useCallback(
    (value: string) =>
      debounce(() => onChange(value.trim(), field), debounceTime)(),
    [debounceTime, onChange, field],
  );

  return (
    <InputSearch
      value={defaultValue}
      errorMessage={errorMessage}
      placeholder={placeholder}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default InputDebounce;
