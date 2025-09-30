import type { Meta, StoryObj } from "@storybook/react";

// Components
import TableInvoice from "./TableInvoice";

// Constants
import { MOCK_INVOICE_DATA } from "@/mocks";

const meta = {
  title: "Components/Invoices/TableInvoice",
  component: TableInvoice,
  tags: ["autodocs"],
  argTypes: {
    details: { description: "Data detail of invoice" },
    totalCost: { description: "Total cost of invoice" },
  },
} as Meta<typeof TableInvoice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    details: MOCK_INVOICE_DATA.products,
    totalCost: MOCK_INVOICE_DATA.totalCost,
  },
};
