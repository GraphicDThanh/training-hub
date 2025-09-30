"use client";

import { ChangeEvent, useState } from "react";

// Themes
import { spacing } from "@/themes";

// Components
import { Flex, TextInput } from "@tremor/react";
import { ErrorMessage } from "@/components";
import { MdClose } from "react-icons/md";

export interface InputSearchProps {
  value: string;
  errorMessage?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputSearch = ({
  value,
  errorMessage,
  placeholder,
  onChange,
  ...otherProps
}: InputSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>(value.trim());

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ?? "";
    setSearchValue(value);
    onChange(value);
  };

  const resetSearch = () => {
    setSearchValue("");
    onChange("");
  };

  const elementSearch = () => (
    <Flex
      justifyContent="end"
      className={`p-6 relative ${errorMessage ? "pb-2" : ""}`}>
      <TextInput
        id="search_order"
        className="w-auto min-w-[185px] dark:bg-transparent dark:border-white ring-0"
        onChange={handleSearch}
        placeholder={placeholder ?? "Search..."}
        value={searchValue}
        style={{
          paddingRight: spacing["4"],
        }}
        {...otherProps}
      />
      {searchValue && (
        <MdClose
          data-testid="close-button"
          onClick={resetSearch}
          className="text-xs text-white bg-black dark:text-black dark:bg-white absolute right-8 p-[2px] cursor-pointer rounded-full z-[1]"
        />
      )}
    </Flex>
  );

  return (
    <>
      {errorMessage ? (
        <Flex flexDirection="col" alignItems="end" className="relative">
          {elementSearch()}
          <ErrorMessage
            errorMessage={errorMessage}
            className={"w-[233px] pr-6 pb-6"}
          />
        </Flex>
      ) : (
        elementSearch()
      )}
    </>
  );
};

export default InputSearch;
