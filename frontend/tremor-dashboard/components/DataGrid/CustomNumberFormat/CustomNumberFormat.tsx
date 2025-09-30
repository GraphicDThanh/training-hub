// Components
import { Text } from "@tremor/react";

// Constants
import { CURRENCY } from "@/constants";

// Helpers
import { moneyFormat } from "@/helpers";

interface CustomNumberFormatProps {
  value: number;
  className?: string;
}

const CustomNumberFormat = ({
  value,
  className = "w-[130px]",
}: CustomNumberFormatProps) => (
  <Text
    className={`text-xs text-tertiary dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] order-revenue truncate ${className}`}>
    {moneyFormat({
      value,
      currency: CURRENCY.DOLLAR,
    })}
  </Text>
);

export default CustomNumberFormat;
