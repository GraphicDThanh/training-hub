"use client";

import { memo } from "react";

// Components
import { HeaderCellContents } from "@/components";
import { TableHead, TableHeaderCell, TableRow } from "@tremor/react";

// Types
import { ColumnType } from "@/types";

interface DataTableHeaderProps<T> {
  columns: ColumnType<T>[];
  onSort: (key: string) => void;
  sortField?: string;
  sortType?: string;
}

const DataGridHeader = <T,>({
  columns,
  onSort,
  sortField = "",
  sortType = "",
}: DataTableHeaderProps<T>) => (
  <TableHead>
    <TableRow>
      {columns.map(({ key, title, isSortable = false }) => {
        const handleClick = () => {
          isSortable && onSort(key);
        };

        return (
          <TableHeaderCell
            data-testid={`header-cell-${title}`}
            onClick={handleClick}
            key={key}
            className={`px-6 py-2 text-[10.4px] leading-[17px] dark:text-white tracking-[0.2px] font-bold uppercase ${
              isSortable ? "cursor-pointer" : "cursor-default"
            }`}>
            <HeaderCellContents
              title={title}
              keyColumn={key}
              sortField={sortField}
              sortType={sortType}
              isSortable={isSortable}
            />
          </TableHeaderCell>
        );
      })}
    </TableRow>
  </TableHead>
);

export default memo(DataGridHeader) as typeof DataGridHeader;
