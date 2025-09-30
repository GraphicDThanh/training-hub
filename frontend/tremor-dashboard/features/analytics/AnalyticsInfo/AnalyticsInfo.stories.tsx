import type { Meta, StoryObj } from "@storybook/react";

// Components
import AnalyticsInfo from "./AnalyticsInfo";

// Mock data
import { ANALYTIC_INFO } from "@/mocks";

const meta = {
  title: "Components/Analytics/AnalyticsInfo",
  component: AnalyticsInfo,
  tags: ["autodocs"],
  argTypes: {
    infoData: { description: "Info of analytic" },
  },
} as Meta<typeof AnalyticsInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AnalyticsInfoDefault: Story = {
  args: { infoData: ANALYTIC_INFO[0] },
};
