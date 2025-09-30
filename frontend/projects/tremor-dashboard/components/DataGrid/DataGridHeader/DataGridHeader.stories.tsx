// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import DataGridHeader from "./DataGridHeader";

// Mocks
import { MOCK_COLUMNS } from "@/mocks";

// Types
import { ColumnType } from "@/types";

const meta = {
  title: "Components/Common/DataGrid/DataGridHeader",
  tags: ["autodocs"],
  component: DataGridHeader,
  argTypes: {
    onSort: { description: "funct sort of table" },
    columns: { description: "columns of header table" },
  },
} as Meta<typeof DataGridHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDataGridHeader: Story = {
  args: {
    columns: MOCK_COLUMNS as ColumnType<unknown>[],
    onSort: () => {},
  },
};
