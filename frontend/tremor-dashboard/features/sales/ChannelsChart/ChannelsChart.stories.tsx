// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import ChannelsChart from "./ChannelsChart";

// Mocks
import { CHANNELS_CHART_DATA } from "@/mocks";

const meta = {
  title: "Components/Sales/ChannelsChart",
  tags: ["autodocs"],
  component: ChannelsChart,
  argTypes: {
    title: { description: "Title of channel chart" },
    channelChartData: { description: "Data of channel chart" },
  },
} as Meta<typeof ChannelsChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Channels", channelChartData: CHANNELS_CHART_DATA },
};
