import type { Meta, StoryObj } from "@storybook/react";

// Components
import InvoiceBody from "./InvoiceBody";
import { Card } from "@tremor/react";

// Constants
import { MOCK_INVOICE_DATA } from "@/mocks";

const meta = {
  title: "Components/Invoices/InvoiceBody",
  component: InvoiceBody,
  tags: ["autodocs"],
  argTypes: {
    id: { description: "Id of invoice detail body" },
    createdAt: { description: "Create date of invoice detail body" },
    dueAt: { description: "Due date of invoice detail body" },
    products: { description: "Products of invoice detail body" },
    totalCost: { description: "Total cost of invoice detail body" },
  },
} as Meta<typeof InvoiceBody>;

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
  args: {
    id: MOCK_INVOICE_DATA.id,
    createdAt: MOCK_INVOICE_DATA.createdAt,
    dueAt: MOCK_INVOICE_DATA.dueAt,
    products: MOCK_INVOICE_DATA.products,
    totalCost: MOCK_INVOICE_DATA.totalCost,
  },
};
