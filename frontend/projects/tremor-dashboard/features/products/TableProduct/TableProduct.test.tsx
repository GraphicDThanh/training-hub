// Components
import { render } from "@testing-library/react";
import TableProduct from "./TableProduct";

// Types
import { MOCK_PRODUCTS } from "@/mocks";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn(() => "mockPage") })),
  usePathname: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
}));

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("Order Table Testing", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <TableProduct products={MOCK_PRODUCTS} total={50} />,
    );
    expect(container).toMatchSnapshot();
  });
});
