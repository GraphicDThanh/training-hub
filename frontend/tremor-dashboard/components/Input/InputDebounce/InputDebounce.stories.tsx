import type { Meta, StoryObj } from "@storybook/react";

// Components
import InputDebounce from "./InputDebounce";

const meta = {
  title: "Components/Common/InputDebounce",
  component: InputDebounce,
  tags: ["autodocs"],
  argTypes: {
    field: { description: "Keyword of input search" },
    param: { description: "Param need update when search" },
    valueParam: { description: "Value of param" },
  },
} as Meta<typeof InputDebounce>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputDebounceDefault: Story = {
  args: {
    field: "Product",
    onChange: () => {},
  },
};
