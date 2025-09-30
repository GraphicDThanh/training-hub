import { render } from "@testing-library/react";
import InvoiceItem from "./InvoiceItem";
import { MOCK_INVOICES } from "@/mocks";

describe("InvoiceItem", () => {
  const {
    id,
    createdAt: date,
    invoicePrefix,
    totalCost: price,
  } = MOCK_INVOICES[0] ?? {};

  it("match snapshot", () => {
    const { container } = render(
      <InvoiceItem
        id={id}
        date={date}
        invoicePrefix={invoicePrefix}
        price={price}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
