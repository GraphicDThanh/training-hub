"use client";

// Libs
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

// Components
import { Media } from "@/features/products/AddProduct";
import { ImagePreview } from "@/features/products";
import { Button, LoadingIndicator } from "@/components";
import { Flex, Text } from "@tremor/react";

// Hooks
import useImageUploader from "@/hooks/useImageUploader";

// Constants
import { VARIANT_BUTTON } from "@/constants";

// Css
import "@/styles/form.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/quill.css";

const QuillEditor = dynamic(() => import("react-quill"), {
  loading: () => (
    <div className="flex justify-center items-center h-[417px] w-full">
      <Text className="font-semibold text-secondary dark:text-white">
        Loading Quill Editor ...
      </Text>
    </div>
  ),
});

export interface IProfile {
  image: string;
  bio?: string;
}

interface MediaFormProps {
  onBack: () => void;
  onSubmit: (data: IProfile) => void;
}

const ProfileForm = ({ onBack, onSubmit }: MediaFormProps) => {
  const { control, handleSubmit, setValue } = useForm<IProfile>({
    mode: "onSubmit",
  });
  const { isUpload, cdnResponse, upload } = useImageUploader("");
  const { image } = cdnResponse.data;
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setValue("image", image.url);
    setPreviewImage(image.url);
  }, [cdnResponse, image.url, setValue]);

  const handleOnRemoveImage = () => {
    setValue("image", "");
    setPreviewImage("");
  };

  const dragZone =
    previewImage || isUpload ? null : (
      <div className="w-full sm:h-full h-[11rem]">
        <Text className="text-grey text-sm dark:text-lighter mb-3 ">
          Avatar
        </Text>
        <Media control={control} onUpload={upload} />
      </div>
    );

  const uploadContent = isUpload ? (
    <LoadingIndicator
      width={10}
      height={10}
      fillColor="river-bed-500"
      additionalClass="w-full h-full flex justify-center items-center"
    />
  ) : (
    <ImagePreview
      filename={image.filename}
      url={previewImage}
      onRemove={handleOnRemoveImage}
    />
  );

  return (
    <form
      id="profile-form"
      className="w-full mt-20"
      onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-primary dark:text-white font-bold text-xl mb-8">
        Profile
      </h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start p-4 bg-white dark:bg-dark-tremor-primary pb-4">
        {dragZone}
        {uploadContent}
        <Controller
          name="bio"
          control={control}
          render={({ field }) => {
            return (
              <div className="w-full" data-testid="bio">
                <Text className="text-grey text-sm dark:text-lighter">Bio</Text>
                <QuillEditor
                  id="bio"
                  theme="snow"
                  placeholder="Some initial bold text"
                  className="mt-3 dark:text-white"
                  {...field}
                />
              </div>
            );
          }}
        />
      </div>
      <Flex className="mt-6">
        <Button
          data-testid="back-button"
          variant={VARIANT_BUTTON.SURFACE}
          onClick={onBack}
          disabled={isUpload}>
          <Text className="uppercase font-bold text-xs text-gray-900 dark:text-black tracking-wide">
            Back
          </Text>
        </Button>
        <Button
          variant={VARIANT_BUTTON.PRIMARY_CENTER}
          additionalClass="items-end mt-0"
          type="submit"
          disabled={isUpload}>
          <Text className="uppercase font-bold text-xs text-white dark:text-white tracking-wide">
            Next
          </Text>
        </Button>
      </Flex>
    </form>
  );
};

export default ProfileForm;
