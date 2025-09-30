import type { Meta, StoryObj } from "@storybook/react";

// Components
import CustomDateFormat from "./CustomDateFormat";

const meta = {
  title: "Components/Tables/CustomDateFormat",
  component: CustomDateFormat,
  tags: ["autodocs"],
  argTypes: {
    date: { description: "Date format" },
  },
} as Meta<typeof CustomDateFormat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CustomDateFormatDefault: Story = {
  args: {
    date: "01 Nov, 11:20 AM",
  },
};
