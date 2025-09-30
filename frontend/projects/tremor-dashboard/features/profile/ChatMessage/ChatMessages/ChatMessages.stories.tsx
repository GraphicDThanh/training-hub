import { Meta, StoryObj } from "@storybook/react";

// Components
import ChatMessagesList from "./ChatMessages";

const meta = {
  title: "Components/Profiles/ChatMessageList",
  tags: ["autodocs"],
  component: ChatMessagesList,
  argTypes: {},
} as Meta<typeof ChatMessagesList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
