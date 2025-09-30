import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProfileInfo from "./ProfileInfo";

// Mocks
import { PROFILE_HEADER } from "@/mocks";

const meta = {
  title: "Components/Common/ProfileInfo",
  component: ProfileInfo,
  tags: ["autodocs"],
  argTypes: {
    name: { description: "Name of user" },
    role: { description: "Role of user" },
    avatarUrl: { description: "Avatar of user" },
  },
} as Meta<typeof ProfileInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileInfoHeader: Story = {
  args: {
    name: PROFILE_HEADER.name,
    role: PROFILE_HEADER.role,
    avatarUrl: PROFILE_HEADER.avatarUrl,
  },
};
