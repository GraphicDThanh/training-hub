import type { Meta, StoryObj } from "@storybook/react";

import ErrorMessage from "./ErrorMessage";

const meta = {
  title: "Components/Common/ErrorMessage",
  tags: ["autodocs"],
  component: ErrorMessage,
  argTypes: {
    errorMessage: { description: "Message want to show" },
    className: { description: "Class name of text" },
  },
} as Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorMessage: "This field is error",
    className: "",
  },
};
