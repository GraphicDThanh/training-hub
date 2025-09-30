// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Constants
import { NAVIGATION_SETTING } from "@/mocks";

// Components
import Navigation from "./Navigation";

const meta = {
  title: "Components/Common/Navigation",
  tags: ["autodocs"],
  component: Navigation,
  args: {
    items: NAVIGATION_SETTING,
  },
} as Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Column: Story = {
  args: {},
};

export const Row: Story = {
  args: {
    isRow: true,
  },
};
