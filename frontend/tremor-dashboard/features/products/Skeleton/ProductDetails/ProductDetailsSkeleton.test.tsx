import { render } from "@testing-library/react";

// Components
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

describe("ProductDetailsSkeleton component", () => {
  it("should match snapshot", () => {
    const { container } = render(<ProductDetailsSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
