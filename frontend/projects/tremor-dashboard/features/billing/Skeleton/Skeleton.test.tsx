import { render } from "@testing-library/react";

// Components
import BillingDetailsSkeleton from "./BillingDetailsSkeleton";
import BillingInfoSkeleton from "./BillingInfoSkeleton";
import InvoicesSkeleton from "./InvoicesSkeleton";
import TransactionsSkeleton from "./TransactionsSkeleton";

describe("BillingDetailsSkeleton", () => {
  it("Match snapshot", () => {
    const { container } = render(<BillingDetailsSkeleton />);

    expect(container).toMatchSnapshot();
  });
});

describe("BillingInfoSkeleton", () => {
  it("Match snapshot", () => {
    const { container } = render(<BillingInfoSkeleton />);

    expect(container).toMatchSnapshot();
  });
});

describe("InvoicesSkeleton", () => {
  it("Match snapshot", () => {
    const { container } = render(<InvoicesSkeleton />);

    expect(container).toMatchSnapshot();
  });
});

describe("TransactionsSkeleton", () => {
  it("Match snapshot", () => {
    const { container } = render(<TransactionsSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
