import { render } from "@testing-library/react";

// Components
import OverlayPage from "./OverlayPage";

describe("OverlayPage", () => {
  it("Match snapshot", () => {
    const { container } = render(<OverlayPage />);

    expect(container).toMatchSnapshot();
  });
});
