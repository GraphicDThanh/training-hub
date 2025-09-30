"use client";

import { ChangeEvent, memo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { MultiSelect, MultiSelectItem, Text } from "@tremor/react";

// Constants
import {
  GENDERS,
  MESSAGES_ERROR,
  SKILLS,
  VARIANT_BUTTON,
  PREFIX_PHONE_NUMBER,
  REGEX,
} from "@/constants";

// Types
import { IEditUserForm, User } from "@/types";

// Utils
import {
  convertDateTimeToObject,
  formatPhoneNumber,
  validateBirthDate,
} from "@/helpers";

// Components
import {
  Button,
  InputField,
  LoadingIndicator,
  SelectField,
  BirthDayField,
} from "@/components";

// Styles
import "@/styles/form.css";

interface BasicInfoFormProps {
  user: User;
  errorsResponseAPI?: Array<Record<string, string>>;
  isLoading?: boolean;
  onSubmit: (payload: IEditUserForm) => void;
}

const BasicInfoForm = ({
  user,
  errorsResponseAPI,
  isLoading,
  onSubmit,
}: BasicInfoFormProps) => {
  const {
    name,
    gender,
    email,
    birthday,
    location,
    phoneNumber,
    language,
    skills,
  } = user;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { dirtyFields, isDirty },
  } = useForm<IEditUserForm>({
    defaultValues: {
      name,
      gender,
      email,
      confirmationEmail: email,
      birthday: convertDateTimeToObject(birthday),
      location: location,
      phoneNumber: formatPhoneNumber(phoneNumber),
      language,
      skills,
    },
    mode: "onBlur",
  });

  const saveNewUserInfo = useCallback(
    (payload: IEditUserForm) => {
      onSubmit(payload);
      reset(payload);
    },
    [onSubmit, reset],
  );

  return (
    <div className="w-full dark:bg-dark-tremor-primary border-solid shadow-box-icon-default rounded-xl w-500 bg-white">
      <h3 className="p-6 pb-0 text-primary dark:text-white text-tremor-primary font-primary font-bold">
        Basic Info
      </h3>
      {errorsResponseAPI && errorsResponseAPI.length > 0 && (
        <div>
          <Text className="pl-6 text-md text-red-500 dark:text-red-500">
            Please review these errors then try again:
          </Text>
          {errorsResponseAPI.map(
            (errorResponseAPI: Record<string, string>, tabIndex) => (
              <Text
                key={tabIndex}
                className="pl-10 pt-1 text-md text-red-500 dark:text-red-500">
                <span className="capitalize">{errorResponseAPI.field}:</span>{" "}
                {errorResponseAPI.message}
              </Text>
            ),
          )}
        </div>
      )}

      <form
        id="basicInfoForm"
        className="md:flex flex-wrap pr-6 pb-6"
        onSubmit={handleSubmit(saveNewUserInfo)}>
        <Controller
          control={control}
          rules={{
            required: MESSAGES_ERROR.FIELD_REQUIRED,
            pattern: {
              value: REGEX.NAME,
              message: MESSAGES_ERROR.NAME_INVALID,
            },
          }}
          name="name"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
              setValue("name", event.target.value); // trailing spaces after blur and saving value back to control
              onBlur();
            };
            return (
              <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
                <InputField
                  required
                  label="Name"
                  id="name"
                  value={value}
                  errorMessage={error?.message}
                  onChange={onChange}
                  onBlur={handleBlur}
                />
              </div>
            );
          }}
        />

        <Controller
          control={control}
          name="gender"
          rules={{
            required: MESSAGES_ERROR.FIELD_REQUIRED,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
              <SelectField
                required
                data-testid="gender"
                label="Gender"
                value={String(value)}
                disabled={isLoading}
                placeholder="Select Gender"
                errorMessage={error?.message}
                onChange={onChange}
                options={GENDERS}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value } }) => (
            <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
              <InputField
                disabled={true}
                label="Email"
                type="email"
                id="email"
                value={value}
                classCustomInput="dark:!text-stone-400 text-stone-400"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="confirmationEmail"
          render={({ field: { value } }) => (
            <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
              <InputField
                disabled={true}
                label="Confirmation email"
                id="confirmationEmail"
                type="email"
                value={value}
                classCustomInput="dark:!text-stone-400 text-stone-400"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="birthday"
          rules={{
            validate: validateBirthDate,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="w-full pt-5 pl-6">
              <BirthDayField
                required
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          rules={{
            pattern: {
              value: REGEX.NAME,
              message: MESSAGES_ERROR.NAME_INVALID,
            },
          }}
          name="location"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
              <InputField
                label="Your location"
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
          name="phoneNumber"
          rules={{
            pattern: {
              value: REGEX.PHONE_NUMBER,
              message: MESSAGES_ERROR.INVALID_PHONE_NUMBER,
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            const handleChange = (value: string) => {
              const phoneValueFormatter = formatPhoneNumber(value);

              onChange(phoneValueFormatter);
            };
            return (
              <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
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

        <Controller
          control={control}
          name="language"
          render={({ field: { value } }) => (
            <div className="min-h-20 w-full pt-6 pl-6 md:w-1/2">
              <InputField
                disabled={true}
                label="Language"
                id="language"
                value={value}
                classCustomInput="dark:!text-stone-400 text-stone-400"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="skills"
          render={({ field: { value, onChange } }) => {
            return (
              <div className="min-h-20 w-full flex flex-col pl-6 pt-6 md:w-1/2">
                <label
                  htmlFor="skills"
                  className="text-grey text-sm dark:text-lighter">
                  Skills
                </label>
                <MultiSelect
                  id="skills"
                  className="select-custom dark:text-white dark:border-light dark:focus:border-white"
                  placeholder="Select skills"
                  value={value.map(String)}
                  onValueChange={onChange}>
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
        <div className="pt-7 flex flex-1 justify-end">
          <Button
            type="submit"
            size="xs"
            variant={VARIANT_BUTTON.PRIMARY}
            disabled={!Object.keys(dirtyFields).length || !isDirty}
            additionalClass="antialiased text-center uppercase px-6 py-2.5 rounded-lg border-0 items-end">
            {isLoading ? (
              <LoadingIndicator width={4} height={5} additionalClass="px-1.5" />
            ) : (
              <Text className="items-center uppercase py-[2px] text-xs font-bold font-primary text-white dark:text-dark-tremor-content-title">
                Save
              </Text>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(BasicInfoForm);
