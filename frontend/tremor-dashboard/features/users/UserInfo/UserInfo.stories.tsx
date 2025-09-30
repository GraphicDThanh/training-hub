import type { Meta, StoryObj } from "@storybook/react";

// Libs
import { useForm } from "react-hook-form";

// Components
import UserInfo from "./UserInfo";

// Types
import { UserBasicInfo } from "@/types";

const meta = {
  title: "Components/Users/UserInfo",
  component: UserInfo,
  tags: ["autodocs"],
  argTypes: {
    control: {
      description:
        "This is control from useForm of react-hook-form with type UserBasicInfo({name: string, email: string, phoneNumber: string, gender: number, password: string, confirmPassword: string, birthday: string, bio: string})",
    },
    watch: {
      description:
        "This is control from useForm of react-hook-form with type UserBasicInfo()",
    },
    isEdit: {
      description:
        "This is type boolean to check it in edit user or new user form",
    },
  },
} as Meta<typeof UserInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

const UserInfoFormProvider = () => {
  const { control, watch } = useForm<UserBasicInfo>({
    defaultValues: {
      name: "VanNguyen",
      email: "van.nguyenthi@asnet.com.vn",
      birthday: { date: 1, months: 1, years: 1990 },
      phoneNumber: "(091) 226-0860",
      gender: 0,
      location: "VN",
      skills: ["0", "1"],
      password: "user@123123",
      confirmPassword: "user@123123",
    },
  });

  return (
    <UserInfo
      control={control}
      watch={watch}
      isEdit={true}
    />
  );
};

export const UserInfoDefault: Story = {
  render: () => <UserInfoFormProvider />,
};
