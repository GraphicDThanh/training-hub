import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

// Components
import ProductDetail from "./ProductDetail";

//Mocks
import { MOCK_PRODUCTS } from "@/mocks";

// Constants
import { ROUTES } from "@/constants";

describe("ProductDetail Testing", () => {
  const { id, price, productName, description, quantity, image } =
    MOCK_PRODUCTS[0];

  const propData = {
    id: id,
    price: price,
    productName: productName,
    description: description,
    quantity: quantity,
    image: image,
  };

  it("should match snapshot", () => {
    const { container } = render(<ProductDetail {...propData} />);
    expect(container).toMatchSnapshot();
  });

  it("should render text In Stock if quantity is 0", () => {
    const { getByText } = render(<ProductDetail {...propData} quantity={0} />);
    expect(getByText("Out Of Stock")).toBeTruthy();
  });

  it("should render text In Stock if quantity is 2 greater than 0", () => {
    const { getByText } = render(<ProductDetail {...propData} quantity={2} />);
    expect(getByText("In Stock")).toBeTruthy();
  });

  it("should check link Edit Product have href contain content link to edit product page", () => {
    const { getByText } = render(<ProductDetail {...propData} />);

    expect(getByText("Edit Product").href).toContain(
      `${ROUTES.PRODUCTS}/${id}/edit-product`,
    );
  });

  it("should check click Edit Product will link to edit product page", () => {
    const { getByText } = render(<ProductDetail {...propData} />, {
      wrapper: MemoryRouterProvider,
    });

    fireEvent.click(getByText("Edit Product"));
    expect(mockRouter.asPath).toEqual(`${ROUTES.PRODUCTS}/${id}/edit-product`);
  });
});
