import type { Meta, StoryObj } from "@storybook/react";

// Components
import PaymentDetails from "./PaymentDetails";
import { Card } from "@tremor/react";

const meta = {
  title: "Components/Orders/PaymentDetails",
  component: PaymentDetails,
  tags: ["autodocs"],
  argTypes: {
    cardLast4Digit: {
      description: "CardLast4Digit of payment detail",
    },
  },
} as Meta<typeof PaymentDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <Card className="w-full dark:bg-dark-blue px-6 py-7 ring-0 rounded-xl shadow-md">
        <Story />
      </Card>
    ),
  ],
  args: {
    cardLast4Digit: "7852",
  },
};
