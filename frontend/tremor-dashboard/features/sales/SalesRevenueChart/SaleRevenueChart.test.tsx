import { fireEvent, render } from "@testing-library/react";

//Components
import SalesRevenueChart from "./SalesRevenueChart";

//Mocks
import { REVENUE_CHART_DATA } from "@/mocks";

describe("Testing SalesRevenueChart component", () => {
  it("Should match snapshot", () => {
    const { container } = render(
      <SalesRevenueChart
        dataChart={REVENUE_CHART_DATA.data}
        revenueType="Revenue"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("Calls onChange is correct", () => {
    const { getByText, container } = render(
      <SalesRevenueChart
        dataChart={REVENUE_CHART_DATA.data}
        revenueType="Revenue"
      />,
    );
    // Simulate a change event on the LineChart
    fireEvent.click(getByText("Facebook Ads"));

    expect(container).toMatchSnapshot();
  });
});
