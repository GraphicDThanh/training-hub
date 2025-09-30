import type { Meta, StoryObj } from "@storybook/react";

// Components
import ProfileForm from "./ProfileForm";

const meta = {
  title: "Components/Users/ProfileForm",
  component: ProfileForm,
  tags: ["autodocs"],
  argTypes: {
    onBack: { description: "Back to UserForm" },
    onSubmit: {
      description:
        "Save profile info include (image: url of image uploaded and bio: text by editor)",
    },
  },
} as Meta<typeof ProfileForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileFormDefault: Story = {
  args: {
    onBack: () => {},
    onSubmit: () => {},
  },
};
