import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { withPinCode } from "../withPinCode";
// Contexts
import { PinCodeProvider } from "@/context/pincode";
// Hocs
import { TWithPinCode } from "@/hocs/withPinCode";

import { KEYBOARD_KEYS } from "@/constants";

const { DIGIT_1 } = KEYBOARD_KEYS;

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockReturnValue({
      value: 101,
    }),
  })),
}));

jest.mock("@/context", () => ({
  usePinCode: jest.fn(),
}));

describe("withPinCode tests", () => {
  it("should show modal pincode when call onOpenPinCodeModal", async () => {
    const ComponentWithOpenPinCodeModal = ({
      onOpenPinCodeModal,
    }: TWithPinCode<{}>) => {
      const handleOpenPinCodeModal = () => {
        onOpenPinCodeModal();
      };
      return (
        <button
          data-testid="open-modal-pincode"
          onClick={handleOpenPinCodeModal}>
          Test open PinCodeModal
        </button>
      );
    };

    const setup = () => {
      const ComponentWithPincode = withPinCode(ComponentWithOpenPinCodeModal);
      return render(<ComponentWithPincode />);
    };
    const { getByTestId, queryByTestId } = setup();
    const buttonOpenModal = getByTestId("open-modal-pincode");
    await act(() => {
      fireEvent.click(buttonOpenModal);
    });

    await waitFor(() => {
      expect(queryByTestId("modal-pincode")).toBeTruthy();
    });
  });

  it("should close modal pincode when call onClosePinCodeModal", async () => {
    const ComponentWithOpenPinCodeModal = ({
      onOpenPinCodeModal,
    }: TWithPinCode<{}>) => {
      const handleOpenPinCodeModal = () => {
        onOpenPinCodeModal();
      };
      return (
        <button
          data-testid="open-modal-pincode"
          onClick={handleOpenPinCodeModal}>
          Test open PinCodeModal
        </button>
      );
    };

    const setup = () => {
      const ComponentWithPincode = withPinCode(ComponentWithOpenPinCodeModal);
      return render(<ComponentWithPincode />);
    };

    const { getByTestId, queryByTestId } = setup();
    const btnOpenModal = getByTestId("open-modal-pincode");

    await act(() => {
      fireEvent.click(btnOpenModal);
    });

    await waitFor(() => {
      expect(queryByTestId("modal-pincode")).toBeTruthy();
    });
    const btnCloseModal = getByTestId("btn-close-modal");

    await act(() => {
      fireEvent.click(btnCloseModal);
    });

    await waitFor(() => {
      expect(queryByTestId("modal-pincode")).toBeFalsy();
    });
  });

  it("should change input value field pincode to enable and submit button set pincode", async () => {
    const responseData = { success: true };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const ComponentWithOpenPinCodeModal = ({
      onOpenPinCodeModal,
    }: TWithPinCode<{}>) => {
      const handleOpenPinCodeModal = () => {
        onOpenPinCodeModal();
      };
      return (
        <button
          data-testid="open-modal-pincode"
          onClick={handleOpenPinCodeModal}>
          Test open PinCodeModal
        </button>
      );
    };

    const setup = () => {
      const ComponentWithPincode = withPinCode(ComponentWithOpenPinCodeModal);
      return render(
        <PinCodeProvider>
          <ComponentWithPincode />
        </PinCodeProvider>,
      );
    };
    const { getByTestId, queryByTestId, getAllByTestId, getByText } = setup();
    const buttonOpenModal = getByTestId("open-modal-pincode");
    await act(() => {
      fireEvent.click(buttonOpenModal);
    });

    await waitFor(() => {
      expect(queryByTestId("modal-pincode")).toBeTruthy();
    });

    const inputFields = getAllByTestId("pin-code-input");
    fireEvent.keyDown(inputFields[0], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[1], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[2], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[3], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[4], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[5], { key: DIGIT_1 });

    const buttonSubmitModal = getByText("Set");
    await waitFor(() => {
      expect(buttonSubmitModal.disabled).not.toBeTruthy();
    });

    await act(async () => {
      fireEvent.click(buttonSubmitModal);
    });
    expect(inputFields[0].value).toEqual("1");
    expect(inputFields[1].value).toEqual("1");
    expect(inputFields[2].value).toEqual("1");
    expect(inputFields[3].value).toEqual("1");
    expect(inputFields[4].value).toEqual("1");
    expect(inputFields[5].value).toEqual("1");
  });

  it("should show message error 'PIN code not match!' if submit pincode with value not match with provider pincode", async () => {
    const ComponentWithOpenPinCodeModal = ({
      onOpenPinCodeModal,
    }: TWithPinCode<{}>) => {
      const handleOpenPinCodeModal = () => {
        onOpenPinCodeModal();
      };
      return (
        <button
          data-testid="open-modal-pincode"
          onClick={handleOpenPinCodeModal}>
          Test open PinCodeModal
        </button>
      );
    };

    const setup = () => {
      const ComponentWithPincode = withPinCode(ComponentWithOpenPinCodeModal);
      return render(
        <PinCodeProvider pinCode="123456">
          <ComponentWithPincode />
        </PinCodeProvider>,
      );
    };
    const {
      getByTestId,
      queryByTestId,
      getAllByTestId,
      getByText,
      getAllByText,
    } = setup();
    const buttonOpenModal = getByTestId("open-modal-pincode");
    await act(() => {
      fireEvent.click(buttonOpenModal);
    });

    await waitFor(() => {
      expect(queryByTestId("modal-pincode")).toBeTruthy();
    });

    const inputFields = getAllByTestId("pin-code-input");
    fireEvent.keyDown(inputFields[0], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[1], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[2], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[3], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[4], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[5], { key: DIGIT_1 });

    const buttonSubmitModal = getByText("Submit");
    await waitFor(() => {
      expect(buttonSubmitModal.disabled).not.toBeTruthy();
    });

    await act(async () => {
      fireEvent.click(buttonSubmitModal);
    });

    expect(getAllByText("PIN code not match!")).toBeTruthy();
  });
});
