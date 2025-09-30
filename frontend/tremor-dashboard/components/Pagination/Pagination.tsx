import { memo } from "react";

// Hooks
import usePagination, { DOTS } from "@/hooks/usePagination";

// Helpers
import { cn } from "@/helpers";

// Icons
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import { RxDotsHorizontal } from "react-icons/rx";

// Components
import { Text } from "@tremor/react";
import { Button } from "..";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onClickNextButton = () => {
    onPageChange(currentPage + 1);
  };

  const onClickPreviousButton = () => {
    onPageChange(currentPage - 1);
  };

  const paginationRangeLength = paginationRange.length;
  const showItemsPagination = paginationRangeLength > 1;
  const lastPage = paginationRange[paginationRangeLength - 1];
  const firstItemCurrentPage = currentPage * pageSize - pageSize + 1;
  const lastItemCurrentPage =
    currentPage * pageSize >= totalCount ? totalCount : currentPage * pageSize;
  const totalItems = totalCount < pageSize ? pageSize : lastItemCurrentPage;
  return (
    <div className="antialiased font-primary flex gap-5 flex-col md:flex-row items-start w-full justify-between p-6">
      <div className="flex w-full py-2">
        <Text className="text-tertiary dark:text-secondary">
          Showing&nbsp;
          <span className="font-normal">{firstItemCurrentPage}</span>
          &nbsp;to&nbsp;
          <span className="font-normal">{totalItems}</span>&nbsp;of&nbsp;
          <span className="font-normal">{totalCount}</span> entries
        </Text>
      </div>

      {showItemsPagination && (
        <div className="w-full flex gap-2 justify-center md:justify-end items-center md:m-0">
          <Button
            variant={VARIANT_BUTTON.DARK}
            additionalClass={`dark:hover:border-gray-300 dark:border-greyish dark:hover:bg-grayish ${
              currentPage === 1 ? "hidden" : ""
            }`}
            aria-label="Previous page button"
            data-testid="prev-page-button"
            onClick={onClickPreviousButton}
            disabled={currentPage === 1}>
            <HiMiniChevronLeft className="text-tertiary dark:text-secondary" />
          </Button>

          {paginationRange.map((pageNumber, index) => {
            const isActivePage = currentPage === pageNumber;
            const baseClasses = "dark:hover:bg-grayish";
            const paginationClasses = cn(baseClasses, {
              "dark:border-greyish dark:hover:border-greyish text-tertiary":
                !isActivePage,
            });

            if (pageNumber === DOTS) {
              return (
                <RxDotsHorizontal
                  className="text-tertiary dark:text-secondary"
                  key={`${index}-${pageNumber}`}
                />
              );
            }

            return (
              <Button
                additionalClass={paginationClasses}
                variant={
                  isActivePage ? VARIANT_BUTTON.ACTIVE : VARIANT_BUTTON.DARK
                }
                aria-label={"Page button " + pageNumber}
                key={`${index}-${pageNumber}`}
                disabled={currentPage === pageNumber}
                onClick={() => onPageChange(pageNumber as number)}>
                {pageNumber}
              </Button>
            );
          })}

          <Button
            variant={VARIANT_BUTTON.DARK}
            additionalClass={`dark:hover:border-gray-300 dark:border-greyish dark:hover:bg-grayish ${
              currentPage === lastPage ? "hidden" : ""
            }`}
            aria-label="Next page button"
            data-testid="next-page-button"
            onClick={onClickNextButton}
            disabled={currentPage === lastPage}>
            <HiMiniChevronRight className="text-tertiary dark:text-secondary" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(Pagination);
