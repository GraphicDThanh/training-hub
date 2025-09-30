import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import InputPassword from "./InputPassword";

const mockProps = {
  id: "test-input-password",
  label: "Input Password",
  onChange: jest.fn(),
};

describe("Test InputPassword component", () => {
  it("Should match snapshot", () => {
    const { container } = render(<InputPassword {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should render InputPassword with error message", () => {
    render(
      <InputPassword errorMessage="Password is incorrect" {...mockProps} />,
    );
    const error = screen.queryByText(/Password is incorrect/i);
    expect(error).toBeInTheDocument();
  });

  it("Should call onChange handler with correct parameters", () => {
    const { getByLabelText } = render(<InputPassword {...mockProps} />);

    const inputElement = getByLabelText("Input Password");

    fireEvent.change(inputElement, { target: { value: "test value" } });

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue("test value");
  });
});
