import type { Meta, StoryObj } from "@storybook/react";

// Components
import StarRating from "./StarRating";

const meta = {
  title: "Components/Common/StarRating",
  component: StarRating,
  tags: ["autodocs"],
  argTypes: {
    numberStar: { description: "Number star of star rating" },
    isFullRaring: { description: "Star rating is full or not" },
    size: { description: "Size of star rating" },
  },
} as Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StarRatingDefault: Story = {
  args: {
    numberStar: 5,
    isFullRaring: false,
    size: 20,
  },
};

export const FullStarRating: Story = {
  args: {
    numberStar: 5,
    isFullRaring: true,
    size: 20,
  },
};

export const NumberStarRating: Story = {
  args: {
    numberStar: 3,
    isFullRaring: false,
    size: 10,
  },
};
