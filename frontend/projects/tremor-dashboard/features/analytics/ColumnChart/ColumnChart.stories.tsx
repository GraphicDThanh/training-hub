// Libs
import type { Meta, StoryObj } from "@storybook/react";

// Components
import ColumnChart from "./ColumnChart";

// Mocks
import { WEBSITE_CHART } from "@/mocks";

const meta = {
  title: "Components/Analytics/ColumnChart",
  tags: ["autodocs"],
  component: ColumnChart,
  argTypes: {
    webChartData: { description: "Info of web chart" },
  },
} as Meta<typeof ColumnChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    webChartData: WEBSITE_CHART,
  },
};
