import { Meta, StoryObj } from "@storybook/react";

// Components
import ChatMessageForm from "./ChatMessageForm";

const mockHandleSendMessage = async (message: string) => {};

const meta = {
  title: "Components/Profiles/ChatMessageForm",
  tags: ["autodocs"],
  component: ChatMessageForm,
  argTypes: {
    onSendMessage: { description: "The function handler send message" },
  },
} as Meta<typeof ChatMessageForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onSendMessage: mockHandleSendMessage },
};
