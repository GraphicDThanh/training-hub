import { render } from "@testing-library/react";

// Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Components
import OtherProductList from "./OtherProductList";

describe("OtherProductList component", () => {
  it("should match snapshot", async () => {
    const otherProductListComponent = await OtherProductList({
      products: MOCK_PRODUCTS,
    });

    const { container } = render(otherProductListComponent);

    expect(container).toMatchSnapshot();
  });
});
