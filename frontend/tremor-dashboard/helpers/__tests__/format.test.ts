import {
  convertFromStringToInteger,
  covertAmountToNumber,
  formatAmountNumber,
  isNaNFormat,
} from "@/helpers";

describe("formatAmountNumber", () => {
  it("formats amount number correctly", () => {
    expect(formatAmountNumber("1,000,000")).toBe("1,000,000");
  });

  it("formats amount number is not correctly", () => {
    expect(formatAmountNumber("")).toBeFalsy();
  });

  it("The number of formats whose value after the dot is greater than 2 numbers", () => {
    expect(formatAmountNumber("123.4567")).toBe("123.45");
  });
});

describe("isNaNFormat", () => {
  it("value is number", () => {
    expect(isNaNFormat("1,234.00")).toBeFalsy();
  });

  it("value is string", () => {
    expect(isNaNFormat("abc")).toBeTruthy();
  });
});

describe("covertAmountToNumber", () => {
  it("converts with value has commas", () => {
    expect(covertAmountToNumber("1,000")).toBe(1000);
  });

  it("converts with value has both commas and dot", () => {
    expect(covertAmountToNumber("69,000.00")).toBe(69000);
  });
});

describe("convertFromStringToInteger", () => {
  it("converts a valid string to integer", () => {
    const id = "123";

    const result = convertFromStringToInteger(id);
    expect(result).toBe(123);
  });

  it("return NaN for non-numeric strings", () => {
    const id = "Lou Lou";

    const result = convertFromStringToInteger(id);
    expect(result).toBeNaN();
  });
});
