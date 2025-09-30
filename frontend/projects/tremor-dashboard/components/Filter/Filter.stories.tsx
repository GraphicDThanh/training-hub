// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Constants
import { PRODUCT_LIST_OPTIONS } from "@/constants";

// Components
import Filter from "./Filter";

const meta = {
  title: "Components/Common/Filter",
  tags: ["autodocs"],
  component: Filter,
  argTypes: {
    title: { description: "Title of filter" },
    listOption: { description: "List option" },
    statusFilter: { description: "Status of order filter" },
    removeFilter: { description: "Return back default status of order list" },
  },
} as Meta<typeof Filter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <div
        style={{
          display: "center",
          width: "auto",
          height: "200px",
        }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Is available",
    listOption: PRODUCT_LIST_OPTIONS,
    onFilterChange: () => {},
  },
};
