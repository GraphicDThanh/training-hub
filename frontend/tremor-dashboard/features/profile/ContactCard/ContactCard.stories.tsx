import type { Meta, StoryObj } from "@storybook/react";

// Mocks
import { MOCK_USERS } from "@/mocks";

// Components
import ContactCard from "./ContactCard";

const user = MOCK_USERS[0];

const meta = {
  title: "Components/Profiles/ContactCard",
  component: ContactCard,
  tags: ["autodocs"],
  argTypes: {
    information: { description: "Description of user" },
    fullName: { description: "Full name of user" },
    phone: { description: "Phone number of user" },
    email: { description: "Email of user" },
    location: { description: "Location of user" },
    socials: { description: "Socials of user" },
  },
} as Meta<typeof ContactCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ContactCardInfo: Story = {
  decorators: [
    Story => (
      <div className="bg-white dark:bg-dark-primary p-6 rounded-xl shadow-md">
        <Story />
      </div>
    ),
  ],
  args: {
    information: user.bio,
    fullName: user.name,
    phone: user.phoneNumber,
    email: user.email,
    location: user.location,
  },
};
