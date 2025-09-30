import { render } from "@testing-library/react";

// Components
import TableOrder from "./TableOrder";

// Mocks
import { MOCK_ORDERS } from "@/mocks";

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn(() => "mockPage") })),
  usePathname: jest.fn(),
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("Order Table Testing", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <TableOrder orders={MOCK_ORDERS} total={10} />,
    );
    expect(container).toMatchSnapshot();
  });
});
