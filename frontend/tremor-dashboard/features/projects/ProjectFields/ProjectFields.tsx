"use client";

import dynamic from "next/dynamic";
import { Control, Controller } from "react-hook-form";
import { memo, useEffect, useRef } from "react";
import isEqual from "react-fast-compare";

// Constants
import { MESSAGES_ERROR } from "@/constants";

// Types
import { ImageProject, ProjectFormData, User } from "@/types";

// Components
import { MultiSelect, MultiSelectItem, Text } from "@tremor/react";
import { InputField } from "@/components";
import DatePicker from "../DatePicker/DatePicker";

// Css
import "@/styles/form.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/quill.css";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-44 w-full">
      <Text className="font-semibold text-secondary dark:text-white">
        Loading Quill Editor ...
      </Text>
    </div>
  ),
});

interface ProjectFieldsProps {
  control: Control<ProjectFormData>;
  projectTools: ImageProject[];
  participantsData: User[];
}

const ProjectFields = ({
  control,
  projectTools,
  participantsData,
}: ProjectFieldsProps) => {
  const ref = useRef<HTMLInputElement>(null);

  // handle autoFocus name field
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Controller
        name="name"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
          minLength: {
            value: 4,
            message: MESSAGES_ERROR.MIN_LENGTH_4,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className="min-h-20">
              <InputField
                id="name"
                data-testid="nameProject"
                label="Name"
                required
                errorMessage={error?.message}
                classCustomInput="h-[41.6px]"
                {...field}
                ref={ref}
              />
            </div>
          );
        }}
      />

      <Controller
        name="participants"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
        }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => {
          const convertedValue = value?.map(String);

          return (
            <div className="min-h-20">
              <label
                htmlFor="participants"
                className="text-gray-500 text-sm dark:text-gray-400 after:content-['*'] after:text-red-500 after:text-md">
                Participants
              </label>
              <MultiSelect
                className="select-custom select-multi dark:text-white dark:border-light dark:focus:border-white"
                value={convertedValue}
                onValueChange={onChange}
                onBlur={onBlur}>
                {participantsData.map(item => {
                  const { id, email } = item;

                  return (
                    <MultiSelectItem key={`${id}`} value={email}>
                      {email}
                    </MultiSelectItem>
                  );
                })}
              </MultiSelect>

              <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                {error?.message}
              </Text>
            </div>
          );
        }}
      />

      <Controller
        name="tools"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
        }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => {
          const convertedValue = value?.map(String);

          return (
            <div className="min-h-20">
              <label
                htmlFor="tools"
                className="text-gray-500 text-sm dark:text-gray-400 after:content-['*'] after:text-red-500 after:text-md">
                Tools
              </label>
              <MultiSelect
                className="select-custom select-multi dark:text-white dark:border-light dark:focus:border-white"
                value={convertedValue}
                onValueChange={onChange}
                onBlur={onBlur}>
                {projectTools.map(item => {
                  const { id, name } = item;

                  return (
                    <MultiSelectItem key={id} value={name}>
                      {name}
                    </MultiSelectItem>
                  );
                })}
              </MultiSelect>

              <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                {error?.message}
              </Text>
            </div>
          );
        }}
      />
      <Controller
        name="dueDate"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const currentDate = new Date();
          return (
            <div className="min-h-20">
              <DatePicker
                label="Due date"
                value={value as Date}
                onValueChange={onChange}
                minDate={currentDate}
              />
              <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                {error?.message}
              </Text>
            </div>
          );
        }}
      />

      <Controller
        name="description"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
        }}
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => {
          const handleChange = (value: string) => {
            let convertedValue = value.replace(/<p>(<br>)?<\/p>/gi, "").trim();

            const element = document.createElement("div");
            element.innerHTML = convertedValue;

            const content = element.textContent?.trim() ?? "";
            if (!content) convertedValue = "";

            onChange(convertedValue);
          };

          return (
            <div className="min-h-[440px]">
              <Text className="text-grey text-sm dark:text-lighter after:content-['*'] after:text-red-500 after:text-md">
                Description
              </Text>
              <QuillEditor
                theme="snow"
                placeholder="Some initial bold text"
                className="mt-3 dark:text-white"
                {...props}
                defaultValue={value}
                value={value}
                onChange={handleChange}
              />
              <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                {error?.message}
              </Text>
            </div>
          );
        }}
      />
    </div>
  );
};

export default memo(ProjectFields, isEqual);
