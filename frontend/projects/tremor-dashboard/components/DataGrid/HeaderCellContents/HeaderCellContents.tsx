import { memo } from "react";

// Components
import { Flex } from "@tremor/react";
import { Button } from "../..";

// Icons
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

// Constants
import { VARIANT_BUTTON, DIRECTION } from "@/constants";

// Helpers
import { updateClassIconBySort } from "@/helpers";

export interface HeaderCellContentsProps {
  title: string;
  keyColumn: string;
  sortField: string;
  sortType: string;
  isSortable: boolean;
}

const HeaderCellContents = ({
  title,
  keyColumn,
  sortField,
  sortType,
  isSortable,
}: HeaderCellContentsProps) => {
  return (
    <Flex>
      <Flex className="text-primary dark:text-white print:text-primary dark:print:!text-primary">
        {title}
      </Flex>
      {isSortable && (
        <Flex flexDirection="col" className="relative ml-4 -mt-6">
          <Flex justifyContent="end" className="absolute top-0">
            <Button
              aria-label="Arrow Drop Up"
              variantTremor={VARIANT_BUTTON.LIGHT}
              variant={VARIANT_BUTTON.LIGHT_CENTER}>
              <MdArrowDropUp
                className={`w-4 h-4 text-primary dark:text-secondary ${updateClassIconBySort(
                  {
                    keyColumn,
                    sortField,
                    sortType,
                    typeOfIcon: DIRECTION.ASC,
                  },
                )}`}
              />
            </Button>
          </Flex>
          <Flex justifyContent="end" className="absolute top-1.5">
            <Button
              aria-label="Arrow Drop Down"
              variantTremor={VARIANT_BUTTON.LIGHT}
              variant={VARIANT_BUTTON.LIGHT_CENTER}>
              <MdArrowDropDown
                className={`w-4 h-4 text-primary dark:text-secondary ${updateClassIconBySort(
                  {
                    keyColumn,
                    sortField,
                    sortType,
                    typeOfIcon: DIRECTION.DESC,
                  },
                )}`}
              />
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(HeaderCellContents);
