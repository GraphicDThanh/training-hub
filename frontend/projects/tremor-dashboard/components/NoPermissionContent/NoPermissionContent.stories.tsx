// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import NoPermissionContent from "./NoPermissionContent";

const meta = {
  title: "Components/Common/NoPermissionContent",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "NoPermissionContent to apply for user not permission",
      },
    },
  },
  argTypes: {
    options: { description: "Option of select field" },
    className: { description: "Class name of select field" },
    label: { description: "Label of select field" },
  },
  component: NoPermissionContent,
} as Meta<typeof NoPermissionContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
