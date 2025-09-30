import { render } from "@testing-library/react";

// Components
import DatePicker from "./DatePicker";

const mockMinDate = new Date("2023-04-23T05:46:05.261Z");
const mockCurrentDate = new Date("2024-04-22T05:46:05.261Z");
const mockOnChange = jest.fn();

describe("Testing ProjectField component", () => {
  const setupRender = () => {
    return render(
      <DatePicker
        label="Due Date"
        value={mockCurrentDate}
        minDate={mockMinDate}
        onValueChange={mockOnChange}
      />,
    );
  };

  it("Should match snapshot", () => {
    const { container } = setupRender();
    expect(container).toMatchSnapshot();
  });
});
