import { fireEvent, render, waitFor, act } from "@testing-library/react";

// Mocks
import { MOCK_EMAIL_OPTIONS } from "@/mocks";

// Context
import { PinCodeProvider } from "@/context/pincode";

// Constants
import { KEYBOARD_KEYS } from "@/constants";

// Components
import CreateTransactionContainerWithPinCode from "./CreateTransactionContainer";

const { DIGIT_1 } = KEYBOARD_KEYS;

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe("CreateTransactionContainer", () => {
  const mockOnRefetchTransactionList = jest.fn();

  beforeEach(() => {
    mockOnRefetchTransactionList.mockClear();
  });

  const renderComponentWithPinCodeProvider = () =>
    render(
      <PinCodeProvider pinCode="111111">
        <CreateTransactionContainerWithPinCode
          options={MOCK_EMAIL_OPTIONS}
          fromUserId={324}
          onRefetchTransactionList={mockOnRefetchTransactionList}
        />
      </PinCodeProvider>,
    );
  it("match snapshot", () => {
    const { container } = render(
      <CreateTransactionContainerWithPinCode
        options={MOCK_EMAIL_OPTIONS}
        fromUserId={324}
        onRefetchTransactionList={mockOnRefetchTransactionList}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("calls create new transaction", async () => {
    const responseData = { success: true };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { getByTestId, getByPlaceholderText, getAllByTestId, getAllByText } =
      renderComponentWithPinCodeProvider();

    fireEvent.click(getByTestId("openTransactionModal"));
    fireEvent.change(getByPlaceholderText("0.00"), { target: { value: 86 } });
    fireEvent.click(getByTestId("toUserId").firstElementChild as HTMLElement);
    fireEvent.click(getAllByTestId("select-option")[1]);

    await act(async () => {
      await fireEvent.submit(getByTestId("createTransactionForm"));
    });

    await waitFor(() => getByTestId("modal-pincode"));

    fireEvent.keyDown(getAllByTestId("pin-code-input")[0], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[1], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[2], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[3], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[4], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[5], {
      key: DIGIT_1,
    });

    await act(async () => {
      await fireEvent.click(getAllByText("Submit")[1]);
    });

    await waitFor(() => {
      expect(mockOnRefetchTransactionList).toHaveBeenCalled();
    });
  });

  it("calls failed", async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Validation failed" }),
    };

    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { getByTestId, getByPlaceholderText, getAllByTestId, getAllByText } =
      renderComponentWithPinCodeProvider();

    fireEvent.click(getByTestId("openTransactionModal"));
    fireEvent.change(getByPlaceholderText("0.00"), { target: { value: "86" } });
    fireEvent.click(getByTestId("toUserId").firstElementChild as HTMLElement);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.submit(getByTestId("createTransactionForm"));

    await waitFor(() => getByTestId("modal-pincode"));

    fireEvent.keyDown(getAllByTestId("pin-code-input")[0], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[1], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[2], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[3], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[4], {
      key: DIGIT_1,
    });
    fireEvent.keyDown(getAllByTestId("pin-code-input")[5], {
      key: DIGIT_1,
    });
    await act(async () => {
      await fireEvent.click(getAllByText("Submit")[1]);
    });

    expect(mockOnRefetchTransactionList).not.toHaveBeenCalled();
  });
});
