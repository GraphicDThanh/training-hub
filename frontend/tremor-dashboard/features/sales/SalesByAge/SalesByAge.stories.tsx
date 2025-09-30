import type { Meta, StoryObj } from "@storybook/react";

// Components
import SalesByAge from ".";

// Mock data
import { SALES_AGE_CHART } from "@/mocks";

const meta = {
  title: "Components/Sales/SalesByAge",
  component: SalesByAge,
  tags: ["autodocs"],
  argTypes: {
    title: { description: "Title of sale age chart" },
    data: { description: "Data of sale age chart" },
  },
} as Meta<typeof SalesByAge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SalesByAgeComponent: Story = {
  args: {
    title: "Sales by Age",
    data: SALES_AGE_CHART,
  },
};
