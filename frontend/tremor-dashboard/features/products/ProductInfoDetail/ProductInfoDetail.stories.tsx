import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProductInfoDetail from "./ProductInfoDetail";

//Mocks
import { MOCK_PRODUCT_INFO_DETAIL } from "@/mocks";

const meta = {
  title: "Components/Products/ProductInfoDetail",
  component: ProductInfoDetail,
  tags: ["autodocs"],
  argTypes: {
    id: { description: "Id of product detail" },
    productName: { description: "Name of product detail" },
    description: { description: "Description of product detail" },
    price: { description: "Price of product detail" },
    quantity: { description: "Quantity of product detail" },
  },
} as Meta<typeof ProductInfoDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

const { price, productName, description, quantity } = MOCK_PRODUCT_INFO_DETAIL;

export const ProductInfoDetailDefault: Story = {
  render: () => (
    <div className="dark:bg-dark-blue text-primary rounded-xl p-6 shadow-box-icon-default dark:shadow-main-content">
      <ProductInfoDetail
        price={price}
        productName={productName}
        description={description}
        quantity={quantity}
      />
    </div>
  ),
};
