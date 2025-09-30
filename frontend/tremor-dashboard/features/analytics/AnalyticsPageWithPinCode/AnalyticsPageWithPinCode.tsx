"use client";

import dynamic from "next/dynamic";

// Components
import { Flex, List, ListItem } from "@tremor/react";
import {
  AnalyticsInfo,
  AnalyticsStatisticCard,
  ColumnChart,
  SalesByCountry,
} from "@/features/analytics";

const AnalyticsLineChart = dynamic(
  () => import("@/features/analytics/AnalyticsLineChart/AnalyticsLineChart"),
);

import { memo, useEffect, useMemo } from "react";
import {
  AnalyticsStatistical,
  AnalyticsInfoData,
  LineChart,
  SalesByCountryData,
} from "@/types";
import { CHART_TYPE, PIN_CODE_SKIP_SET_KEY } from "@/constants";
import { TWebChartData } from "../ColumnChart/ColumnChart";
import { TWithPinCode, withPinCode } from "@/hocs/withPinCode";
import { usePinCode } from "@/context/pincode";

interface IAnalyticsPageWithPinCode {
  analyticsData: {
    performance_statistic: LineChart;
    daily_sale_statistic: LineChart;
    sale_by_country: SalesByCountryData[];
    sale_statistical: AnalyticsStatistical[];
    apartment_statistic: AnalyticsInfoData[];
    web_statistic: TWebChartData;
  };
}

const Analytics = ({
  analyticsData,
  onOpenPinCodeModal,
}: TWithPinCode<IAnalyticsPageWithPinCode>) => {
  const { pinCode } = usePinCode();

  useEffect(() => {
    const isSkipped = localStorage.getItem(PIN_CODE_SKIP_SET_KEY);

    !pinCode && !isSkipped && onOpenPinCodeModal();
  }, [onOpenPinCodeModal, pinCode]);

  const {
    apartment_statistic,
    daily_sale_statistic,
    performance_statistic,
    sale_by_country,
    sale_statistical,
    web_statistic,
  } = analyticsData;

  const dataLineCharts = useMemo(
    () => [daily_sale_statistic, performance_statistic],
    [daily_sale_statistic, performance_statistic],
  );

  const MAPPING_APARTMENT_STATISTIC = useMemo(
    () => apartment_statistic,
    [apartment_statistic],
  );

  return (
    <Flex
      justifyContent="start"
      flexDirection="col"
      className="flex-wrap analytics-page"
      as="main">
      {/* Sales card  */}
      {!!sale_by_country.length && (
        <SalesByCountry
          title="Sales by Country"
          isAnalytics={true}
          data={sale_by_country}
        />
      )}
      {/* Charts */}
      <Flex
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-6"
        as="section">
        {/* Website Views chart */}
        {web_statistic && <ColumnChart webChartData={web_statistic} />}
        {/* Line chart */}
        {!!dataLineCharts.length &&
          dataLineCharts.map(
            (item: LineChart) =>
              item.id && (
                <AnalyticsLineChart
                  dataChart={item.data}
                  type={item.id}
                  title={item.display}
                  subTitle={item.desc}
                  scheduleText={item.modified}
                  descValue={item.descValue}
                  isDailyChart={item.id === CHART_TYPE.SALE}
                  key={item.id}
                />
              ),
          )}
      </Flex>
      {/* Statistic cards */}
      {!!sale_statistical.length && (
        <List
          data-testid="sale-statistical"
          className="flex flex-wrap justify-between">
          {sale_statistical.map((item: AnalyticsStatistical) => (
            <ListItem
              key={item.type}
              className="max-w-full md:w-[calc(50%-18px)] lg:w-[calc(25%-18px)] py-1 lg:max-w-[356px] 2xl:max-w-full !border-y-0">
              <AnalyticsStatisticCard statisticalData={item} />
            </ListItem>
          ))}
        </List>
      )}
      {/* Info cards */}
      {!!MAPPING_APARTMENT_STATISTIC.length && (
        <List
          data-testid="apartment-statistic"
          className="flex flex-wrap flex-col items-start justify-start lg:flex-nowrap md:flex-row mt-12">
          {MAPPING_APARTMENT_STATISTIC.map((item: AnalyticsInfoData) => (
            <ListItem
              key={item.id}
              className="md:w-[calc(50%-18px)] py-0 md:mr-6 md:even:mr-0 md:last:mr-0 lg:even:mr-6 !border-y-0">
              <AnalyticsInfo infoData={item} />
            </ListItem>
          ))}
        </List>
      )}
    </Flex>
  );
};

const AnalyticsPageWithPinCode = withPinCode(Analytics);

export default memo(AnalyticsPageWithPinCode);
