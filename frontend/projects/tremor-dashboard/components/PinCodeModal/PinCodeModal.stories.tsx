// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import PinCodeModal from "./PinCodeModal";

const meta = {
  title: "Components/Common/PinCodeModal",
  tags: ["autodocs"],
  component: PinCodeModal,
  argTypes: {
    onFocus: { description: "call onFocus input of PinCodeModal" },
    errorMessage: { description: "content text errorMessage of PinCodeModal" },
    onSubmit: { description: "call submit of PinCodeModal" },
  },
} as Meta<typeof PinCodeModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Pin Code",
    onSubmit: () => {},
    onFocus: () => {},
  },
};

export const PinCodeModalWithError: Story = {
  args: {
    title: "Pin Code",
    errorMessage: "Pin code not match",
    onSubmit: () => {},
    onFocus: () => {},
  },
};
