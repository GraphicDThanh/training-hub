import type { Meta, StoryObj } from "@storybook/react";

// Components
import AnalyticsStatisticCard from "./AnalyticsStatisticCard";

//Mocks
import { STATISTICAL_DATA } from "@/mocks";

const meta = {
  title: "Components/Analytics/AnalyticsStatisticCard",
  component: AnalyticsStatisticCard,
  tags: ["autodocs"],
  argTypes: {
    statisticalData: { description: "Info of statistical" },
  },
} as Meta<typeof AnalyticsStatisticCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AnalyticsStatisticCardDefault: Story = {
  args: {
    statisticalData: STATISTICAL_DATA[0],
  },
};
