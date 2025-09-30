// Libs
import React, { useState } from "react";
import { EventProps, LineChart } from "@tremor/react";

// Types
import { RevenueChartData } from "@/types";

interface RevenueLineChartProps {
  dataChart: RevenueChartData[];
}

const RevenueLineChart = ({ dataChart }: RevenueLineChartProps) => {
  const [value, setValue] = useState<any>(null);

  const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  const chartValueChange = (v: EventProps) => {
    setValue(v);
  };

  return (
    <LineChart
      className="h-72"
      data={dataChart}
      index="month"
      categories={["Facebook Ads", "Google Ads"]}
      colors={["indigo", "neutral"]}
      yAxisWidth={30}
      valueFormatter={dataFormatter}
      onValueChange={chartValueChange}
      connectNulls={true}
      showAnimation={true}
    />
  );
};

export default RevenueLineChart;
