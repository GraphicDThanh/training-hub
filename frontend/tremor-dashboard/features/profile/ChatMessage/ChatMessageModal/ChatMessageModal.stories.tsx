import { Meta, StoryObj } from "@storybook/react";

// Components
import ChatMessageModal from "./ChatMessageModal";
import { AVATAR_IMAGE } from "@/constants";

const meta = {
  title: "Components/Profiles/ChatMessageModal",
  tags: ["autodocs"],
  component: ChatMessageModal,
  argTypes: {
    avatar: { description: "The avatar is get from API" },
    name: { description: "The name is get from API" },
    onSendMessage: { description: "The function handler send message" },
    onClose: {
      description: "The function handler close the chat box modal",
    },
  },
} as Meta<typeof ChatMessageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockHandleChat = async (message: string) => {};

export const Default: Story = {
  args: {
    avatar: AVATAR_IMAGE.MD,
    name: "Duy Ngo",
    onSendMessage: mockHandleChat,
  },

  render: args => (
    <div className="h-[680px]">
      <ChatMessageModal {...args} />
    </div>
  ),
};
