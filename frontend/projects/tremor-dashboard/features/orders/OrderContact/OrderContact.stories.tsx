import type { Meta, StoryObj } from "@storybook/react";

// Components
import OrderContact from "./OrderContact";
import { Card } from "@tremor/react";

// Mocks
import { MOCK_ORDER_CONTACT } from "@/mocks";

const meta = {
  title: "Components/Orders/OrderContact",
  component: OrderContact,
  tags: ["autodocs"],
  argTypes: {
    name: { description: "Product name of order detail contact" },
    url: { description: "Product url order detail contact" },
    date: { description: "Date of order detail contact" },
  },
} as Meta<typeof OrderContact>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    Story => (
      <Card className="w-full dark:bg-dark-blue px-6 py-7 ring-0 rounded-xl shadow-md">
        <Story />
      </Card>
    ),
  ],
  args: { ...MOCK_ORDER_CONTACT },
};
