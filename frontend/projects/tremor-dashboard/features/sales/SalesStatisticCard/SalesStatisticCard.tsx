"use client";

//Libs
import { useState, RefObject } from "react";

//Components
import { Card, Text, Flex } from "@tremor/react";
import { Button } from "@/components";

//Types
import { SalesStatisticData } from "@/types";

// Hooks
import useOutsideClick from "@/hooks/useOutsideClick";

//Constants
import {
  CURRENCY,
  SALES_DATE_OPTIONS,
  SALES_STATISTIC_TYPE,
  UNIT,
  VARIANT_BUTTON,
} from "@/constants";

// Helpers
import { formatAdjustNumber, formattedNumber, moneyFormat } from "@/helpers";

interface SalesStatisticProp {
  statisticsData: SalesStatisticData;
}

const SalesStatisticCard = ({
  statisticsData,
}: SalesStatisticProp): JSX.Element => {
  const { type, amount, amountChange, duration, amountChangeType } =
    statisticsData;
  const [isOpenAction, setIsOpenAction] = useState(false);
  const [currentSalesDate, setCurrentSalesDate] = useState(
    SALES_DATE_OPTIONS[0].label,
  );
  const openActionSalesDate = isOpenAction;

  const salesCardRef = useOutsideClick(() => {
    setIsOpenAction(false);
  });

  const handleSelectSalesDate = (labelDate: string) => {
    setIsOpenAction(false);
    setCurrentSalesDate(labelDate);
  };

  const handleToggleAction = () => {
    setIsOpenAction(!isOpenAction);
  };

  const formattedAmount =
    {
      [SALES_STATISTIC_TYPE.SALES]: moneyFormat({
        value: amount,
        currency: CURRENCY.DOLLAR,
      }),
      [SALES_STATISTIC_TYPE.CUSTOMERS]: formattedNumber({
        value: amount,
        isDecimalNumber: true,
      }),
      [SALES_STATISTIC_TYPE.AVG_REVENUE]: moneyFormat({
        value: amount,
        currency: CURRENCY.DOLLAR,
      }),
    }[type] || "";

  const formattedTotalAmount =
    {
      [SALES_STATISTIC_TYPE.SALES]: formatAdjustNumber({
        value: amountChange,
        isPositive: amountChangeType,
        unit: UNIT.PERCENT,
      }),
      [SALES_STATISTIC_TYPE.CUSTOMERS]: formatAdjustNumber({
        value: amountChange,
        isPositive: amountChangeType,
        unit: UNIT.PERCENT,
      }),
      [SALES_STATISTIC_TYPE.AVG_REVENUE]: moneyFormat({
        value: amountChange,
        currency: CURRENCY.DOLLAR,
      }),
    }[type] || "";

  const totalAmountColor =
    type === SALES_STATISTIC_TYPE.AVG_REVENUE
      ? "text-purple dark:!text-greyer"
      : "text-greener dark:text-few";

  return (
    <Card
      className="dark:bg-dark-tremor-primary ring-0 max-w-full p-4 2xl:max-w-full border-none relative rounded-xl shadow-md"
      as="section">
      <Flex alignItems="start">
        <Flex className="flex-col w-2/3 md:w-1/2">
          <Flex
            alignItems="start"
            justifyContent="start"
            flexDirection="col"
            data-testid="formatted-amount">
            <Text className="text-md text-purple dark:text-dark-romance font-semibold tracking-[0.4px]">
              {type}
            </Text>
            <Text className="text-primary dark:text-dark-primary text-xl leading-[33px] font-bold w-full">
              {formattedAmount}
            </Text>
          </Flex>
        </Flex>
        <Flex
          alignItems="end"
          justifyContent="end"
          data-testid="toggle-action-sale"
          className="w-1/3 md:w-1/2 cursor-pointer"
          onClick={() => handleToggleAction()}>
          <Text className="!text-xs text-purple dark:text-greyer leading-[21px] tracking-[0.4px]">
            {currentSalesDate}
          </Text>
        </Flex>
        {openActionSalesDate && (
          <div
            ref={salesCardRef as RefObject<HTMLDivElement>}
            data-testid="sales-date-options"
            className="absolute p-2 -right-2 top-8 z-10 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-md">
            {SALES_DATE_OPTIONS.map(item => {
              const activeItem = item.label === currentSalesDate;
              const classStyleItem = activeItem
                ? "dark:bg-primary dark:hover:bg-primary bg-select hover:bg-select"
                : "hover:bg-select dark:hover:bg-primary";
              return (
                <Flex key={item.key}>
                  <Button
                    additionalClass={`w-40 px-4 my-[2px] py-1.5 rounded-md ${classStyleItem}`}
                    variant={VARIANT_BUTTON.LIGHT_CARD}
                    variantTremor={VARIANT_BUTTON.LIGHT}
                    onClick={() => handleSelectSalesDate(item.label)}>
                    <Text className="font-normal text-sm dark:text-white dark:group-hover:text-white leading-[21px] tracking-[0.13px] group-hover:text-primary text-primary">
                      {item.label}
                    </Text>
                  </Button>
                </Flex>
              );
            })}
          </div>
        )}
      </Flex>
      <Flex
        alignItems="start"
        justifyContent="start"
        data-testid="total-amount">
        {!!amountChange && (
          <Text
            className={`${totalAmountColor} dark:text-few leading-[22px] font-bold`}>
            {formattedTotalAmount}
          </Text>
        )}
        <Text className="ml-1 text-purple dark:text-dark-romance leading-[21px] tracking-[0.4px]">
          {duration}
        </Text>
      </Flex>
    </Card>
  );
};

export default SalesStatisticCard;
