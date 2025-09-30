import type { Meta, StoryObj } from "@storybook/react";

// Components
import InvoiceFooter from "./InvoiceFooter";
import { Card } from "@tremor/react";

const meta = {
  title: "Components/Invoices/InvoiceFooter",
  component: InvoiceFooter,
  tags: ["autodocs"],
} as Meta<typeof InvoiceFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <Card className="w-full dark:bg-dark-blue p-6 ring-0 rounded-xl shadow-md">
        <Story />
      </Card>
    ),
  ],
  args: {},
};
