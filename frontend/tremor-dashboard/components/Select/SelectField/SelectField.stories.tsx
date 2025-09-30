// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import SelectField from "./SelectField";

// Constants
import { PRICE_TYPE } from "@/constants";

const meta = {
  title: "Components/Common/SelectField",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "SelectField to apply for ui select option",
      },
    },
  },
  argTypes: {
    options: { description: "Option of select field" },
    className: { description: "Class name of select field" },
    label: { description: "Label of select field" },
  },
  component: SelectField,
} as Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <div
        style={{
          display: "center",
          width: "auto",
          height: "400px",
        }}>
        <Story />
      </div>
    ),
  ],

  args: {
    options: PRICE_TYPE,
    className: "py-2.5",
    label: "Currency",
  },
};
