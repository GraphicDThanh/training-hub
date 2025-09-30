import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsExclamationLg } from "react-icons/bs";

// Components
import { Flex } from "@tremor/react";
import { memo, useCallback } from "react";

interface StatusButtonProps {
  extendedClass: string;
  value: string;
}

const ChipStatus = ({ extendedClass, value }: StatusButtonProps) => {
  const renderIcon = useCallback(() => {
    if (value === "Pending") return <BsExclamationLg />;
    if (value.includes("+")) return <BiChevronUp />;

    return <BiChevronDown />;
  }, [value]);

  return (
    <Flex
      justifyContent="center"
      className={`shrink-0 w-9 h-9 border rounded-full ${extendedClass}`}>
      {renderIcon()}
    </Flex>
  );
};

export default memo(ChipStatus);
