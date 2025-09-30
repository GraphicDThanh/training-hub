import { memo } from "react";

//Libs
import { Card, Text, Flex } from "@tremor/react";

//Components
import { IconBox } from "@/components";

// Helpers
import {
  formatAbbreviateNumber,
  formatAdjustNumber,
  formattedNumber,
} from "@/helpers";

// Constants
import {
  SALE_STATISTICAL,
  ANALYTICS_STATISTICAL_TYPE,
  UNIT,
} from "@/constants";

import { AnalyticsStatistical } from "@/types";

interface AnalyticsStatisticCardProps {
  statisticalData: AnalyticsStatistical;
}

const AnalyticsStatisticCard = ({
  statisticalData,
}: AnalyticsStatisticCardProps): JSX.Element => {
  const { id, type, amount, amountChange, duration, amountChangeType } =
    statisticalData;

  const formattedAmount =
    {
      [ANALYTICS_STATISTICAL_TYPE.BOOKINGS]: amount,
      [ANALYTICS_STATISTICAL_TYPE.TODAY_USER]: formattedNumber({
        value: amount,
      }),
      [ANALYTICS_STATISTICAL_TYPE.REVENUE]: formatAbbreviateNumber(amount),
      [ANALYTICS_STATISTICAL_TYPE.FOLLOWERS]: formatAdjustNumber({
        value: amount,
        isPositive: amountChangeType,
      }),
    }[type] || "";

  const { bgIcon, icon } = SALE_STATISTICAL[id] || {};

  return (
    <div className="font-primary antialiased items-center justify-between w-full">
      <div className="flex items-center">
        <Card className="bg-tremor-primary dark:bg-dark-tremor-primary mx-auto pt-3 pb-4 px-4 ring-0 max-w-full lg:max-w-[356px] 2xl:max-w-full border-none relative mt-[40px] rounded-xl shadow-md">
          <Flex>
            <IconBox
              className="absolute top-[-22px] shadow-box-icon-primary"
              bgBox={bgIcon}
              icon={icon}
            />
            <Flex
              flexDirection="col"
              alignItems="end"
              className="pl-[90px] mb-1">
              <Text className="text-md text-tertiary dark:text-dark-romance font-light">
                {type}
              </Text>
              <Text
                data-testid={type}
                className="!text-primary dark:!text-white text-tremor-normal leading-[33px] tracking-[0.1764px] font-bold">
                {formattedAmount}
              </Text>
            </Flex>
          </Flex>
          <div className="h-px bg-[linear-gradient(to_right,rgba(52,71,103,0),rgba(52,71,103,0.4),rgba(52,71,103,0))] dark:bg-gradient-divider opacity-25 my-4" />
          <Flex>
            <Flex
              justifyContent="start"
              alignItems="start"
              className="tracking-[0.4px]">
              <Text className="text-greener dark:text-few leading-[21px] font-bold">
                {formatAdjustNumber({
                  value: amountChange,
                  isPositive: amountChangeType,
                  unit: UNIT.PERCENT,
                })}
              </Text>
              <Text className="ml-1 text-tertiary dark:text-dark-romance leading-[21px] font-light">
                {duration}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default memo(AnalyticsStatisticCard);
