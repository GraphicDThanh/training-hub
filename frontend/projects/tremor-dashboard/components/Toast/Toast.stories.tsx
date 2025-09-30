import type { Meta, StoryObj } from "@storybook/react";
import { FaCheckCircle } from "react-icons/fa";

// Components
import Toast from "./Toast";
import { MESSAGE_SIGN_UP } from "@/constants";

const meta = {
  title: "Components/Common/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    Icon: { description: "Icon of toast" },
    message: { description: "Text of toast" },
  },
} as Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToastSuccess: Story = {
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
    icon: <FaCheckCircle />,
    message: MESSAGE_SIGN_UP.SUCCESS,
  },
};

export const ToastError: Story = {
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
    icon: <FaCheckCircle />,
    message: MESSAGE_SIGN_UP.FAILED,
    color: "red",
  },
};
