import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import OrderSummary from "./OrderSummary";

// Mocks
import { MOCK_ORDER_SUMMARY } from "@/mocks";

// Helpers
import { formattedNumber } from "@/helpers";

// Constants
import { CURRENCY } from "@/constants";

describe("OderSummary component", () => {
  it("Should match snapshot", () => {
    const result = render(<OrderSummary {...MOCK_ORDER_SUMMARY} />);
    expect(result).toMatchSnapshot();
  });

  it("Should render correct product price", () => {
    render(<OrderSummary {...MOCK_ORDER_SUMMARY} />);
    const result = screen.getByTestId("productPrice");
    expect(result).toHaveTextContent(
      formattedNumber({
        value: MOCK_ORDER_SUMMARY.productPrice,
        currency: CURRENCY.DOLLAR,
        isDecimalNumber: true,
      }),
    );
  });

  it("Should render correct delivery fee", () => {
    render(<OrderSummary {...MOCK_ORDER_SUMMARY} />);
    const result = screen.getByTestId("delivery");
    expect(result).toHaveTextContent(
      formattedNumber({
        value: MOCK_ORDER_SUMMARY.delivery,
        currency: CURRENCY.DOLLAR,
        isDecimalNumber: true,
      }),
    );
  });

  it("Should render correct taxes", () => {
    render(<OrderSummary {...MOCK_ORDER_SUMMARY} />);
    const result = screen.getByTestId("taxes");
    expect(result).toHaveTextContent(
      formattedNumber({
        value: MOCK_ORDER_SUMMARY.taxes,
        currency: CURRENCY.DOLLAR,
        isDecimalNumber: true,
      }),
    );
  });

  it("Should render correct total price", () => {
    render(<OrderSummary {...MOCK_ORDER_SUMMARY} />);
    const result = screen.getByTestId("total-price");
    const total =
      MOCK_ORDER_SUMMARY.delivery +
      MOCK_ORDER_SUMMARY.productPrice +
      MOCK_ORDER_SUMMARY.taxes;
    expect(result).toHaveTextContent(
      formattedNumber({
        value: total,
        currency: CURRENCY.DOLLAR,
        isDecimalNumber: true,
      }),
    );
  });
});
