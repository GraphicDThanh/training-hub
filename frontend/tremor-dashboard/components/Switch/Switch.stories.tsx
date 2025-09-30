// Libs
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@tremor/react";
import { withKnobs } from "@storybook/addon-knobs";

const meta = {
  title: "Components/Common/Switch",
  decorators: [withKnobs],
  tags: ["autodocs"],
  component: Switch,
  argTypes: {
    color: {
      description: "Color of switch",
    },
    checked: {
      description: "Checked of switch",
    },
    disabled: {
      description: "Disabled of switch",
    },
  },
} as Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "zinc",
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    color: "zinc",
    checked: true,
    disabled: false,
  },
};

export const Disable: Story = {
  args: {
    color: "zinc",
    checked: false,
    disabled: true,
  },
};
