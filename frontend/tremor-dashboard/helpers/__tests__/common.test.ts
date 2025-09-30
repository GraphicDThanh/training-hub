import { debounce, delay, getSubAttrsByKey } from "../common";

const TEST_TIMEOUT_DELAY = 500; // 500ms

describe("debounce tests", () => {
  it("Should trigger callback correct with timeout", async () => {
    const mockCallback = jest.fn();

    const result = debounce(mockCallback, TEST_TIMEOUT_DELAY);
    result();

    expect(mockCallback).not.toHaveBeenCalled();
    await delay(TEST_TIMEOUT_DELAY);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe("getSubAttrsByKey function", () => {
  it("should return an array of sub-attributes correctly", () => {
    const arr1 = [
      { id: 1, email: "user1@example.com" },
      { id: 2, email: "user2@example.com" },
      { id: 3, email: "user3@example.com" },
    ];

    const arr2 = [1, 3];

    const result = getSubAttrsByKey(arr1, arr2, "id", "email");

    expect(result).toEqual(["user1@example.com", "user3@example.com"]);
  });

  it("should return an empty array if no matching sub-attributes found", () => {
    const arr1 = [
      { id: 1, email: "user1@example.com" },
      { id: 2, email: "user2@example.com" },
    ];
    const arr2 = [3, 4];

    const result = getSubAttrsByKey(arr1, arr2, "id", "email");

    expect(result).toEqual([]);
  });

  // Add more test cases if needed
});
