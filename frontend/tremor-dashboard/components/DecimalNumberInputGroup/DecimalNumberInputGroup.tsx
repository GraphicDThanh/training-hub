import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  memo,
  forwardRef,
} from "react";
import { Flex, Text } from "@tremor/react";

// Utils
import { formatAmountNumber, isNaNFormat } from "@/helpers";

interface DecimalNumberInputGroupProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  errorMessage?: string;
  onChangeCurrencyInput: (value?: string) => void;
}

const DecimalNumberInputGroup = forwardRef<
  HTMLInputElement,
  DecimalNumberInputGroupProps
>(
  (
    {
      icon = "",
      label = "",
      errorMessage = "",
      onChangeCurrencyInput,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value: string = event.target.value;

      if (isNaNFormat(value)) {
        event.preventDefault();
      }

      // Remove non-numeric characters and leading zeros
      const sanitizedValue = formatAmountNumber(value);

      onChangeCurrencyInput(sanitizedValue);
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 px-2 py-4 border-solid border-tremor-default border-2 rounded-lg dark:bg-dark-tremor-background dark:border-none">
          <Text className="ml-4">{label}</Text>
          <Flex className="ml-3 pr-4 relative">
            {icon && (
              <span className="absolute text-light dark:text-white text-xl">
                {icon}
              </span>
            )}
            <input
              ref={ref}
              placeholder="0.00"
              className="w-full p-2 rounded-lg pl-6 pr-4 text-md text-light bg-transparent border-none focus:bg-tremor-background-muted focus:outline-none focus:ring-0 focus:border-gray-600 dark:text-white dark:border-gray-600 dark:focus:border-gray-500 dark:focus:bg-dark-tremor-background-muted"
              onChange={handleChange}
              {...props}
            />
          </Flex>
        </div>
        {errorMessage && (
          <Text className="text-xs text-red-500 dark:text-red-500">
            {errorMessage}
          </Text>
        )}
      </div>
    );
  },
);

DecimalNumberInputGroup.displayName = "DecimalNumberInputGroup";

export default memo(DecimalNumberInputGroup);
