import type { Meta, StoryObj } from "@storybook/react";

// Components
import Avatar from "./Avatar";

// Constants
import { AVATAR_IMAGE } from "@/constants";

const meta = {
  title: "Components/Common/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    alt: { description: "Alt of avatar" },
    className: { description: "Class name of avatar" },
    height: { description: "Height of avatar" },
    priority: {
      description:
        "The image will be considered high priority and preload if true and lazy load if false",
    },
    src: { description: "Source of avatar" },
    sizes: { description: "Sizes of avatar" },
    width: { description: "Width of avatar" },
  },
} as Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarExtraSmall: Story = {
  args: {
    alt: "Avatar extra small",
    className: "w-[20px] h-[20px]",
    height: 20,
    priority: true,
    src: AVATAR_IMAGE.XS,
    sizes: "(max-width: 768px) 100vw, 33vw",
    width: 20,
  },
};

export const AvatarSmall: Story = {
  args: {
    alt: "Avatar small",
    className: "w-[36px] h-[36px]",
    height: 36,
    priority: true,
    src: AVATAR_IMAGE.SM,
    sizes: "(max-width: 768px) 100vw, 33vw",
    width: 36,
  },
};

export const AvatarMedium: Story = {
  args: {
    alt: "Avatar medium",
    className: "shadow-md w-[48px] h-[48px]",
    height: 48,
    priority: true,
    src: AVATAR_IMAGE.MD,
    sizes: "(max-width: 768px) 100vw, 33vw",
    width: 48,
  },
};

export const AvatarLarge: Story = {
  args: {
    alt: "Avatar large",
    className: "shadow-lg w-[74px] h-[74px]",
    height: 74,
    priority: true,
    src: AVATAR_IMAGE.LG,
    sizes: "(max-width: 768px) 100vw, 33vw",
    width: 74,
  },
};
