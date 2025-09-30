import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { IPinCodeField, PinCodeField } from "./PinCodeField";
import { PIN_CODE_DEFAULT, KEYBOARD_KEYS } from "@/constants";

const { BACKSPACE, DIGIT_1 } = KEYBOARD_KEYS;

let onChange: () => void;

beforeEach(() => {
  cleanup();
  onChange = jest.fn();
});

const setup = (overrideProps?: Partial<IPinCodeField>) => {
  return render(
    <PinCodeField index={0} onChange={onChange} {...overrideProps} />,
  );
};

describe("PinCodeField", () => {
  it("Should match snapshot", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it("Handles change event correctly", () => {
    const { getByTestId } = setup();
    const inputElement = getByTestId("pin-code-input");

    fireEvent.keyDown(inputElement, { key: DIGIT_1 });

    expect(onChange).toHaveBeenCalledWith(DIGIT_1, 0);
  });

  it("Handles backspace key correctly", () => {
    const { getByTestId } = setup();
    const inputElement = getByTestId("pin-code-input");

    fireEvent.keyDown(inputElement, { key: BACKSPACE, code: BACKSPACE });

    expect(onChange).toHaveBeenCalledWith(PIN_CODE_DEFAULT, 0);
  });

  it("Should clear input on focus", () => {
    const { getByTestId } = setup({ value: DIGIT_1 });
    const inputElement = getByTestId("pin-code-input") as HTMLInputElement;
    fireEvent.focus(inputElement);
    expect(inputElement.value).toBe("");
  });

  it("Should restores input value on blur", () => {
    const { getByTestId } = setup({ value: DIGIT_1 });
    const inputElement = getByTestId("pin-code-input") as HTMLInputElement;
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe(DIGIT_1);
  });

  it("Should switch input type to password if value is not default", () => {
    const { getByTestId } = setup({ value: DIGIT_1 });
    const inputElement = getByTestId("pin-code-input");
    expect(inputElement.getAttribute("type")).toBe("password");
  });

  it('onChange triggered when keydown is number or "Backspace"', () => {
    const { getByTestId } = setup();
    const inputElement = getByTestId("pin-code-input");

    fireEvent.keyDown(inputElement, { key: DIGIT_1 });
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(inputElement, { key: BACKSPACE });
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('OnChange not triggered when keydown not is number or "Backspace"', () => {
    const { getByTestId } = setup();
    const inputElement = getByTestId("pin-code-input");

    fireEvent.keyDown(inputElement, { key: "e" });

    expect(onChange).not.toHaveBeenCalled();
  });
});
