import { MOCK_PRODUCTS } from "@/mocks";
import { getOtherProducts } from "../product";

describe("getOtherProducts tests", () => {
  it("Should return array no contain item has it equal 230019", () => {
    const otherProducts = getOtherProducts(MOCK_PRODUCTS, 230019, 2);
    expect(otherProducts).not.toStrictEqual([{ id: 230019 }]);
  });

  it("Should return array has length is 2", () => {
    const otherProducts = getOtherProducts(MOCK_PRODUCTS, 230019, 2);
    expect(otherProducts).toHaveLength(2);
  });
});
