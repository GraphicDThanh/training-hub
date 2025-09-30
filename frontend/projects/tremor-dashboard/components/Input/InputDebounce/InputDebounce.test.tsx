import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import InputDebounce, { InputDebounceProps } from "./InputDebounce";

let mockOnChange: typeof jest.fn;

beforeEach(() => {
  mockOnChange = jest.fn();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const renderComponent = (override?: Partial<InputDebounceProps>) =>
  render(
    <InputDebounce
      field="query"
      onChange={mockOnChange}
      data-testid="test-input-debounce"
      {...override}
    />,
  );

describe("InputDebounce component", () => {
  it("Should matches snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("Render correctly with initial value", () => {
    const { getByTestId } = renderComponent({ value: "a" });

    const inputElement = getByTestId("test-input-debounce");
    expect(inputElement).toHaveValue("a");
  });

  it("onSearch will triggered and update search value on user input", async () => {
    const { getByTestId } = renderComponent();

    const inputElement = getByTestId("test-input-debounce");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(inputElement).toHaveValue("new value");

    await waitFor(
      () =>
        expect(mockOnChange).toHaveBeenNthCalledWith(1, "new value", "query"),
      {
        timeout: 2000,
      },
    );
  });
});
