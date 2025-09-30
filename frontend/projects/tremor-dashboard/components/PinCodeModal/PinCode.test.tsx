import { render, fireEvent, cleanup } from "@testing-library/react";
import { IPinCode, PinCode } from "./PinCode";
import { KEYBOARD_KEYS } from "@/constants";

const { BACKSPACE, DIGIT_1 } = KEYBOARD_KEYS;

let onChangeMock = jest.fn();
beforeEach(() => {
  cleanup();
  onChangeMock = jest.fn();
});

const setup = (overrideProps?: Partial<IPinCode>) => {
  return render(<PinCode onChange={onChangeMock} {...overrideProps} />);
};

describe("PinCode component", () => {
  it("Should match snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("Should render correctly match props", () => {
    const { getAllByTestId, container } = setup({ length: 4, value: "12" });
    const inputFields = getAllByTestId("pin-code-input") as HTMLInputElement[];
    expect(inputFields.length).toEqual(4);
    expect(container).toMatchSnapshot();
  });

  it("Should auto focus first Field", () => {
    const { getAllByTestId } = setup({ length: 4, value: "12" });
    const inputFields = getAllByTestId("pin-code-input") as HTMLInputElement[];
    expect(inputFields[0].className).toContain("focused");
    expect(inputFields[0].value).toEqual("");
  });

  it("Handles pin code changes and updates the value accordingly", () => {
    const { getAllByTestId } = setup();

    const inputFields = getAllByTestId("pin-code-input");
    fireEvent.keyDown(inputFields[0], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[1], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[2], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[3], { key: DIGIT_1 });

    expect(onChangeMock).toHaveBeenCalledTimes(4);
  });

  it("Shifts focus to the next input field when a digit is entered", () => {
    const { getAllByTestId } = setup({ value: "21" });

    const inputFields = getAllByTestId("pin-code-input");
    fireEvent.keyDown(inputFields[0], { key: DIGIT_1 });

    expect(inputFields[1].className).toContain("focused");
  });

  it("Shifts focus to the previous input field when the default pin code is entered", () => {
    const { getAllByTestId } = setup();

    const inputFields = getAllByTestId("pin-code-input");
    fireEvent.keyDown(inputFields[0], { key: DIGIT_1 });
    fireEvent.keyDown(inputFields[1], {
      key: BACKSPACE,
    });
    expect(inputFields[0].className).toContain("focused");
  });
});
