import { render } from "@testing-library/react";

// Components
import ProductInfoDetail from "./ProductInfoDetail";

//Mocks
import { MOCK_PRODUCT_INFO_DETAIL } from "@/mocks";

describe("ProductInfoDetail Testing", () => {
  const { price, productName, description, quantity } =
    MOCK_PRODUCT_INFO_DETAIL;

  it("should match snapshot", () => {
    const { container } = render(
      <ProductInfoDetail
        price={price}
        productName={productName}
        description={description}
        quantity={quantity}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render Out Of Stock", () => {
    const quantityEqualsZero = 0;

    const { getByText } = render(
      <ProductInfoDetail
        price={price}
        productName={productName}
        description={description}
        quantity={quantityEqualsZero}
      />,
    );
    expect(getByText("Out Of Stock")).toBeInTheDocument;
  });
});
