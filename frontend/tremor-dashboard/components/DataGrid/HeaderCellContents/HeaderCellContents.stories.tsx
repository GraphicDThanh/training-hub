// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import HeaderCellContents from "./HeaderCellContents";

const meta = {
  title: "Components/Tables/HeaderCellContents",
  tags: ["autodocs"],
  component: HeaderCellContents,
  argTypes: {
    title: {
      description: "Title of header cell content",
    },
    keyColumn: {
      description: "Type of key column",
    },
    sortField: {
      description: "Type of sort key",
    },
    sortType: {
      description: "Sort direction by increase or decrease",
    },
    isSortable: {
      description: "Have or not isSortable by set it as true or false",
    },
  },
} as Meta<typeof HeaderCellContents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderCellContentsHaveSortIncrease: Story = {
  args: {
    title: "Product",
    keyColumn: "id",
    sortField: "id",
    sortType: "asc",
    isSortable: true,
  },
};

export const HeaderCellContentsHaveSortDecrease: Story = {
  args: {
    title: "Product",
    keyColumn: "id",
    sortField: "id",
    sortType: "desc",
    isSortable: true,
  },
};

export const HeaderCellContentsHaveNoSort: Story = {
  args: {
    title: "Product",
    keyColumn: "id",
    sortField: "id",
    sortType: "",
    isSortable: false,
  },
};
