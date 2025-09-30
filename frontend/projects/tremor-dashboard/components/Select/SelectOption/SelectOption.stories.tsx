// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import SelectOption from "./SelectOption";

// Constants
import { PRODUCT_LIST_OPTIONS } from "@/constants";

const meta = {
  title: "Components/Common/SelectOption",
  tags: ["autodocs"],
  component: SelectOption,
  parameters: {
    docs: {
      description: {
        component: "SelectOption to apply for ui filters option",
      },
    },
  },
  argTypes: {
    title: {
      description: "Collapse or expand sidebar of select option",
    },
    onSelectItem: { description: "On select of select option" },
    onSelectRemove: { description: "On remove of select option" },
    data: [
      {
        option: { description: "option of select option" },
        value: { description: "value of select option" },
      },
    ],
  },
} as Meta<typeof SelectOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Is Available",
    value: { option: "Yes", value: "true" },
    className: "min-w-[220px] max-w-[220px]",
    onSelectItem: () => {},
    onSelectRemove: () => {},
    data: PRODUCT_LIST_OPTIONS,
  },
};
