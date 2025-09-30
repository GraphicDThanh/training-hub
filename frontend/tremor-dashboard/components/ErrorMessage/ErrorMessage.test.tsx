import { render } from "@testing-library/react";

// Components
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage component", () => {
  it("Should matches snapshot", () => {
    const { container } = render(<ErrorMessage errorMessage={"Have error"} />);
    expect(container).toMatchSnapshot();
  });
});
