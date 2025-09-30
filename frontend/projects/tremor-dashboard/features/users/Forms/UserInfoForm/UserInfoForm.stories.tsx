import type { Meta, StoryObj } from "@storybook/react";

// Components
import UserInfoForm from "./UserInfoForm";

const meta = {
  title: "Components/Users/UserInfoForm",
  component: UserInfoForm,
  tags: ["autodocs"],
  argTypes: {
    name: { description: "Name of user" },
    email: { description: "Email of user" },
    birthday: { description: "Birthday of user" },
    phoneNumber: { description: "Phone of user" },
    gender: { description: "Gender of user" },
    location: { description: "Location of user" },
    skills: {
      description: "Skills of user with type is array string from '0' to '4'",
    },
    password: { description: "Password of user" },
    confirmPassword: { description: "ConfirmPassword of user same Password" },
    onSubmit: { description: "Save info of user" },
  },
} as Meta<typeof UserInfoForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UserInfoFormDefault: Story = {
  args: {
    name: "VanNguyen",
    email: "van.nguyenthi@asnet.com.vn",
    birthday: { date: 1, months: 1, years: 1990 },
    phoneNumber: "(091) 226-0860",
    gender: 0,
    location: "VN",
    skills: ["0", "1"],
    password: "user@123123",
    confirmPassword: "user@123123",
    onSubmit: () => {},
  },
};
