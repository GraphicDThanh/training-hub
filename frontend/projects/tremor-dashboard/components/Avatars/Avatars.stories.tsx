import type { Meta, StoryObj } from "@storybook/react";

// Components
import Avatars from "./Avatars";

// Mocks
import { MOCK_PARTICIPANTS_DATA } from "@/mocks";

const meta = {
  title: "Components/Common/Avatars",
  component: Avatars,
  tags: ["autodocs"],
  argTypes: {
    className: { description: "Class name of avatar" },
    height: { description: "Height of avatar" },
    width: { description: "Width of avatar" },
    totalParticipantsShow: { description: "Number avatar will show" },
    participantsData: {
      description:
        "An Array type AvatarCard(id: number, avatar: string, name: string)[] list avatar of participants",
    },
  },
} as Meta<typeof Avatars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarGroup: Story = {
  args: {
    height: 40,
    width: 40,
    className: "w-[40px] h-[40px] last:after:text-xs",
    totalParticipantsShow: 3,
    participantsData: MOCK_PARTICIPANTS_DATA,
  },
};
