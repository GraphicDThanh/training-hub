import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import InputSearch, { InputSearchProps } from "./InputSearch";

let mockHandleChange: typeof jest.fn;

beforeEach(() => {
  mockHandleChange = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (override?: Partial<InputSearchProps>) =>
  render(
    <InputSearch
      value="query"
      onChange={mockHandleChange}
      data-testid="test-input-search"
      {...override}
    />,
  );

describe("InputSearch component", () => {
  it("Should matches snapshot", () => {
    const { container } = renderComponent({ errorMessage: "Have error" });
    expect(container).toMatchSnapshot();
  });

  it("Should Updates search value and onChange triggered when user input", () => {
    const { getByTestId } = renderComponent();

    const inputElement = getByTestId("test-input-search");

    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(inputElement).toHaveValue("new value");
    expect(mockHandleChange).toHaveBeenNthCalledWith(1, "new value");
  });

  it("Clears search value on close button click", () => {
    const { getByTestId } = renderComponent();

    const inputElement = getByTestId("test-input-search");
    const closeButton = getByTestId("close-button");

    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(mockHandleChange).toHaveBeenNthCalledWith(1, "new value");

    fireEvent.click(closeButton);
    expect(inputElement).toHaveValue("");
    expect(mockHandleChange).toHaveBeenNthCalledWith(2, "");
  });
});
