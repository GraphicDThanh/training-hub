// Libs
import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

// Contexts
import ToastProvider from "@/context/toast";
import { useToast } from "@/context/toast";

// Hocs
import { TOAST_TYPE } from "@/hocs/withToast";

const ChildWithOpenToast = () => {
  const openToast = useToast();

  const handleOpenToast = () => {
    openToast({
      type: TOAST_TYPE.SUCCESS,
      message: "Test open toast success",
    });
  };

  return (
    <div>
      Test Toast Context
      <button onClick={handleOpenToast}>Open Toast</button>
    </div>
  );
};

describe("Test Session Context", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setupRenderWithOpenToast = () => {
    return render(
      <ToastProvider>
        <ChildWithOpenToast />
      </ToastProvider>,
    );
  };

  it("Should match snapshot open toast and show content message on toast", async () => {
    const { container, getByText, queryByTestId } = setupRenderWithOpenToast();
    expect(container).toMatchSnapshot();

    const button = getByText("Open Toast");
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByTestId("toast")).toBeTruthy();
      expect(getByText("Test open toast success")).toBeTruthy();
    });
  });

  it("Should throw error in case context is undefined", async () => {
    jest.spyOn(React, "useContext").mockImplementation(() => {
      undefined;
    });

    jest.spyOn(console, "error").mockImplementation(() => null);

    expect(() => setupRenderWithOpenToast()).toThrow();
  });
});
