// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Mocks
import { MOCK_TRANSACTIONS } from "@/mocks";

// Constants
import { MESSAGES_ERROR } from "@/constants";

// Components
import DecimalNumberInputGroup from "./DecimalNumberInputGroup";

const meta = {
  title: "Components/Common/DecimalNumberInputGroup",
  tags: ["autodocs"],
  component: DecimalNumberInputGroup,
  args: {
    label: "Enter amount",
  },
} as Meta<typeof DecimalNumberInputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: MOCK_TRANSACTIONS[2].amount.toString(),
  },
};

export const ErrorField: Story = {
  args: {
    errorMessage: MESSAGES_ERROR.FIELD_REQUIRED,
  },
};
