import type { Meta, StoryObj } from "@storybook/react";

// Components
import InvoiceLogo from "./InvoiceLogo";
import { color } from "@/themes";

const meta = {
  title: "Components/Invoices/InvoiceLogo",
  component: InvoiceLogo,
  tags: ["autodocs"],
  argTypes: {
    color: { description: "Color of logo site" },
    additionalClasses: { description: "Class of logo site" },
  },
} as Meta<typeof InvoiceLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InvoiceLogoDefault: Story = {
  args: {
    color: color.black,
    additionalClasses: "",
  },
};
