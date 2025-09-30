"use client";

import { memo, useMemo } from "react";

//Libs
import { Card, LineChart, Subtitle, Flex, Text } from "@tremor/react";

//Icons
import { FaRegClock } from "react-icons/fa";

//Styles
import "@/styles/charts.css";

//Types
import { type Color } from "@tremor/react";
import { LineChartData } from "@/types";

// Constants
import { CHART_TYPE } from "@/constants";

export enum CHART_CATEGORIES {
  DESKTOP = "Desktop apps",
  MOBILE = "Mobile apps",
}

interface LineChartProps {
  dataChart: LineChartData[];
  type?: string;
  title: string;
  subTitle: string;
  scheduleText: string;
  isDailyChart: boolean;
  colors?: Color[];
  descValue?: string;
}

const AnalyticsLineChart = ({
  dataChart,
  type = CHART_TYPE.SALE,
  title,
  subTitle,
  scheduleText,
  descValue,
  colors = [],
  isDailyChart,
}: LineChartProps) => {
  const MAPPING_CATEGORIES = useMemo(
    () => [
      type === CHART_TYPE.PERFORMANCE
        ? CHART_CATEGORIES.DESKTOP
        : CHART_CATEGORIES.MOBILE,
    ],
    [type],
  );

  return (
    <div className="analytics-line-chart w-full bg-white dark:bg-dark-tremor-primary bg-clip-border shadow-[0rem_0.25rem_0.375rem_-0.0625rem_rgba(0,0,0,0.1),0rem_0.125rem_0.25rem_-0.0625rem_rgba(0,0,0,0.06)] overflow-visible h-full rounded-xl border-0 border-solid border-[rgba(0,0,0,0.125)]">
      <div className="p-4">
        <div className="w-full mx-auto -mt-10">
          <Card
            data-testid="card"
            className={`${
              type === CHART_TYPE.PERFORMANCE
                ? "bg-gradient-secondary"
                : "bg-gradient-elementary"
            } p-2 text-[rgb(52,71,103)] rounded-lg shadow-[rgba(0,0,0,0.14)_0rem_0.25rem_1.25rem_0rem,rgba(76,175,79,0.4)_0rem_0.4375rem_0.625rem_-0.3125rem] ring-0`}>
            <LineChart
              className="h-[168px] mt-4"
              data={dataChart}
              index="date"
              categories={MAPPING_CATEGORIES}
              yAxisWidth={30}
              colors={colors}
              showAnimation={true}
              showLegend={false}
            />
          </Card>
        </div>
        <div className="flex-col items-start pt-6 pb-2 px-2">
          <div>
            <h3 className="text-base dark:text-dark-primary font-bold opacity-100 capitalize text-primary">
              {title}
            </h3>
            <Subtitle className="text-sm text-tertiary dark:text-dark-romance font-light opacity-100">
              {isDailyChart && (
                <>
                  &#40;
                  <span
                    data-testid="percent"
                    className="font-bold text-tertiary dark:text-dark-romance">
                    {descValue}
                  </span>
                  &#41;
                </>
              )}{" "}
              {subTitle}
            </Subtitle>
          </div>
          <div className="bg-gradient-seldom dark:bg-gradient-divider h-px opacity-25 mx-0 my-4" />
          <Flex justifyContent="start">
            <FaRegClock
              size={12}
              className="text-tertiary dark:text-dark-romance"
            />
            <Text className="text-sm text-tertiary dark:text-dark-romance font-light opacity-100 ml-1">
              {scheduleText}
            </Text>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default memo(AnalyticsLineChart);
