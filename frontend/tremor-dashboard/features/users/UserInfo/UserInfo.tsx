"use client";

// Libs
import dynamic from "next/dynamic";
import { Control, Controller, UseFormWatch } from "react-hook-form";

// Constants
import {
  GENDERS,
  MESSAGES_ERROR,
  REGEX,
  SKILLS,
  PREFIX_PHONE_NUMBER,
} from "@/constants";

// Types
import { UserBasicInfo } from "@/types";

// Components
import {
  InputField,
  InputPassword,
  SelectField,
  BirthDayField,
} from "@/components";
import { Col, MultiSelect, MultiSelectItem, Text } from "@tremor/react";

// Css
import "@/styles/form.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/quill.css";

// Helpers
import { formatPhoneNumber, validateBirthDate } from "@/helpers";

interface UserInfoProps {
  control: Control<UserBasicInfo>;
  watch: UseFormWatch<UserBasicInfo>;
  isEdit?: boolean;
}

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[300px] w-full">
      <Text className="font-semibold text-secondary dark:text-white">
        Loading Quill Editor ...
      </Text>
    </div>
  ),
});

const UserInfo = ({ control, watch, isEdit }: UserInfoProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 items-start p-4 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-box-icon-default auto-rows-min h-full">
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
        render={({ field, fieldState: { error } }) => (
          <div className="min-h-20 grid-column col-span-2 md:col-span-1">
            <InputField
              id="name"
              label="Name"
              required
              errorMessage={error?.message}
              {...field}
            />
          </div>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: MESSAGES_ERROR.EMAIL_REQUIRED,
          pattern: {
            value: REGEX.EMAIL,
            message: MESSAGES_ERROR.EMAIL_INVALID,
          },
        }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <div className="min-h-20 grid-column col-span-2 md:col-span-1">
            <InputField
              id="email"
              label="Email"
              type="email"
              required
              errorMessage={error?.message}
              disabled={isEdit}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="gender"
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="min-h-20 grid-column col-span-2 md:col-span-1">
            <SelectField
              label="Gender"
              required
              value={String(value)}
              placeholder={
                value !== null ? GENDERS[Number(value)].option : "Select Gender"
              }
              errorMessage={error?.message}
              onChange={onChange}
              options={GENDERS}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        rules={{
          pattern: {
            value: REGEX.PHONE_NUMBER,
            message: MESSAGES_ERROR.INVALID_PHONE_NUMBER,
          },
        }}
        name="phoneNumber"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const handleChange = (value: string) => {
            const phoneValueFormatter = formatPhoneNumber(value);
            onChange(phoneValueFormatter);
          };

          return (
            <div className="min-h-20 grid-column col-span-2 md:col-span-1">
              <InputField
                contentPrefix={PREFIX_PHONE_NUMBER}
                classCustomInput="pl-[20px]"
                label="Phone number"
                id="phoneNumber"
                value={value}
                errorMessage={error?.message}
                onChange={handleChange}
              />
            </div>
          );
        }}
      />
      <div className="grid-cols-subgrid col-span-1 mb-4 sm:col-span-2 md:mb-0">
        <Controller
          control={control}
          rules={{
            validate: validateBirthDate,
          }}
          name="birthday"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="min-h-20">
              <BirthDayField
                required
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            </div>
          )}
        />
      </div>
      <Controller
        control={control}
        name="location"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="min-h-20 grid-column col-span-2 md:col-span-1">
            <InputField
              label="Location"
              id="location"
              value={value}
              errorMessage={error?.message}
              onChange={onChange}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="skills"
        render={({ field: { value, onChange } }) => {
          return (
            <div className="min-h-20 grid-column col-span-2 md:col-span-1">
              <Text className="text-grey text-sm dark:text-lighter capitalize">
                Skills
              </Text>
              <MultiSelect
                className="select-custom dark:text-white dark:border-light dark:focus:border-white"
                onValueChange={onChange}
                value={value.map(String)}>
                {SKILLS?.map((item: Record<string, string | number>) => (
                  <MultiSelectItem
                    key={item?.value}
                    value={item?.value as string}>
                    {item.option}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: MESSAGES_ERROR.PASSWORD_REQUIRED,
          pattern: {
            value: REGEX.PASSWORD,
            message: MESSAGES_ERROR.PASSWORD_INVALID,
          },
        }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <div className="min-h-20 grid-column col-span-2 md:col-span-1 bg-transparent">
            <InputPassword
              id="password"
              label="Password"
              required
              errorMessage={error?.message}
              disabled={isEdit}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
          validate: value =>
            value === watch("password") ||
            MESSAGES_ERROR.REPEAT_PASSWORD_INVALID,
        }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <div className="min-h-20 grid-column col-span-2 md:col-span-1 bg-transparent">
            <InputPassword
              id="confirm-password"
              label="Confirm Password"
              required
              errorMessage={error?.message}
              disabled={isEdit}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        )}
      />
      {isEdit && (
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <Col className="w-full edit-user" numColSpan={2}>
              <Text className="text-grey text-sm dark:text-lighter">Bio</Text>
              <QuillEditor
                theme="snow"
                placeholder="Some initial bold text"
                className="mt-3 dark:text-white"
                {...field}
              />
            </Col>
          )}
        />
      )}
    </div>
  );
};

export default UserInfo;
