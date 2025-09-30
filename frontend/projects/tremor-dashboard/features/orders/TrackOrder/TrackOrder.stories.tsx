import type { Meta, StoryObj } from "@storybook/react";

// Components
import TrackOrder from "./TrackOrder";
import { Card } from "@tremor/react";

// Mocks
import { MOCK_TRACK_ORDER } from "@/mocks";

// Mock data

const meta = {
  title: "Components/Orders/TrackOrder",
  component: TrackOrder,
  tags: ["autodocs"],
  argTypes: {
    id: { description: "Id of track order" },
    generateOrderAt: { description: "Received order date of track order" },
    deliveredAt: { description: "Delivered order data of track order" },
    transmittedToCourierAt: {
      description: "Transmitted order date of track order",
    },
    generateOrderId: { description: "Generate order date of track order" },
  },
} as Meta<typeof TrackOrder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    Story => (
      <Card className="w-full dark:bg-dark-blue px-6 py-7 ring-0 rounded-xl shadow-md">
        <Story />
      </Card>
    ),
  ],
  args: {
    id: MOCK_TRACK_ORDER.id,
    generateOrderAt: MOCK_TRACK_ORDER.generateOrderId,
    deliveredAt: MOCK_TRACK_ORDER.deliveredAt,
    transmittedToCourierAt: MOCK_TRACK_ORDER.transmittedToCourierAt,
    generateOrderId: MOCK_TRACK_ORDER.generateOrderId,
  },
};
