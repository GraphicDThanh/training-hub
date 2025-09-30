import { fireEvent, render, waitFor } from "@testing-library/react";

import PaymentDetails, { IPaymentDetails } from "./PaymentDetails";

import { TWithPinCode } from "@/hocs/withPinCode";

import { PinCodeProvider } from "@/context/pincode";

import { KEYBOARD_KEYS } from "@/constants";

import { MOCK_BILLING_CARD } from "@/mocks";

const { DIGIT_1 } = KEYBOARD_KEYS;

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

const { cardLast4Digit, cardNumber } = MOCK_BILLING_CARD;

const renderPaymentDetails = (
  override?: Partial<TWithPinCode<IPaymentDetails>>,
) =>
  render(
    <PinCodeProvider pinCode="111111">
      <PaymentDetails
        cardLast4Digit={cardLast4Digit}
        cardDigit={cardNumber}
        {...override}
      />
    </PinCodeProvider>,
  );

describe("Payment Details Components Testing", () => {
  it("Should match snapshot", () => {
    const result = renderPaymentDetails();
    expect(result).toMatchSnapshot();
  });

  it("Should render Payment Detail correctly", () => {
    const { getByText } = renderPaymentDetails();
    expect(getByText(`**** **** **** ${cardLast4Digit}`)).toBeTruthy();
  });

  it("onOpenPinCodeModal triggered when click show Card Digit", async () => {
    const mockOnOpenPinCodeModal = jest.fn();

    const { getByTestId } = renderPaymentDetails({
      onOpenPinCodeModal: mockOnOpenPinCodeModal,
    });

    fireEvent.click(getByTestId("btn-eyes"));
    expect(mockOnOpenPinCodeModal).toHaveBeenCalled();
  });

  it("Should show Card Digit when confirm correctly PIN code", async () => {
    const { getByTestId, getAllByTestId, getByText } = renderPaymentDetails();

    const handleKeyDownPinCodeField = (index: number) => {
      waitFor(() =>
        fireEvent.keyDown(getAllByTestId("pin-code-input")[index], {
          key: DIGIT_1,
        }),
      );
    };

    await waitFor(() => fireEvent.click(getByTestId("btn-eyes")));

    handleKeyDownPinCodeField(0);
    handleKeyDownPinCodeField(1);
    handleKeyDownPinCodeField(2);
    handleKeyDownPinCodeField(3);
    handleKeyDownPinCodeField(4);
    handleKeyDownPinCodeField(5);

    fireEvent.click(getByText("Submit"));
    expect(getByText(cardNumber)).toBeTruthy();
  });
});
