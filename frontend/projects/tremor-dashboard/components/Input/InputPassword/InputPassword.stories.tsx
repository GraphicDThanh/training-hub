import type { Meta, StoryObj } from "@storybook/react";

// Components
import InputPassword from "./InputPassword";

const meta = {
  title: "Components/Common/InputPassword",
  component: InputPassword,
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Label of input field" },
    additionalClass: {
      description: "Add more style for component",
    },
    placeholder: {
      description: "Show text placeholder",
    },
    errorMessage: {
      description: "Show error message when got error",
    },
  },
} as Meta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputPasswordDefault: Story = {
  args: {
    label: "Password",
  },
};

export const InputPasswordWithError: Story = {
  args: {
    label: "Password",
    value: "abcABC@131313",
    errorMessage: "Password is incorrect",
  },
};

export const InputPasswordDisabled: Story = {
  args: {
    label: "Password",
    value: "abcABC@131313",
    disabled: true,
  },
};
