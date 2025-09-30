import type { Meta, StoryObj } from "@storybook/react";

// Components
import CustomList from "./CustomList";

// Mocks
import { MOCK_PRODUCTS_SHORTER_FORM } from "@/mocks";

const meta = {
  title: "Components/Tables/CustomList",
  component: CustomList,
  tags: ["autodocs"],
  argTypes: {
    products: {
      description:
        "This is an array include products with a product have type OrderProduct(id: number; name: string; count: number; price?: number; url?: string)",
    },
  },
} as Meta<typeof CustomList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    products: MOCK_PRODUCTS_SHORTER_FORM,
  },
};
