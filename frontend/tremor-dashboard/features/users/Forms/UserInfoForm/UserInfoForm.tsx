"use client";

// Libs
import { useForm } from "react-hook-form";

// Components
import { Text } from "@tremor/react";
import UserInfo from "../../UserInfo/UserInfo";
import { Button } from "@/components";

// Types
import { BirthDay, UserBasicInfo } from "@/types";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface UserInfoFormProps {
  name: string;
  email: string;
  birthday: BirthDay;
  phoneNumber: string;
  gender: number;
  location: string;
  skills: string[];
  password: string;
  confirmPassword?: string;
  onSubmit: (data: UserBasicInfo) => void;
}

const UserInfoForm = ({
  name,
  email,
  birthday,
  phoneNumber,
  gender,
  location,
  skills,
  password,
  confirmPassword,
  onSubmit,
}: UserInfoFormProps) => {
  const { control, handleSubmit, watch } = useForm<UserBasicInfo>({
    defaultValues: {
      name,
      email,
      birthday,
      phoneNumber,
      gender,
      location,
      skills,
      password,
      confirmPassword,
    },
    mode: "onBlur",
  });

  return (
    <form
      className="w-full mt-20 user-info"
      onSubmit={handleSubmit(onSubmit)}
      id="user-info-form">
      <h4 className="text-xl text-primary dark:text-white font-bold px-4">
        About me
      </h4>
      <p className="text-sm text-tertiary dark:text-white mb-4 px-4">
        Mandatory information
      </p>
      <UserInfo control={control} watch={watch} />
      <div className="mt-6">
        <Button
          variant={VARIANT_BUTTON.PRIMARY_CENTER}
          additionalClass="float-right"
          type="submit">
          <Text className="uppercase font-bold text-xs text-white dark:text-white tracking-wide">
            Next
          </Text>
        </Button>
      </div>
    </form>
  );
};

export default UserInfoForm;
