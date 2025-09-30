import { render } from "@testing-library/react";

// Components
import CustomList from "./CustomList";

// Mocks
import { MOCK_PRODUCTS_SHORTER_FORM } from "@/mocks";

import { OrderProduct } from "@/types";

describe("CustomList component", () => {
  it("should render item list correctly", () => {
    const { container } = render(
      <CustomList products={MOCK_PRODUCTS_SHORTER_FORM} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should test how many items rendered", () => {
    const { getAllByTestId } = render(
      <CustomList products={MOCK_PRODUCTS_SHORTER_FORM} />,
    );
    const lengthList = MOCK_PRODUCTS_SHORTER_FORM.length;
    expect(getAllByTestId("order-product")).toHaveLength(lengthList);
  });

  it("should not render any items if empty products", () => {
    const { queryAllByTestId } = render(
      <CustomList products={[] as OrderProduct[]} />,
    );
    expect(queryAllByTestId("order-product")).toHaveLength(0);
  });
});
