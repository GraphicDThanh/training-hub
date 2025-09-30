import { fireEvent, render } from "@testing-library/react";

// Components
import Checkbox from "./Checkbox";

describe("Checkbox Testing", () => {
  const mockOnChange = jest.fn();
  const renderComponent = () =>
    render(<Checkbox id="checkbox" onChange={mockOnChange} />);
  it("should match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it("Calls change value", () => {
    const { container } = renderComponent();

    fireEvent.click(
      container.firstElementChild?.querySelector("#checkbox") as Element,
    );

    expect(mockOnChange).toHaveBeenCalled();
  });
});
