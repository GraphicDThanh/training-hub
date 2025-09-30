"use client";

import { SalesByAgeContainer } from "@/types";
import { Card, BarChart } from "@tremor/react";

const SalesByAge = ({ data, title }: SalesByAgeContainer) => {
  return (
    <Card className="sale-by-age dark:bg-dark-tremor-primary p-5 ring-0">
      <h2 className="text-sm md:text-base font-bold text-primary dark:text-dark-primary">
        {title}
      </h2>
      <BarChart
        className="mt-6 w-full"
        data={data}
        index="ageRange"
        categories={["sales"]}
        colors={["slate"]}
        yAxisWidth={40}
        layout="vertical"
        showGridLines={false}
        showLegend={false}
      />
    </Card>
  );
};

export default SalesByAge;
