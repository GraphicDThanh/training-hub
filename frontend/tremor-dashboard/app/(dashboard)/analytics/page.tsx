// Actions
import { getAnalytics } from "@/services";

import AnalyticsPageWithPinCode from "@/features/analytics/AnalyticsPageWithPinCode/AnalyticsPageWithPinCode";

export const metadata = {
  title: "Analytics - Tremor Dashboard",
};

const Analytics = async () => {
  const analyticsData = await getAnalytics();

  return <AnalyticsPageWithPinCode analyticsData={analyticsData} />;
};

export default Analytics;
