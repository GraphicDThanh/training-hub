// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import InvoiceHeader from "./InvoiceHeader";

// Mocks
import { MOCK_INVOICE_HEADER } from "@/mocks";

const meta = {
  title: "Components/Invoices/InvoiceHeader",
  tags: ["autodocs"],
  component: InvoiceHeader,
  argTypes: {
    addressBank: { description: "Address of bank of site" },
    cityBank: { description: "City of bank of site" },
    stateBank: { description: "State of bank of site" },
    phoneBank: { description: "Phone number of site" },
    fullName: { description: "Full name of customer" },
    addressCustomer: { description: "Address of customer" },
    cityCustomer: { description: "City of customer" },
    stateCode: { description: "Code state of customer" },
    stateCustomer: { description: "State of customer" },
  },
} as Meta<typeof InvoiceHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <div className="dark:bg-dark-blue text-primary rounded-xl p-6 shadow-box-icon-default dark:shadow-main-content">
        <Story />
      </div>
    ),
  ],
  args: {
    ...MOCK_INVOICE_HEADER,
  },
};
