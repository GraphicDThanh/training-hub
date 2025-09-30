import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import BillingDetail from "./BillingDetail";

// Mocks
import { AGGREGATION_TYPE, KEYBOARD_KEYS } from "@/constants";
import { PinCodeProvider } from "@/context/pincode";

const { DIGIT_1 } = KEYBOARD_KEYS;

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

const propsMock = (hasCardNumber: boolean) => ({
  cardInfo: {
    cardNumber: hasCardNumber ? "" : "4562 1122 4594 7852",
    holderFullName: "Jack Peterson",
    expire: "11/24",
    cardLast4Digit: "7852",
  },
  aggregation: [
    {
      value: 12324,
      type: AGGREGATION_TYPE.SALARY,
      currency: "$",
    },

    {
      value: 56789,
      type: AGGREGATION_TYPE.PAYPAL,
      currency: "$",
    },
  ],
});

describe("Testing BillingInfo component", () => {
  const setupRender = () => {
    return render(
      <PinCodeProvider pinCode="111111">
        <BillingDetail {...propsMock(false)} />,
      </PinCodeProvider>,
    );
  };

  it("Should match snapshot", () => {
    const { container } = render(<BillingDetail {...propsMock(true)} />);
    expect(container).toMatchSnapshot();
  });

  it("Should open PIN code modal when isShowAmount is false and toggleShowHide", async () => {
    const { getByTestId } = setupRender();

    fireEvent.click(getByTestId("toggle-show-amount"));

    const modal = await waitFor(() => getByTestId("modal-pincode"));
    expect(modal).toBeTruthy();
    expect(modal).toMatchSnapshot();
  });

  it("Should submit success when typing pin code correctly", async () => {
    const { getByTestId, getAllByTestId, getByText } = setupRender();

    fireEvent.click(getByTestId("toggle-show-amount"));

    await waitFor(() => getByTestId("modal-pincode"));

    const clickPinCodeField = (index: number) => {
      waitFor(() =>
        fireEvent.keyDown(getAllByTestId("pin-code-input")[index], {
          key: DIGIT_1,
        }),
      );
    };

    clickPinCodeField(0);
    clickPinCodeField(1);
    clickPinCodeField(2);
    clickPinCodeField(3);
    clickPinCodeField(4);
    clickPinCodeField(5);

    waitFor(() =>
      expect(fireEvent.click(getByText("Submit"))).toHaveBeenCalled(),
    );
  });
});
