import type { Meta, StoryObj } from "@storybook/react";

// Components
import OrderHeader from "./OrderHeader";
import { Card } from "@tremor/react";

// Mocks
import { MOCK_INVOICE_ORDER_HEADER } from "@/mocks";

const meta = {
  title: "Components/Orders/OrderHeader",
  component: OrderHeader,
  tags: ["autodocs"],
  argTypes: {
    id: { description: "Id of order" },
    createdAt: { description: "Created at of order" },
    orderCode: { description: "Code of order" },
  },
} as Meta<typeof OrderHeader>;

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
  args: {
    ...MOCK_INVOICE_ORDER_HEADER,
  },
};
