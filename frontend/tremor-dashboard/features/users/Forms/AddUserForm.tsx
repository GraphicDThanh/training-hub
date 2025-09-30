"use client";

// Libs
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { LoadingIndicator, Stepper } from "@/components";
import ProfileForm, { IProfile } from "./ProfileForm/ProfileForm";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import SocialForm from "@/components/Form/SocialForm/SocialForm";

// Types
import { SocialFormData, UserBasicInfo, UserData } from "@/types";

// Constants
import {
  FORMAT_DATE,
  LANGUAGES,
  MESSAGE_ADD_USER,
  NEW_USER_FORM_STEPS,
  ROUTES,
  SOCIAL_USERS,
} from "@/constants";

// Helpers
import { convertDateTimeToObject, convertDateToDateTime } from "@/helpers";
import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";

// Services
import { addNewUser } from "@/services";

const AddUserForm = ({ openToast, userId }: TWithToast<{ userId: number }>) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newUser, setNewUser] = useState<UserData>({
    name: "",
    email: "",
    birthday: "",
    phoneNumber: "",
    gender: 0,
    password: "",
    confirmPassword: "",
    avatar: "",
    twitterUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    bio: "",
    skills: [],
    location: "",
    agreeTerms: true,
    language: LANGUAGES.ENGLISH,
  });

  const {
    name,
    email,
    birthday,
    phoneNumber,
    gender,
    password,
    confirmPassword,
    location,
    skills,
  } = newUser || {};

  const handleBack = useCallback(() => {
    router.push(ROUTES.USERS);
  }, [router]);

  const handleSubmitUserInfoForm = useCallback(
    (info: UserBasicInfo) => {
      setNewUser({
        ...newUser,
        name: info.name,
        email: info.email,
        gender: parseInt(`${info.gender}`),
        phoneNumber: info.phoneNumber,
        birthday: convertDateToDateTime(
          info.birthday,
          FORMAT_DATE.YEAR_MONTH_DATE_TIME,
        ),
        location: info.location,
        skills: info.skills,
        password: info.password,
        confirmPassword: info.confirmPassword,
      });
      setCurrentStep(currentStep + 1);
    },
    [currentStep, newUser],
  );

  const handleSubmitProfileForm = useCallback(
    (profile: IProfile) => {
      setNewUser(prev => ({
        ...prev,
        bio: profile.bio ?? "",
        avatar: profile.image,
      }));
      setCurrentStep(currentStep + 1);
    },
    [currentStep],
  );

  const handleSubmitSocialForm = useCallback(
    async (social: SocialFormData) => {
      const userPayload = {
        ...newUser,
        ...social,
      };

      setNewUser(userPayload);

      setIsLoading(true);

      delete userPayload.confirmPassword;

      const { message = "" } = await addNewUser(userPayload, userId);

      setErrorMessage(message);

      openToast(
        {
          type: message ? TOAST_TYPE.ERROR : TOAST_TYPE.SUCCESS,
          message: message ? MESSAGE_ADD_USER.FAILED : MESSAGE_ADD_USER.SUCCESS,
        },
        message
          ? () => {
              setIsLoading(false);
            }
          : handleBack,
      );
    },
    [handleBack, newUser, openToast, userId],
  );

  const handleClickBackButton = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const renderLoading = useMemo(() => {
    return isLoading ? (
      <LoadingIndicator
        width={16}
        height={16}
        fillColor="gray-500"
        additionalClass="h-full w-full absolute flex items-center justify-center z-30"
      />
    ) : null;
  }, [isLoading]);

  const isLastStep =
    NEW_USER_FORM_STEPS[NEW_USER_FORM_STEPS.length - 1].index === currentStep;

  const formContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <UserInfoForm
            name={name}
            email={email}
            birthday={convertDateTimeToObject(birthday)}
            phoneNumber={phoneNumber}
            gender={gender}
            location={location}
            skills={skills}
            password={password}
            confirmPassword={confirmPassword}
            onSubmit={handleSubmitUserInfoForm}
          />
        );
      case 2:
        return (
          <ProfileForm
            onBack={handleClickBackButton}
            onSubmit={handleSubmitProfileForm}
          />
        );
      case 3:
        return (
          <SocialForm
            socialUrls={SOCIAL_USERS}
            onBack={handleClickBackButton}
            onSubmit={handleSubmitSocialForm}
            isLastStep={isLastStep}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        );
      default:
        return null;
    }
  }, [
    birthday,
    confirmPassword,
    currentStep,
    email,
    errorMessage,
    gender,
    handleClickBackButton,
    handleSubmitProfileForm,
    handleSubmitSocialForm,
    handleSubmitUserInfoForm,
    isLastStep,
    isLoading,
    location,
    name,
    password,
    phoneNumber,
    skills,
  ]);

  return (
    <div className="flex flex-col items-center relative p-4 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-md mx-auto w-full relative">
      <Stepper
        steps={NEW_USER_FORM_STEPS}
        currentStep={currentStep}
        total={NEW_USER_FORM_STEPS.length}
      />
      {renderLoading}
      {formContent}
    </div>
  );
};

const AddUserFormWithToast = withToast(AddUserForm);

export default AddUserFormWithToast;
