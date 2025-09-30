import type { Meta, StoryObj } from "@storybook/react";

// Components
import SideBar from "./Sidebar";

// Constants
import { ROUTES, AVATAR_IMAGE } from "@/constants";

// Types
import { USER_ROLE } from "@/types";

const meta = {
  title: "Components/Common/SideBar",
  component: SideBar,
  tags: ["autodocs"],
  argTypes: {
    avatarUrl: { description: "Src of user avatar on side bar" },
    name: { description: "User name on side bar" },
    pathname: { description: "Path name of page on side bar" },
    toggleSidebar: { description: "Function toggle icon of side bar" },
    isCollapse: { description: "Set state collapse for side bar" },
    onSignOut: { description: "Function logout user on side bar" },
  },
} as Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SideBarDashboard: Story = {
  decorators: [
    Story => (
      <div
        style={{
          display: "center",
          width: "auto",
          height: "1000px",
        }}>
        <Story />
      </div>
    ),
  ],
  args: {
    avatarUrl: AVATAR_IMAGE.SM,
    name: "Brooklyn Alice",
    pathname: ROUTES.PROJECTS,
    role: USER_ROLE.ADMIN,
    toggleSidebar: () => {},
    isCollapse: true,
    onSignOut: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
  },
};
