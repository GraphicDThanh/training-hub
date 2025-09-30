import { render } from "@testing-library/react";

// Components
import OrderContact from "./OrderContact";
import { MOCK_ORDERS } from "@/mocks";

describe("Order detail contact section", () => {
  const propsDefault = {
    name: MOCK_ORDERS[0].products[0].name,
    url: MOCK_ORDERS[0].products[0].url ?? "",
    date: 1,
  };

  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("Should match snapshot", () => {
    const component = render(<OrderContact {...propsDefault} />);
    expect(component).toMatchSnapshot();
  });
});
