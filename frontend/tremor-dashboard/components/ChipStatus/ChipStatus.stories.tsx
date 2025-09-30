// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import ChipStatus from "./ChipStatus";

const meta = {
  title: "Components/Common/ChipStatus",
  tags: ["autodocs"],
  component: ChipStatus,
  argTypes: {
    extendedClass: {
      description: "Class of button",
    },
    value: {
      description: "Value of button",
    },
  },
} as Meta<typeof ChipStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonIncrease: Story = {
  args: {
    extendedClass: "text-few border-few",
    value: "+ 1234",
  },
};

export const ButtonDecrease: Story = {
  args: {
    extendedClass: "text-attention border-attention",
    value: "- 1234",
  },
};

export const ButtonPending: Story = {
  args: {
    extendedClass: "text-primary border-primary",
    value: "Pending",
  },
};
