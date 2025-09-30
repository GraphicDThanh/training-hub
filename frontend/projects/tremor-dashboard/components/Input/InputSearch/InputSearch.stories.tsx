import type { Meta, StoryObj } from "@storybook/react";

// Components
import InputSearch from "./InputSearch";

const meta = {
  title: "Components/Common/InputSearch",
  component: InputSearch,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "Value of input",
    },
    placeholder: {
      description: "Show text placeholder",
    },
    errorMessage: {
      description: "Error of input field",
    },
  },
} as Meta<typeof InputSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputSearchDefault: Story = {
  args: {
    value: "Product",
    placeholder: "",
    errorMessage: "",
  },
  argTypes: {
    onChange: { action: "onChange" },
  },
};
