import type { Meta, StoryObj } from "@storybook/react";

// Components
import OrderSummary from "./OrderSummary";
import { Card } from "@tremor/react";

// Mocks
import { MOCK_ORDER_SUMMARY } from "@/mocks";

const meta = {
  title: "Components/Orders/OrderSummary",
  component: OrderSummary,
  tags: ["autodocs"],
  argTypes: {
    productPrice: { description: "Product price of order" },
    delivery: { description: "Delivery of order" },
    taxes: { description: "Taxes of order" },
  },
} as Meta<typeof OrderSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <Card className="w-2/3 dark:bg-dark-blue">
        <Story />
      </Card>
    ),
  ],
  args: { ...MOCK_ORDER_SUMMARY },
};
