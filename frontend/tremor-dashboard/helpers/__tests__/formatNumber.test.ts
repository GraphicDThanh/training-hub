import {
  convertPhoneNumberToString,
  formatCreditCard,
  formatPhoneNumber,
  numberWithCommas,
} from "../formatNumber";

describe("formatPhoneNumber", () => {
  it("should return an empty string if the input is falsy", () => {
    expect(formatPhoneNumber("")).toBe("");
  });

  it("should format the phone number correctly when the length is less than 4", () => {
    expect(formatPhoneNumber("123")).toBe("123");
    expect(formatPhoneNumber("1234")).toBe("(123) 4");
  });

  it("should format the phone number correctly when the length is between 4 and 6", () => {
    expect(formatPhoneNumber("123456")).toBe("(123) 456");
    expect(formatPhoneNumber("1234567")).toBe("(123) 456-7");
  });

  it("should format the phone number correctly when the length is greater than 7", () => {
    expect(formatPhoneNumber("123456789")).toBe("(123) 456-789");
    expect(formatPhoneNumber("123456789012345")).toBe("(123) 456-7890");
  });
});

describe("convertPhoneNumberToString", () => {
  it("should return an empty string if the input is falsy", () => {
    expect(convertPhoneNumberToString("")).toBe("");
  });

  it("should remove any non-digit characters from the input", () => {
    expect(convertPhoneNumberToString("123-456-7890")).toBe("1234567890");
    expect(convertPhoneNumberToString("123 456 7890")).toBe("1234567890");
    expect(convertPhoneNumberToString("123.456.7890")).toBe("1234567890");
  });

  it("should format the phone number correctly when the length is 10 digits", () => {
    expect(convertPhoneNumberToString("1234567890")).toBe("1234567890");
  });

  it("should not format the phone number if the length is not 10 digits", () => {
    expect(convertPhoneNumberToString("123456789")).toBe("123456789");
    expect(convertPhoneNumberToString("12345678901")).toBe("12345678901");
  });
});

describe("numberWithCommas", () => {
  it("should return an empty string if the input is falsy", () => {
    expect(numberWithCommas("")).toBe("");
  });

  it("should add commas to the number correctly", () => {
    expect(numberWithCommas(1000)).toBe("1,000");
    expect(numberWithCommas(1000000)).toBe("1,000,000");
    expect(numberWithCommas(1234567.89)).toBe("1,234,567.89");
  });

  it("should not add commas to the number if it is less than 1000", () => {
    expect(numberWithCommas(999)).toBe("999");
    expect(numberWithCommas(100)).toBe("100");
    expect(numberWithCommas(1)).toBe("1");
  });

  it("should handle negative numbers correctly", () => {
    expect(numberWithCommas(-1000)).toBe("-1,000");
    expect(numberWithCommas(-1000000)).toBe("-1,000,000");
    expect(numberWithCommas(-1234567.89)).toBe("-1,234,567.89");
  });

  it("Should return format correctly Card digit", () => {
    expect(formatCreditCard("1234123412341234")).toEqual("1234 1234 1234 1234");
  });
});
