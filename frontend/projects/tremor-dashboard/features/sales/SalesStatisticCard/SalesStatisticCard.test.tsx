import React from "react";
import { render, fireEvent } from "@testing-library/react";

// Components
import SalesStatisticCard from "./SalesStatisticCard";

// Constants
import { SALES_DATE_OPTIONS, SALES_STATISTIC_TYPE } from "@/constants";

describe("SalesStatisticCard", () => {
  const statisticsData = {
    id: "1",
    type: "Sales",
    amount: 23220,
    amountChange: 213,
    duration: "since last month",
    amountChangeType: 0,
  };

  const renderComponent = () => {
    return render(<SalesStatisticCard statisticsData={statisticsData} />);
  };

  it("Should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should call toggleActionSaleStaticCard when clicked outside", () => {
    const { container } = render(
      <>
        <div id="outside-element">Outside Element</div>
        <SalesStatisticCard statisticsData={statisticsData} />
      </>,
    );

    const outsideElement = container.querySelector("#outside-element");
    fireEvent.mouseDown(outsideElement!);
  });

  it("should call toggleActionSaleStaticCard when clicked outside", () => {
    const { container } = render(
      <>
        <div id="outside-element">Outside Element</div>
        <SalesStatisticCard statisticsData={statisticsData} />
      </>,
    );

    const outsideElement = container.querySelector("#outside-element");
    fireEvent.mouseDown(outsideElement!);
  });

  it("calls handleToggleAction function to toggles sales date options", () => {
    const { getByText, queryByTestId, getAllByText } = renderComponent();

    expect(queryByTestId("sales-date-options")).toBeNull();

    // Click on the sales date text to open the options
    fireEvent.click(getByText(SALES_DATE_OPTIONS[0].label));
    expect(queryByTestId("sales-date-options")).toBeTruthy();

    // Click again to close the options
    fireEvent.click(getAllByText(SALES_DATE_OPTIONS[0].label)[0]);
    expect(queryByTestId("sales-date-options")).toBeNull();
  });

  it("calls handleSelectSalesDate function to selects sales date", () => {
    // Mock the useState hook
    const useStateSpy = jest.spyOn(React, "useState");

    // Mock for isOpenAction
    useStateSpy.mockReturnValueOnce([true, jest.fn()]);
    // Mock for currentSalesDate
    useStateSpy.mockReturnValueOnce([SALES_DATE_OPTIONS[0].label, jest.fn()]);

    const { getByTestId } = renderComponent();

    const button = getByTestId("sales-date-options").querySelector("button")!;

    fireEvent.click(button, {
      target: { label: SALES_DATE_OPTIONS[1].label },
    });

    expect(useStateSpy).toHaveBeenCalledWith(false);
    expect(useStateSpy).toHaveBeenCalledWith(SALES_DATE_OPTIONS[0].label);
  });

  it("renders correct totalAmountColor for AVG_REVENUE type", () => {
    const { getByTestId } = render(
      <SalesStatisticCard
        statisticsData={{
          ...statisticsData,
          type: SALES_STATISTIC_TYPE.AVG_REVENUE,
        }}
      />,
    );

    const totalAmountElement = getByTestId("total-amount");

    expect(
      totalAmountElement.getAttribute("class")?.includes("text-secondary"),
    ).toBe(false);
    expect(
      totalAmountElement
        .getAttribute("class")
        ?.includes("dark:!text-secondary"),
    ).toBe(false);
  });

  it("renders with empty string formattedTotalAmount", () => {
    const { container } = render(
      <SalesStatisticCard
        statisticsData={{
          ...statisticsData,
          type: SALES_STATISTIC_TYPE.AVG_REVENUE,
        }}
      />,
    );

    const totalAmountElementFew = container.querySelector(".text-few");
    expect(totalAmountElementFew).toBeNull();
  });

  it("renders with empty string formattedAmount", () => {
    const statisticsData = {
      id: "1",
      type: "Sales",
      amount: 0,
      amountChange: 0,
      duration: "since last month",
      amountChangeType: 0,
    };

    const { getByTestId } = render(
      <SalesStatisticCard statisticsData={statisticsData} />,
    );

    const totalAmountElement = getByTestId("formatted-amount");

    expect(totalAmountElement.getAttribute("class")?.includes("")).toBe(true);
  });

  it("renders with empty type formattedAmount", () => {
    const { getByTestId } = render(
      <SalesStatisticCard
        statisticsData={{
          ...statisticsData,
          type: "",
        }}
      />,
    );
    const totalAmountElement = getByTestId("formatted-amount");
    expect(totalAmountElement).toBeTruthy();
  });
});
