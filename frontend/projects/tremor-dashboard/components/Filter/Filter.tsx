"use client";

import { useCallback, useMemo } from "react";

// Components
import { SelectOption } from "@/components";

// Types
import { OptionType } from "@/types";

export interface FilterProps {
  field: string;
  value?: string;
  title: string;
  listOption: OptionType[];
  onFilterChange: (value: string, field: string) => void;
}

// Currently, It only support one filed
const Filter = ({
  field,
  value: initial = "",
  title,
  listOption,
  onFilterChange,
}: FilterProps) => {
  const handleSelectFilter = useCallback(
    (option: string) => {
      onFilterChange(option, field);
    },
    [field, onFilterChange],
  );

  const handleRemoveFilter = useCallback(() => {
    onFilterChange("", field);
  }, [field, onFilterChange]);

  const filterValue = useMemo(
    () => listOption.find(({ option }) => option === initial),
    [initial, listOption],
  );

  return (
    <div className="absolute z-10 right-0 top-0">
      <SelectOption
        title={title}
        data={listOption}
        onSelectItem={handleSelectFilter}
        onSelectRemove={handleRemoveFilter}
        value={filterValue}
      />
    </div>
  );
};

export default Filter;
