import { render } from "@testing-library/react";

// Mocks
import { MOCK_INVOICE_DATA } from "@/mocks";

// Components
import InfoInvoice from "./InfoInvoiceBody";

describe("InfoInvoiceBody", () => {
  const { id, createdAt, dueAt } = MOCK_INVOICE_DATA ?? {};
  const props = {
    id,
    createdAt,
    dueAt,
  };

  it("Match snapshot", () => {
    const { container } = render(<InfoInvoice {...props} />);

    expect(container).toMatchSnapshot();
  });
});
