"use client";

import { Card, Flex } from "@tremor/react";
import { MdOutlinePriorityHigh } from "react-icons/md";

//Types
import { RevenueChartData } from "@/types";

// Components
import RevenueLineChart from "./RevenueLineChart";
import { Button, Popover } from "@/components";

//Styles
import "@/styles/sales.css";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface RevenueChartProps {
  dataChart: RevenueChartData[];
  revenueType: string;
}

const SalesRevenueChart = ({ dataChart, revenueType }: RevenueChartProps) => {
  return (
    <Card className="sales-revenue-chart p-5 h-full dark:bg-dark-tremor-primary ring-0">
      <Flex>
        <h2 className="text-sm md:text-base font-bold text-primary dark:text-dark-primary">
          {revenueType}
        </h2>
        <Popover
          content="See which ads perform better"
          className="text-center !bg-black !bottom-[-18px] rounded-md !text-white right-[38px] min-w-[170px] before:content-['▶'] before:absolute before:top-[16px] before:right-[-12px] before:text-[black]">
          <Button
            variant={VARIANT_BUTTON.SECONDARY}
            variantTremor={VARIANT_BUTTON.SECONDARY}
            aria-label="Which Ads Perform Better Button">
            <MdOutlinePriorityHigh className="text-xs text-secondary" />
          </Button>
        </Popover>
      </Flex>
      <RevenueLineChart dataChart={dataChart} />
    </Card>
  );
};

export default SalesRevenueChart;
