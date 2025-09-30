import { render } from "@testing-library/react";

// Components
import OtherProductSkeleton from "./OtherProductSkeleton";

describe("OtherProductSkeleton component", () => {
  it("should match snapshot", () => {
    const { container } = render(<OtherProductSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
