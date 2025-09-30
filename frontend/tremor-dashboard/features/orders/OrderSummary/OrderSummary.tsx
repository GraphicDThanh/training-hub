// Libs
import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";

// Components
import { Bold, Flex, Text } from "@tremor/react";

// Types
import { OrderSummaryData } from "@/types";

// Constants
import { CURRENCY } from "@/constants";

// Helpers
import { moneyFormat } from "@/helpers";

const titles = ["Product Price", "Delivery", "Taxes"];

const renderTitleList = titles.map(title => (
  <Text
    className="text-tertiary dark:text-dark-romance leading-6 mb-2"
    key={title}>
    {title}&#58;
  </Text>
));

const OrderSummary = (monies: OrderSummaryData) => {
  const { productPrice, delivery, taxes } = monies;
  const totalPayment = productPrice + delivery + taxes;

  const keyMonies = useMemo(
    () =>
      Object.keys(monies).map(item => {
        const money = monies[item as keyof OrderSummaryData];
        return (
          <p className="font-semibold mb-2" key={item} data-testid={item}>
            {moneyFormat({
              value: money,
              currency: CURRENCY.DOLLAR,
            })}
          </p>
        );
      }),
    [monies],
  );

  return (
    <>
      <Bold className="text-primary font-semibold capitalize dark:text-white tracking-[0.12px]">
        Order Summary
      </Bold>
      <Flex flexDirection="col" className="mt-2 tracking-[0.4px]">
        <Flex>
          <Flex
            alignItems="start"
            flexDirection="col"
            className="text-secondary dark:text-dark-romance">
            {renderTitleList}
          </Flex>
          <Flex
            alignItems="end"
            flexDirection="col"
            className="text-primary dark:text-white">
            {keyMonies}
          </Flex>
        </Flex>
        <Flex className="mt-4">
          <Flex className="text-xl font-light text-tertiary dark:text-dark-romance">
            Total:
          </Flex>
          <Flex
            className="flex-col items-end text-xl font-semibold text-primary dark:text-white"
            data-testid="total-price">
            {moneyFormat({
              value: totalPayment,
              currency: CURRENCY.DOLLAR,
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default memo(OrderSummary, isEqual);
