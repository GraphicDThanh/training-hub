import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProjectInfoCard from "./ProjectInfoCard";

//Mocks
import { PROJECT_DATA } from "@/mocks";

const meta = {
  title: "Components/Projects/ProjectInfoCard",
  component: ProjectInfoCard,
  tags: ["autodocs"],
  argTypes: {
    links: { description: "List project card info" },
  },
} as Meta<typeof ProjectInfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  args: {
    projects: PROJECT_DATA,
  },
};
