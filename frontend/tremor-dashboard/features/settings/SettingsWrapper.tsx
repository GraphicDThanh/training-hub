"use client";

import { useState } from "react";
import { Flex } from "@tremor/react";

// Mocks
import { NAVIGATION_SETTING } from "@/mocks";

// Constants
import { FORMAT_DATE, MESSAGE_USER, ROLES } from "@/constants";

// Types
import { IEditUserForm, User } from "@/types";

// Services
import { editUser } from "@/services";

// Utils
import { convertDateToDateTime, convertPhoneNumberToString } from "@/helpers";

// Hocs
import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";

// Styles
import "@/styles/profile.css";

// Components
import { ProfileInfo, Navigation } from "@/components";
import BasicInfoForm from "@/features/settings/BasicInfoForm/BasicInfoForm";

interface SettingsWrapperProps {
  user: User;
}

const SettingsWrapper = ({
  user,
  openToast,
}: TWithToast<SettingsWrapperProps>) => {
  const { id, name, role, avatar } = user;
  const [errorsResponseAPI, setErrorsResponseAPI] = useState<
    Array<Record<string, string>>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (payload: IEditUserForm) => {
    const { birthday, gender, phoneNumber } = payload;
    delete payload.confirmationEmail;

    setIsLoading(true);

    const res = await editUser(id, id, {
      ...payload,
      gender: Number(gender),
      birthday: convertDateToDateTime(
        birthday,
        FORMAT_DATE.YEAR_MONTH_DATE_TIME,
      ),
      phoneNumber: convertPhoneNumberToString(phoneNumber),
    });

    setIsLoading(false);
    setErrorsResponseAPI(res.data ? [] : res.errorMessages);

    openToast({
      type: res.data ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
      message: res.data ? MESSAGE_USER.EDIT_SUCCESS : MESSAGE_USER.EDIT_FAILED,
    });
  };

  return (
    <>
      {isLoading && (
        <div className="opacity-25 fixed inset-0 z-20 bg-black cursor-not-allowed" />
      )}
      <Flex
        className="w-full flex-wrap lg:flex-nowrap items-start lg:w-[100%] gap-6"
        as="main">
        <div className="w-full lg:w-[35%]">
          <Navigation items={NAVIGATION_SETTING} />
        </div>
        <Flex flexDirection="col" className="w-full lg:w-[65%] gap-6">
          <Flex
            id="profile"
            className="p-4 w-full flex-wrap md:flex-nowrap dark:bg-dark-tremor-primary border-solid shadow-box-icon-default rounded-xl bg-white">
            <ProfileInfo
              name={name}
              role={ROLES[role].label}
              avatarUrl={avatar}
            />
          </Flex>

          <div className="w-full">
            <BasicInfoForm
              onSubmit={handleSubmit}
              user={user}
              errorsResponseAPI={errorsResponseAPI}
              isLoading={isLoading}
            />
          </div>
        </Flex>
      </Flex>
    </>
  );
};

const SettingsWrapperWithToast = withToast(SettingsWrapper);

export default SettingsWrapperWithToast;
