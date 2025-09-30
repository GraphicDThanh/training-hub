import { render } from "@testing-library/react";

// Components
import CustomStatus from "./CustomStatus";

describe("CustomStatus component", () => {
  it("should render snapshot correctly", () => {
    const { container } = render(<CustomStatus status={0} />);

    expect(container).toMatchSnapshot();
  });

  it("should render Paid content if status is 0", () => {
    const { getByText } = render(<CustomStatus status={0} />);

    expect(getByText("Paid")).toBeTruthy();
  });

  it("should render Canceled content if status is 1", () => {
    const { getByText } = render(<CustomStatus status={1} />);

    expect(getByText("Canceled")).toBeTruthy();
  });

  it("should render Refunded content if status is 2", () => {
    const { getByText } = render(<CustomStatus status={2} />);

    expect(getByText("Refunded")).toBeTruthy();
  });
});
