import { render, fireEvent, waitFor } from "@testing-library/react";

// Components
import CurrencyInputGroup from "./DecimalNumberInputGroup";

// Constants
import { MESSAGES_ERROR } from "@/constants";

describe("DecimalNumberInputGroup Component", () => {
  const mockOnChange = jest.fn();
  const props = {
    value: "",
    label: "Amount",
    errorMessage: "",
    onChangeCurrencyInput: mockOnChange,
  };

  const renderComponent = (error?: string) => {
    return render(<CurrencyInputGroup {...props} errorMessage={error ?? ""} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should match snapshot", () => {
    const { container } = render(
      <CurrencyInputGroup onChangeCurrencyInput={mockOnChange} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("Displays error message when errorMessage prop is provided", () => {
    const { getByText } = renderComponent(MESSAGES_ERROR.FIELD_REQUIRED);
    expect(getByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeInTheDocument;
  });

  it("Calls onChange with sanitized value when input changes", () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText("0.00");

    fireEvent.change(input, { target: { value: "123.456" } });

    expect(mockOnChange).toHaveBeenCalledWith("123.45");
  });

  it("Should not show value if user enter text", async () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText("0.00");

    fireEvent.change(input, { target: { value: "abc" } });
    await waitFor(() => {
      expect(input).not.toContain("abc");
    });
  });
});
