"use client";

import { RefObject, memo, useCallback, useState } from "react";

// Types
import { OptionType } from "@/types";

// Components
import { Button } from "@/components";
import { RiArrowDropDownLine } from "react-icons/ri";

// Constants
import { VARIANT_BUTTON } from "@/constants";

// Hooks
import useOutsideClick from "@/hooks/useOutsideClick";

// Helpers
import { cn } from "@/helpers";

export interface SelectOptionProps {
  title: string;
  className?: string;
  data: OptionType[];
  value?: OptionType;
  onSelectItem: (option: string, value: string) => void;
  onSelectRemove: () => void;
}

const SelectOption = ({
  data,
  title,
  className = "max-w-[220px]",
  value: initial,
  onSelectItem,
  onSelectRemove,
}: SelectOptionProps) => {
  const [isShowOptions, setIsShowOptions] = useState(false);

  const selectRef = useOutsideClick(() => {
    setIsShowOptions(false);
  });

  const handleSelectItem = (option: string, value: string) => () => {
    onSelectItem(option, value);
    setIsShowOptions(false);
  };

  const handleShowOptionsList = useCallback(
    () => setIsShowOptions(prev => !prev),
    [],
  );

  return (
    <div
      data-testid="list-option"
      ref={selectRef as RefObject<HTMLDivElement>}
      className={cn("w-fit p-2 rounded-md dark:bg-transparent", className)}>
      <Button
        icon={RiArrowDropDownLine}
        iconPosition="right"
        variant={VARIANT_BUTTON.SECONDARY_SHADOW}
        variantTremor={VARIANT_BUTTON.SECONDARY}
        additionalClass="float-end py-[9px] px-[26px] font-bold bg-transparent border-primary hover:text-light dark:hover:text-light focus:border-primary hover:border-primary text-primary focus:text-white dark:text-white hover:bg-transparent focus:bg-primary rounded-lg dark:border-primary dark:bg-transparent dark:hover:border-primary dark:hover:bg-transparent dark:focus:bg-dark-secondary"
        onClick={handleShowOptionsList}
        data-testid="toggle-select">
        {initial ? `${title}: ${initial.option}` : "Filters"}
      </Button>

      {isShowOptions && (
        <ul className="float-end shadow-tremor-cardImage dark:shadow-select-option p-2 bg-secondary dark:bg-dark-tremor-primary w-[176px] rounded-md">
          {data.map(({ option, value }, index) => {
            const isDisableItemSelect = initial?.option === option;
            const styleItemSelectOption = isDisableItemSelect
              ? "dark:bg-primary dark:hover:bg-primary bg-select dark:text-white dark:hover:text-lighter hover:bg-select text-primary hover:text-secondary opacity-100"
              : "bg-transparent";

            return (
              <li key={option}>
                <Button
                  onClick={handleSelectItem(option, value)}
                  variantTremor={VARIANT_BUTTON.LIGHT}
                  data-testid={`select-item-${index}`}
                  additionalClass={`w-full justify-start px-4 py-[0.3rem] my-[2px] text-tremor-default cursor-pointer text-primary hover:text-secondary hover:bg-select hover:rounded-md min-h-[auto] dark:text-dark-romance dark:hover:bg-primary dark:text-white dark:hover:text-lighter rounded-md ${styleItemSelectOption}`}
                  disabled={isDisableItemSelect}>
                  {`${title}: ${option}`}
                </Button>
              </li>
            );
          })}
          <li>
            <div className="h-px bg-gradient-select my-2 opacity-25 dark:bg-gradient-divider" />
            <Button
              data-testid="remove-filter"
              additionalClass={`w-full text-tremor-default hover:text-attention justify-start text-attention dark:text-attention dark:hover:text-attention px-4 py-[0.3rem] hover:bg-select hover:rounded-md min-h-[auto] dark:hover:bg-primary text-left rounded-md opacity-100 ${
                !initial ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={onSelectRemove}
              variantTremor={VARIANT_BUTTON.LIGHT}
              disabled={!initial}>
              Remove Filter
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default memo(SelectOption);
