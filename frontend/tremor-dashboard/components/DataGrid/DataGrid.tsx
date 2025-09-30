"use client";

import isEqual from "react-fast-compare";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Hooks
import {
  ReactNode,
  Suspense,
  memo,
  useCallback,
  useMemo,
  useTransition,
} from "react";

// Constants
import { DIRECTION } from "@/constants";

// Types
import { ColumnType, OptionType } from "@/types";

// Components
import { Card, Table } from "@tremor/react";
import {
  DataGridBody,
  DataGridHeader,
  Filter,
  InputDebounce,
  OverlayPage,
} from "@/components";

const Pagination = dynamic(() => import("@/components/Pagination/Pagination"));

interface FilterProps {
  field: string;
  title: string;
  listOption: OptionType[];
}

interface SearchProps {
  field: string;
  param: string;
  valueParam: string;
  placeholder?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  pageSize?: number;
  className?: string;
  hasPagination?: boolean;
  total?: number;
  filter?: FilterProps;
  overlayElement?: ReactNode;
  search?: SearchProps;
}

const DataGrid = <T,>({
  data,
  columns,
  pageSize = 10,
  className = "",
  hasPagination = true,
  total,
  filter,
  overlayElement = <OverlayPage />,
  search,
}: DataTableProps<T>) => {
  const searchParams = useSearchParams() ?? "";
  const pathname = usePathname() ?? "";
  const { replace } = useRouter();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const [isPending, startTransition] = useTransition();

  const handleReplaceURL = useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, replace],
  );

  // Handle page in pagination changed
  const handlePageChange = useCallback(
    (page: number) => {
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", `${page}`);
      }

      handleReplaceURL(params);
    },
    [handleReplaceURL, params],
  );

  const handleFilterChange = useCallback(
    (value: string, option: string) => {
      value ? params.set(option, value) : params.delete(option);
      params.delete("page");
      handleReplaceURL(params);
    },
    [handleReplaceURL, params],
  );

  const handleSearchChange = useCallback(
    (value: string, field: string) => {
      if (value) {
        params.set(field, value);
        params.delete("page");
        handleReplaceURL(params);
        return;
      }

      if (params.get(field)) {
        params.delete(field);
        handleReplaceURL(params);
      }
    },
    [handleReplaceURL, params],
  );

  const handleSortingChange = useCallback(
    (key: string) => {
      params.set("sortBy", key);

      const orderByParam =
        params.get("orderBy") === DIRECTION.DESC
          ? DIRECTION.ASC
          : DIRECTION.DESC;

      params.set("orderBy", orderByParam);

      handleReplaceURL(params);
    },
    [handleReplaceURL, params],
  );

  return (
    <>
      {filter && (
        <Suspense>
          <Filter
            field={filter.field}
            value={params.get(filter.field) ?? ""}
            title={filter.title}
            listOption={filter.listOption}
            onFilterChange={handleFilterChange}
          />
        </Suspense>
      )}

      <div className="relative w-full">
        {search && (
          <InputDebounce
            field={search.field}
            placeholder={search.placeholder}
            onChange={handleSearchChange}
            value={params.get(search.field)?.trim() ?? ""}
            aria-labelledby="table"
            data-testid="test-input-debounce"
          />
        )}
        {isPending && overlayElement}
        <Card
          className={`p-0 border-none ring-0 dark:bg-dark-tremor-primary overflow-x-auto ${className}`}>
          <div className="flex flex-col items-start justify-start my-2">
            <Table className="w-full" tabIndex={0} id="table">
              <DataGridHeader columns={columns} onSort={handleSortingChange} />
              <DataGridBody columns={columns} data={data} />
            </Table>
            {hasPagination && (
              <Suspense>
                <Pagination
                  currentPage={parseInt(params.get("page") ?? "1")}
                  pageSize={pageSize}
                  totalCount={total!}
                  onPageChange={handlePageChange}
                />
              </Suspense>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default memo(DataGrid, isEqual) as typeof DataGrid;
