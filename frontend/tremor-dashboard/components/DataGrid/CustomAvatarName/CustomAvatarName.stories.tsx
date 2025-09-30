import type { Meta, StoryObj } from "@storybook/react";

// Components
import CustomAvatarName from "./CustomAvatarName";

// Constants
import { AVATAR_IMAGE } from "@/constants";

const meta = {
  title: "Components/Tables/CustomAvatarName",
  component: CustomAvatarName,
  tags: ["autodocs"],
  argTypes: {
    text: { description: "Name of avatar" },
    avatar: { description: "The image source" },
    className: {
      description:
        "The className for width, height of avatar, it is a option with default w-[48px] h-[48px]",
    },
  },
} as Meta<typeof CustomAvatarName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CustomAvatarNameDefault: Story = {
  args: {
    text: "Default",
    avatar: "",
  },
};

export const CustomAvatarNameHasAvatar: Story = {
  args: {
    text: "Default",
    avatar: AVATAR_IMAGE.LG,
  },
};
