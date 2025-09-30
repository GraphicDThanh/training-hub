import { render } from "@testing-library/react";

// Components
import LoadingIndicator from "./LoadingIndicator";

describe("LoadingIndicator component", () => {
  it("Should render LoadingIndicator snapshot correctly", () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });

  it("Should render LoadingIndicator snapshot full width", () => {
    const { container } = render(<LoadingIndicator isFullWidth={true} />);
    expect(container).toMatchSnapshot();
  });
});
