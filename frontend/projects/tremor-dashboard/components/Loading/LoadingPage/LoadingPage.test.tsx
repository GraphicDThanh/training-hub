import { render } from "@testing-library/react";

// Components
import LoadingPage from "./LoadingPage";

describe("LoadingPage component", () => {
  it("Should render LoadingPage snapshot correctly", () => {
    const { container } = render(<LoadingPage />);
    expect(container).toMatchSnapshot();
  });
});
