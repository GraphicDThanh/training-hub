// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import PlatformSettingContainer from "./PlatformSettingContainer";

// Constants
import {
  SETTING_FIELDS_ACCOUNT,
  SETTING_DATA_ACCOUNT,
  SETTING_FIELDS_APPLICATION,
  SETTING_DATA_APPLICATION,
} from "@/constants";

const meta = {
  title: "Components/Profiles/PlatformSettingContainer",
  tags: ["autodocs"],
  component: PlatformSettingContainer,
  argTypes: {
    fields: {
      description: "Field of setting",
    },
    data: {
      description: "Data of setting",
    },
    title: {
      description: "Title of setting",
    },
  },
} as Meta<typeof PlatformSettingContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Account: Story = {
  decorators: [
    Story => (
      <div className="bg-white dark:bg-dark-primary p-6 rounded-xl shadow-md">
        <Story />
      </div>
    ),
  ],
  args: {
    fields: SETTING_FIELDS_ACCOUNT,
    data: SETTING_DATA_ACCOUNT,
    title: "Account",
  },
};

export const Application: Story = {
  decorators: [
    Story => (
      <div className="bg-white dark:bg-dark-primary p-6 rounded-xl shadow-md">
        <Story />
      </div>
    ),
  ],
  args: {
    fields: SETTING_FIELDS_APPLICATION,
    data: SETTING_DATA_APPLICATION,
    title: "Application",
  },
};
