// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import DataGrid from "./DataGrid";

// Types
import { ColumnType, Order } from "@/types";

// Constants
import { STATUS_TEXT } from "@/constants";

// Mocks
import { MOCK_ORDERS } from "@/mocks";

const meta = {
  title: "Components/Tables/DataGrid",
  tags: ["autodocs"],
  component: DataGrid,
  argTypes: {
    data: { description: "Data of data grid" },
    columns: { description: "Columns of data grid" },
    total: { description: "Total item of data grid" },
  },
} as Meta<typeof DataGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

const columns: ColumnType<Order>[] = [
  {
    key: "id",
    title: "Id",
  },
  {
    key: "createdAt",
    title: "Date",
  },
  {
    key: "status",
    title: "Status",
    customNode: (_, { status }) => (
      <div className="flex justify-start text-xs dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] capitalize order-status">
        <p className="text-xs dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] capitalize order-status">
          {STATUS_TEXT[status]}
        </p>
      </div>
    ),
  },
];

export const DataTableDefault: Story = {
  args: {
    data: MOCK_ORDERS,
    columns: columns as ColumnType<unknown>[],
    total: 50,
  },
};
