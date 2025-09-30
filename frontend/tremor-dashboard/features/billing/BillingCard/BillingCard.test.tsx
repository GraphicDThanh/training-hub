import { fireEvent, render, waitFor } from "@testing-library/react";

// Constants
import { KEYBOARD_KEYS } from "@/constants";

// Components
import BillingCard from "./BillingCard";
import { PinCodeProvider } from "@/context/pincode";

const { DIGIT_1 } = KEYBOARD_KEYS;

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("Testing BillingCard component", () => {
  const setupRender = () => {
    return render(
      <PinCodeProvider pinCode="111111">
        <BillingCard
          cardNumber="4562 1122 4594 7852"
          holderFullName="Jack Peterson"
          expire="11/24"
          cardLast4Digit="7852"
        />
        ,
      </PinCodeProvider>,
    );
  };

  it("Should match snapshot", () => {
    const { container } = setupRender();
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
    const { getByTestId, getAllByTestId, getByText, container } = setupRender();

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

    fireEvent.click(getByText("Submit"));

    expect(container).toMatchSnapshot();

    expect(getByText("4562 1122 4594 7852")).toBeTruthy();

    fireEvent.click(getByTestId("toggle-show-amount"));

    expect(getByText("**** **** **** 7852")).toBeInTheDocument;
  });
});
