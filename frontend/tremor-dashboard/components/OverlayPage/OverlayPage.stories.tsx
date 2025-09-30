// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import OverlayPage from "./OverlayPage";

const meta = {
  title: "Components/Common/OverlayPage",
  tags: ["autodocs"],
  component: OverlayPage,
  argTypes: {},
} as Meta<typeof OverlayPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
