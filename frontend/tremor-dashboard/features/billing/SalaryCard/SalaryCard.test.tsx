import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mocks
import { MOCK_SALARY_DATA } from "@/mocks";

// Hocs
import { TWithPinCode } from "@/hocs/withPinCode";

// Types
import { SalaryCardData } from "@/types";

// Contexts
import { PinCodeProvider } from "@/context/pincode";

// Constants
import { KEYBOARD_KEYS } from "@/constants";

// Helpers
import { moneyFormat } from "@/helpers";

// Components
import { SalaryCard } from "..";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

const setup = (overrideProps?: Partial<TWithPinCode<SalaryCardData>>) => {
  return render(
    <PinCodeProvider pinCode="111111">
      <SalaryCard {...MOCK_SALARY_DATA[0]} {...overrideProps} />
    </PinCodeProvider>,
  );
};

const { DIGIT_1 } = KEYBOARD_KEYS;

describe("SalaryCard Testing", () => {
  it("Should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("Should open PIN code modal when isShowAmount is false and toggleShowHide", async () => {
    const { getByTestId } = setup({
      type: MOCK_SALARY_DATA[1].type,
    });

    fireEvent.click(getByTestId("btn-eyes"));

    const modal = await waitFor(() => getByTestId("modal-pincode"));
    expect(modal).toBeTruthy();
    expect(modal).toMatchSnapshot();
  });

  it("Should submit success when typing pin code correctly", async () => {
    const { getByTestId, getAllByTestId, getByText, container } = setup({
      value: 14444,
    });

    fireEvent.click(getByTestId("btn-eyes"));

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

    expect(getByText("Submit")).not.toBeDisabled();
    fireEvent.click(getByText("Submit"));

    expect(container).toMatchSnapshot();

    expect(
      getByText(
        moneyFormat({
          value: 14444,
          currency: "$",
        }),
      ),
    ).toBeTruthy();

    fireEvent.click(getByTestId("btn-eyes"));

    expect(getByText("*****")).toBeInTheDocument;
  });

  it("Should open PIN code modal when isShowAmount is false and toggleShowHide", async () => {
    const { getByTestId } = setup({
      type: MOCK_SALARY_DATA[1].type,
    });

    fireEvent.click(getByTestId("btn-eyes"));

    const modal = await waitFor(() => getByTestId("modal-pincode"));
    expect(modal).toBeTruthy();
    expect(modal).toMatchSnapshot();
  });
});
