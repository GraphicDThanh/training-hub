import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import AnalyticsPageWithPinCode from "./AnalyticsPageWithPinCode";

// Mock data
import { ANALITICS_DATA, EMPTY_ANALITICS_DATA } from "@/mocks";

describe("Testing analytics page with all data", () => {
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

  it("Should match snapshot render correctly", async () => {
    const component = render(
      <AnalyticsPageWithPinCode analyticsData={ANALITICS_DATA} />,
    );
    await act(() => {
      expect(component).toMatchSnapshot();
    });
  });

  it("Should check component render correctly with data-testid", async () => {
    const component = render(
      <AnalyticsPageWithPinCode analyticsData={ANALITICS_DATA} />,
    );
    await act(() => {
      expect(
        component.queryByTestId("apartment-statistic"),
      ).toBeInTheDocument();
      expect(component.queryByTestId("sale-statistical")).toBeInTheDocument();
      // Test for sale_by_country
      expect(component.getByText("Sales by Country")).toBeTruthy();
      // Test for dataLineCharts (daily_sale_statistic, performance_statistic)
      expect(component.getByText("Completed Tasks")).toBeTruthy();
      expect(component.getByText("Daily Sales")).toBeTruthy();
    });
  });

  it("Should check component render correctly with empty data then without data-testid and text content", async () => {
    const component = render(
      <AnalyticsPageWithPinCode analyticsData={EMPTY_ANALITICS_DATA} />,
    );
    await act(() => {
      expect(
        component.queryByTestId("apartment-statistic"),
      ).not.toBeInTheDocument();
      expect(
        component.queryByTestId("sale-statistical"),
      ).not.toBeInTheDocument();
      // Test for sale_by_country
      expect(component.queryByText("Sales by Country")).toBeFalsy();
      // Test for dataLineCharts (daily_sale_statistic, performance_statistic)
      expect(component.queryByText("Completed Tasks")).toBeFalsy();
      expect(component.queryByText("Daily Sales")).toBeFalsy();
    });
  });
});
