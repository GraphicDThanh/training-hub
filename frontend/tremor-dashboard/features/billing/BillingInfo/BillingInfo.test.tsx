import { render } from "@testing-library/react";

// Components
import BillingInfo from "./BillingInfo";

// Mocks
import { MOCK_BILLING_INFO } from "@/mocks";

describe("Testing BillingInfo component", () => {
  it("Should match snapshot", () => {
    const { container } = render(<BillingInfo {...MOCK_BILLING_INFO} />);

    expect(container).toMatchSnapshot();
  });
});
