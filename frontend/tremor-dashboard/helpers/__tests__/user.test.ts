// Utils
import { getUserFromCookies } from "@/helpers";

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockReturnValue({
      value: 209,
    }),
  })),
}));

describe("getUserFromCookies", () => {
  it("should return the user ID when called with the correct key", () => {
    expect(getUserFromCookies().id).toBe(209);
  });
});
