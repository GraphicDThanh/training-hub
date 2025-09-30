// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import PlatformSetting from "./PlatformSetting";

// Constants
import { SETTING_DATA_APPLICATION, SETTING_DATA_ACCOUNT } from "@/constants";

const meta = {
  title: "Components/Profiles/PlatformSetting",
  tags: ["autodocs"],
  component: PlatformSetting,
  argTypes: {
    accountSettingData: {
      description: "Account field of account setting",
    },
    applicationSettingData: {
      description: "Application field of application setting",
    },
  },
} as Meta<typeof PlatformSetting>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    Story => (
      <div className="bg-white dark:bg-dark-primary p-6 rounded-xl shadow-md">
        <Story />
      </div>
    ),
  ],
  args: {
    accountSettingData: SETTING_DATA_ACCOUNT,
    applicationSettingData: SETTING_DATA_APPLICATION,
  },
};
