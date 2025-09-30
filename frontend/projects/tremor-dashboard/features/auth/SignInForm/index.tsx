"use client";

// Libs
import { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";

// Components
import { TextInput, Flex, Switch, Text } from "@tremor/react";
import { Button, LoadingIndicator } from "@/components";

// Constants
import {
  ROUTES,
  MESSAGES_ERROR,
  VARIANT_BUTTON,
  MESSAGE_SIGN_IN,
} from "@/constants";

// Types
import { User } from "@/types";

// Actions
import { authenticationLogin } from "@/services/authenticationLogin";

// Helpers
import { getFormData } from "@/helpers";
import { logIn } from "@/services";

import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";

const SignInForm = ({ openToast }: TWithToast<{}>) => {
  const { control, setError, handleSubmit } = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(
    async (value: User) => {
      setIsLoading(true);

      const response = await logIn({
        email: value.email,
        password: value.password,
      });

      const { user, errorMessage } = response;

      if (user) await authenticationLogin(getFormData(user));

      openToast(
        {
          type: user ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
          message: user ? MESSAGE_SIGN_IN.SUCCESS : MESSAGE_SIGN_IN.FAILED,
        },
        () => {
          setIsLoading(false);
        },
      );

      if (!errorMessage) return;

      // update API return error by field

      if (errorMessage.toLowerCase().includes("user"))
        setError("email", {
          message: errorMessage,
        });

      if (errorMessage.toLowerCase().includes("password")) {
        setError("password", {
          message: errorMessage,
        });
      }
    },
    [openToast, setError],
  );

  return (
    <Flex
      flexDirection="col"
      className="mx-auto bg-white dark:bg-dark-tremor-primary rounded-xl max-w-[348px] md:max-w-xl">
      <div className="w-full p-4 antialiased font-primary">
        <Flex
          flexDirection="col"
          justifyContent="center"
          className="bg-gradient-primary dark:bg-gradient-pickled rounded-xl -mt-11 mb-7 pb-7 shadow-btn-primary">
          <Text className="font-semibold pt-8 pb-2 px-8 !text-tremor-normal text-white tracking-wide">
            Sign in
          </Text>
        </Flex>
        <form
          noValidate
          onSubmit={handleSubmit(handleSignIn)}
          className="w-full sm:p-3 sign-in">
          {isLoading && (
            <div className="opacity-25 fixed inset-0 z-20 bg-black cursor-not-allowed" />
          )}
          <Controller
            control={control}
            rules={{
              required: MESSAGES_ERROR.EMAIL_REQUIRED,
            }}
            render={({ field, formState: { errors } }) => {
              const emailErrorMessage = errors.email?.message ?? "";
              return (
                <div className="h-[70px] w-full">
                  <TextInput
                    id="email"
                    data-testid="signin-email"
                    placeholder="Email"
                    type="email"
                    autoFocus
                    className="py-1 w-full rounded-b-none border-l-0 border-r-0 border-t-0 border-b-1 dark:border-white focus:border-b-2 focus:outline-none focus:border-tremor-brand-subtle shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent ring-0"
                    {...field}
                  />
                  {emailErrorMessage && (
                    <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                      {emailErrorMessage}
                    </Text>
                  )}
                </div>
              );
            }}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: MESSAGES_ERROR.PASSWORD_REQUIRED,
            }}
            render={({ field, formState: { errors } }) => {
              const passwordErrorMessage = errors.password?.message ?? "";
              return (
                <div className="h-[70px] w-full">
                  <TextInput
                    tabIndex={0}
                    id="password"
                    data-testid="signin-password"
                    placeholder="Password"
                    type="password"
                    className="py-1 w-full rounded-b-none border-l-0 border-r-0 border-t-0 border-b-1 dark:border-white focus:border-b-2 focus:outline-none focus:border-tremor-brand-subtle shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent ring-0"
                    {...field}
                  />
                  {passwordErrorMessage && (
                    <Text className="pt-1 ml-1 leading-3 text-xs text-red-500 dark:text-red-500">
                      {passwordErrorMessage}
                    </Text>
                  )}
                </div>
              );
            }}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex items-center space-x-3 mt-6">
                <Switch
                  id="remember"
                  tabIndex={0}
                  checked={value}
                  color="zinc"
                  disabled={isLoading}
                  className="switch flex justify-center items-center"
                  onChange={onChange}
                />
                <Text className="text-tertiary dark:text-dark-romance font-normal">
                  Remember me
                </Text>
              </div>
            )}
            name="remember"
          />

          <Button
            tabIndex={0}
            aria-disabled={isLoading}
            variant={VARIANT_BUTTON.PRIMARY}
            type="submit"
            data-testid="signin-submit"
            size="xs"
            disabled={isLoading}
            additionalClass="min-h-[43px] flex w-full opacity-100 disabled:opacity-100 disabled:bg-[linear-gradient(195deg,#c1c1c3,#bebebf)] dark:disabled:bg-[linear-gradient(195deg,#283046,#1e263c)] py-0 mt-9 uppercase border-0 border-transparent hover:border-transparent">
            {isLoading ? (
              <LoadingIndicator width={7} height={7} />
            ) : (
              <Text className="text-xs font-bold text-white dark:text-white">
                Sign In
              </Text>
            )}
          </Button>
          <Flex justifyContent="center" className="mt-8 mb-2">
            <Text className="text-tertiary dark:text-dark-romance font-light">
              Don&rsquo;t have an account?
            </Text>
            <Link
              tabIndex={0}
              className="text-primary dark:text-white font-semibold text-sm ml-1"
              href={ROUTES.SIGN_UP}>
              Sign up
            </Link>
          </Flex>
        </form>
      </div>
    </Flex>
  );
};

const SignInFormWithToast = withToast(SignInForm);

export default SignInFormWithToast;
