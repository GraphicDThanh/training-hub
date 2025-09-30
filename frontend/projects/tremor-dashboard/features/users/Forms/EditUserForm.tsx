"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Control, FormProvider, UseFormWatch, useForm } from "react-hook-form";
import { InView } from "react-intersection-observer";

// Components
import { Col, Grid, Text } from "@tremor/react";
import { Button, LoadingIndicator } from "@/components";
import ImageCard from "../../../components/Form/ImageCard/ImageCard";
const SocialsCard = dynamic(
  () => import("../../../components/Form/SocialsCard/SocialsCard"),
);
const UserInfo = dynamic(() => import("../UserInfo/UserInfo"));

// Services
import { editUser } from "@/services";

// Types
import { User, UserBasicInfo, EditUserData } from "@/types";

// Constants
import {
  NOT_FOUND_IMAGE,
  VARIANT_BUTTON,
  SOCIAL_USERS,
  FORMAT_DATE,
  MESSAGE_USER,
} from "@/constants";

// Hooks
import useImageUploader from "@/hooks/useImageUploader";
import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";

// Helpers
import { convertDateTimeToObject, convertDateToDateTime } from "@/helpers";

const EditUserForm = ({
  userData,
  id,
  openToast,
  requestedId,
}: TWithToast<{
  userData: User;
  id: number;
  requestedId: number;
}>) => {
  const initData = {
    name: "",
    email: "",
    avatar: "",
    gender: "",
    phoneNumber: "",
    birthday: "",
    location: "",
    skills: "",
    password: "",
    bio: "",
    twitterUrl: "",
    facebookUrl: "",
    instagramUrl: "",
  };
  const { name, avatar, birthday, bio } = userData;

  const [isLoading, setIsLoading] = useState(false);

  const formHandler = useForm<EditUserData>({
    defaultValues: {
      ...initData,
      ...userData,
      confirmPassword: userData.password,
      birthday: convertDateTimeToObject(birthday),
    },
    mode: "onBlur",
  });

  const { handleSubmit, formState, control, reset, watch } = formHandler;
  const { upload, imageValue, removeImage, isUpload } =
    useImageUploader(avatar);

  useEffect(() => {
    formHandler.setValue("avatar", imageValue, { shouldDirty: true });
  }, [imageValue, formHandler]);

  const onSubmit = useCallback(
    async (data: EditUserData) => {
      const newData = {
        name: data.name.trim(),
        avatar: data.avatar === NOT_FOUND_IMAGE ? "" : data.avatar,
        gender: data.gender,
        phoneNumber: data.phoneNumber.trim(),
        birthday: convertDateToDateTime(
          data.birthday,
          FORMAT_DATE.YEAR_MONTH_DATE_TIME,
        ),
        location: data.location.trim(),
        skills: data.skills,
        bio: data.bio.trim(),
        twitterUrl: data.twitterUrl.trim(),
        facebookUrl: data.facebookUrl.trim(),
        instagramUrl: data.instagramUrl.trim(),
      };

      setIsLoading(true);

      const res = await editUser(id, requestedId, newData);

      reset(data);

      setIsLoading(false);

      openToast({
        type: res.data ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
        message: res.data
          ? MESSAGE_USER.EDIT_SUCCESS
          : MESSAGE_USER.EDIT_FAILED,
      });
    },
    [id, openToast, requestedId, reset],
  );

  const onRemoveImage = useCallback(() => {
    removeImage();
    formHandler.setValue("avatar", "", { shouldDirty: true });
  }, [formHandler, removeImage]);

  const renderContentButton = () =>
    isLoading ? (
      <LoadingIndicator width={4} height={5} additionalClass="px-1.5" />
    ) : (
      <Text className="items-center uppercase py-[2px] text-xs font-bold font-primary text-white dark:text-dark-tremor-content-title">
        Save
      </Text>
    );

  return (
    <>
      {isLoading && (
        <div className="opacity-25 fixed inset-0 z-20 bg-black cursor-not-allowed" />
      )}
      <FormProvider {...formHandler}>
        <form
          id="edit-user-form"
          onSubmit={handleSubmit(onSubmit)}
          className="relative user-info pt-20">
          <div className="w-full text-end absolute -mt-20">
            <Button
              variant={VARIANT_BUTTON.PRIMARY}
              type="submit"
              size="xs"
              disabled={!formState.isDirty}
              additionalClass="antialiased text-center uppercase px-6 py-2.5 rounded-lg border-0 items-end">
              {renderContentButton()}
            </Button>
          </div>
          <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
            <section className="w-full gap-6 flex flex-col">
              <ImageCard
                name={name}
                desc={bio}
                image={imageValue || NOT_FOUND_IMAGE}
                onRemoveImage={onRemoveImage}
                onUpload={upload}
                disabled={!imageValue || imageValue === NOT_FOUND_IMAGE}
                isUpload={isUpload}
              />
              <InView>
                <SocialsCard socialUrls={SOCIAL_USERS} />
              </InView>
            </section>
            <Col numColSpanSm={1} numColSpanLg={2} as="section">
              <InView style={{ height: "100%" }}>
                <UserInfo
                  control={control as unknown as Control<UserBasicInfo>}
                  watch={watch as unknown as UseFormWatch<UserBasicInfo>}
                  isEdit={true}
                />
              </InView>
            </Col>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

const EditUserFormWithToast = withToast(EditUserForm);

export default EditUserFormWithToast;
