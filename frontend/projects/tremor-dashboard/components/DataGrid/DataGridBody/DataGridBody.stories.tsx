// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import DataGridBody from "./DataGridBody";

// Mocks
import { MOCK_ORDERS, MOCK_COLUMNS } from "@/mocks";

// Types
import { ColumnType } from "@/types";

const meta = {
  title: "Components/Common/DataGrid/DataGridBody",
  tags: ["autodocs"],
  component: DataGridBody,
  argTypes: {
    data: { description: "data of body table" },
    columns: { description: "columns of table" },
  },
} as Meta<typeof DataGridBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: MOCK_ORDERS,
    columns: MOCK_COLUMNS as ColumnType<unknown>[],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: MOCK_COLUMNS as ColumnType<unknown>[],
  },
};
