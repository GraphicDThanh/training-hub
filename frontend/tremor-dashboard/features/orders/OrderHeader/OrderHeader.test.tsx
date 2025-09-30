import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import OrderHeader from "./OrderHeader";

// Mocks
import { MOCK_INVOICES } from "@/mocks";

describe("OrderHeader component", () => {
  const { id, createdAt } = MOCK_INVOICES[0];

  const props = {
    id,
    createdAt,
    orderCode: "KF332",
  };
  it("Should match snapshot", () => {
    const { container } = render(<OrderHeader {...props} />);
    expect(container).toMatchSnapshot();
  });
});
