import dynamic from "next/dynamic";

// Components
import { Col, Grid } from "@tremor/react";
import { SalesByCountry } from "@/features/analytics";
import { TopSellingProducts, ChannelChart } from "@/features/sales";
const SalesStatisticCard = dynamic(
  () => import("@/features/sales/SalesStatisticCard/SalesStatisticCard"),
);
const SalesByAge = dynamic(() => import("@/features/sales/SalesByAge"));
const SalesRevenueChart = dynamic(
  () => import("@/features/sales/SalesRevenueChart/SalesRevenueChart"),
);

import { REVENUE_CHART_DATA } from "@/mocks";

// Services
import { getAnalytics, getSales } from "@/services";

// Types
import { SalesStatisticData } from "@/types";

export const metadata = {
  title: "Sales - Tremor Dashboard",
};

const Sales = async () => {
  const saleData = await getSales();
  const analyticsData = await getAnalytics();

  return (
    <Grid numItems={1} numItemsMd={3} className="gap-5 sale-page" as="main">
      <Col numColSpan={1} numColSpanMd={3} as="section">
        <Grid className="gap-5" numItemsMd={3}>
          {saleData.header_info?.map((item: SalesStatisticData) => (
            <SalesStatisticCard statisticsData={item} key={item.type} />
          ))}
        </Grid>
      </Col>
      <Col numColSpan={1} numColSpanMd={3} as="section">
        <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-5">
          <Col numColSpan={1} as="section">
            <ChannelChart
              title="Channels"
              channelChartData={saleData.channels}
            />
          </Col>
          <Col numColSpan={1} numColSpanMd={1} numColSpanLg={2}>
            <SalesRevenueChart
              dataChart={REVENUE_CHART_DATA.data}
              revenueType="Revenue"
            />
          </Col>
        </Grid>
      </Col>
      <Col numColSpan={1} numColSpanMd={3} as="section">
        <Grid numItems={1} numItemsLg={3} className="gap-5">
          <Col numColSpan={1} numColSpanMd={1} numColSpanLg={2}>
            <SalesByAge title="Sales by age" data={saleData.sales_by_age} />
          </Col>
          <Col numColSpan={1}>
            <SalesByCountry
              title="Sales by Country"
              isAnalytics={false}
              data={analyticsData.sale_by_country}
            />
          </Col>
        </Grid>
      </Col>
      <Col numColSpan={1} numColSpanMd={3} as="section">
        <TopSellingProducts
          title="Top Selling Products"
          data={saleData.top_selling_products}
        />
      </Col>
    </Grid>
  );
};

export default Sales;
