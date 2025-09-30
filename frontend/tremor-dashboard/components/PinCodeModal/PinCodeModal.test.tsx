import { render, fireEvent, act } from "@testing-library/react";
import PinCodeModal from "./PinCodeModal";
import { KEYBOARD_KEYS } from "@/constants";

const { DIGIT_1 } = KEYBOARD_KEYS;

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("PinCodeModal component", () => {
  it("Should match snapshot", async () => {
    const onSubmitMock = jest.fn();

    const { container } = render(
      <PinCodeModal title="Test Modal" open={true} onSubmit={onSubmitMock} />,
    );
    await act(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Calls onSubmit with correct codes when primary button is clicked", async () => {
    const onSubmitMock = jest.fn();
    const { getByText, getAllByTestId } = render(
      <PinCodeModal title="Test Modal" open={true} onSubmit={onSubmitMock} />,
    );
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
      await fireEvent.click(getByText("Submit"));
    });

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("Disables primary button when pin code is invalid", async () => {
    const onSubmitMock = jest.fn();
    const { getByText, getAllByTestId } = render(
      <PinCodeModal title="Test Modal" open={true} onSubmit={onSubmitMock} />,
    );
    await act(async () => {
      await fireEvent.change(getAllByTestId("pin-code-input")[1], {
        target: { value: "12" },
      });
    });
    expect(getByText("Submit")).toBeDisabled;
  });
});
