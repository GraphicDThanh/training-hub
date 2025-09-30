import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Constants
import { NAVIGATION_SETTING } from "@/mocks";

// Components
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("Match snapshot", () => {
    const { container } = render(<Navigation items={NAVIGATION_SETTING} />);

    expect(container).toMatchSnapshot();
  });

  it("renders horizontally with isRow prop is true", () => {
    const { container } = render(
      <Navigation items={NAVIGATION_SETTING} isRow={true} />,
    );

    expect(container).toMatchSnapshot();
  });
});
