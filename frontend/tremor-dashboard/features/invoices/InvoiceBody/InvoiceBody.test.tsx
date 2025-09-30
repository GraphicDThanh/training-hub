import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import InvoiceBody from "./InvoiceBody";

// Mocks
import { MOCK_INVOICE_DATA } from "@/mocks";

// Constants
import { RESULT_NOT_FOUND } from "@/constants";
import { TInvoiceDetail } from "@/types";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/mocked-path"),
  useRouter: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe("InvoiceBody Testing", () => {
  const invoice = {
    id: MOCK_INVOICE_DATA.id,
    createdAt: MOCK_INVOICE_DATA.createdAt,
    dueAt: MOCK_INVOICE_DATA.dueAt,
    products: MOCK_INVOICE_DATA.products,
    totalCost: MOCK_INVOICE_DATA.totalCost,
  };
  it("should match snapshot", () => {
    const component = render(<InvoiceBody {...invoice} />);
    expect(component).toMatchSnapshot();
  });

  it("renders invoice body with default data show text Result Not Found", () => {
    const { getAllByText } = render(
      <InvoiceBody {...invoice} products={[] as TInvoiceDetail[]} />,
    );

    expect(getAllByText(RESULT_NOT_FOUND)).toHaveLength(1);
  });
});
