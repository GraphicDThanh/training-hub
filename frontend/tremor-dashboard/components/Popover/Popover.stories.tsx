import type { Meta, StoryObj } from "@storybook/react";

// Components
import Popover from "./Popover";

const meta = {
  title: "Components/Common/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    content: { description: "Content of pop over" },
    className: { description: "Class name of pop over" },
  },
} as Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PopoverDefault: Story = {
  args: {
    content: "Content popover",
    className: "left-0 min-w-[200px]",
  },
};
