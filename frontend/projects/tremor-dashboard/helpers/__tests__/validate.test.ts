import { MESSAGES_ERROR, AMOUNT_LIMIT } from "@/constants";
import { validateWithCurrencyLimit } from "../validate";

describe("validateWithCurrencyLimit", () => {
  it("returns true for amount below limit", () => {
    const value = "10000";
    expect(
      validateWithCurrencyLimit(
        value,
        AMOUNT_LIMIT,
        MESSAGES_ERROR.TRANSACTION.AMOUNT_LIMIT,
      ),
    ).toBe(true);
  });

  it("returns error message for amount above limit", () => {
    const value = "30000";
    expect(
      validateWithCurrencyLimit(
        value,
        AMOUNT_LIMIT,
        MESSAGES_ERROR.TRANSACTION.AMOUNT_LIMIT,
      ),
    ).toBe(MESSAGES_ERROR.TRANSACTION.AMOUNT_LIMIT);
  });
});
