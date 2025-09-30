import { render } from "@testing-library/react";

// Helpers
import { moneyFormat } from "@/helpers";

// Constants
import { CURRENCY } from "@/constants";

// Components
import CustomNumberFormat from "./CustomNumberFormat";

describe("CustomNumberFormat component", () => {
  it("should render snapshot correctly", () => {
    const { container } = render(<CustomNumberFormat value={2024} />);

    expect(container).toMatchSnapshot();
  });

  it("should render number with money format if value is a number", () => {
    const { getByText } = render(<CustomNumberFormat value={2024} />);
    const numberPriceFormat = moneyFormat({
      value: 2024,
      currency: CURRENCY.DOLLAR,
    });

    expect(getByText(numberPriceFormat)).toBeTruthy();
  });
});
