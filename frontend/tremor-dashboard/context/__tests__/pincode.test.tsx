// Libs
import { fireEvent, render, act } from "@testing-library/react";
import React from "react";

// Contexts
import { PinCodeProvider, usePinCode } from "@/context/pincode";

const mockUpdatePinCode = jest.fn();

mockUpdatePinCode.mockImplementation(() =>
  Promise.resolve({
    errorMessage: "False",
  }),
);

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockReturnValue({
      value: 101,
    }),
  })),
}));

jest.mock("@/services", () => ({
  updatePinCode: () => mockUpdatePinCode(),
}));

const Child = () => {
  const { setPinCode } = usePinCode();
  return (
    <button data-testid="set-pin-code" onClick={() => setPinCode("123678")}>
      Set Pin Code
    </button>
  );
};

const setup = () => {
  return render(
    <PinCodeProvider pinCode="123456">
      <Child />
    </PinCodeProvider>,
  );
};

describe("Conversation Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call updatePinCode when click setPincode and handleSetPinCode called in case success", async () => {
    const responseData = { success: true };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const { getByTestId } = setup();

    const setPincodeBtn = getByTestId("set-pin-code");
    expect(setPincodeBtn).toBeTruthy();

    await act(async () => {
      await fireEvent.click(setPincodeBtn);
    });
    expect(mockUpdatePinCode).toHaveBeenCalled();
  });

  it("should call updatePinCode when click setPincode and handleSetPinCode called in case false", async () => {
    const responseData = {
      errorMessage: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { getByTestId } = setup();

    const setPincodeBtn = getByTestId("set-pin-code");
    expect(setPincodeBtn).toBeTruthy();

    await act(async () => {
      await fireEvent.click(setPincodeBtn);
    });

    expect(mockUpdatePinCode).toHaveBeenCalled();
  });

  it("Should throw an error if useContext is undefined", async () => {
    jest.spyOn(React, "useContext").mockImplementation(() => {
      undefined;
    });

    jest.spyOn(console, "error").mockImplementation(() => null);

    expect(() => setup()).toThrow();
  });
});
