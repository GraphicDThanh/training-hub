import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@tremor/react";

const meta = {
  title: "Components/Common/Text",
  tags: ["autodocs"],
  component: Text,
  argTypes: {
    className: { description: "Class name of text" },
    children: { description: "ReactNode of text" },
  },
} as Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    className: "text-xs text-secondary font-light leading-5",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    className: "text-secondary font-light leading-6",
    children: "Medium",
  },
};

export const Base: Story = {
  args: {
    className: "sm:text-base text-secondary font-light",
    children: "Base",
  },
};
