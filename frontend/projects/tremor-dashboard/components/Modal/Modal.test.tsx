import { render, fireEvent, act } from "@testing-library/react";
import Modal from "./Modal";

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("Modal component", () => {
  const mockOnClose = jest.fn();
  const mockOnClickPrimaryBtnMock = jest.fn();
  const mockOnClickSecondaryBtnMock = jest.fn();
  const props = {
    title: "Mock title",
    open: true,
    onClose: mockOnClose,
    onClickPrimaryBtn: mockOnClickPrimaryBtnMock,
    onClickSecondaryBtn: mockOnClickSecondaryBtnMock,
    showCloseIconBtn: true,
    children: <div>Mock content</div>,
  };
  const renderModal = () => {
    return render(<Modal {...props}></Modal>);
  };

  it("Should match snapshot", async () => {
    const { container } = renderModal();
    await act(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Calls onClose when close button is clicked", async () => {
    const { getByLabelText } = renderModal();
    await act(async () => {
      await fireEvent.click(getByLabelText("Close"));
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("Calls onClickPrimaryBtn when primary button is clicked", async () => {
    const { getByText } = renderModal();
    await act(async () => {
      await fireEvent.click(getByText("Submit"));
    });
    expect(mockOnClickPrimaryBtnMock).toHaveBeenCalledTimes(1);
  });

  it("Calls onClickSecondaryBtn when secondary button is clicked", async () => {
    const { getByText } = renderModal();
    await act(async () => {
      await fireEvent.click(getByText("Done"));
    });
    expect(mockOnClickSecondaryBtnMock).toHaveBeenCalledTimes(1);
  });
});
