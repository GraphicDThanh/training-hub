"use client";

// Libs
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";

// Components
import { TextInput, Flex, Text } from "@tremor/react";
import { LoadingIndicator, Checkbox, Button } from "@/components";

// Constants
import {
  MESSAGES_ERROR,
  MESSAGE_SIGN_UP,
  REGEX,
  ROUTES,
  VARIANT_BUTTON,
} from "@/constants";

// Types
import { User } from "@/types";

//Styles
import "@/styles/form.css";

// Enums
import { TOAST_TYPE, TWithToast, withToast } from "@/hocs/withToast";
import { signUp } from "@/services";

const SignUpForm = ({ openToast }: TWithToast<{}>) => {
  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<User>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
    mode: "onBlur",
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const isDisable =
    !isDirty ||
    !!errors.name?.message ||
    !!errors.email?.message ||
    !!errors.name?.message;

  const handleSignUp = useCallback(
    async (value: User) => {
      const handleNavigateSignIn = () => {
        router.replace(ROUTES.SIGN_IN);
      };

      startTransition(async () => {
        const { errorMessage } = await signUp(value);

        if (errorMessage) {
          openToast({
            type: TOAST_TYPE.ERROR,
            message: errorMessage,
          });
          return;
        }

        openToast(
          {
            type: TOAST_TYPE.SUCCESS,
            message: MESSAGE_SIGN_UP.SUCCESS,
          },
          handleNavigateSignIn,
        );
      });
    },
    [openToast, router],
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
            Sign up
          </Text>
          <Text className="text-white tracking-wide font-light max-w-xs px-8 text-center 2xl:px-0">
            Enter your email and password to register
          </Text>
        </Flex>
        <div>
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full p-2 sign-up">
            {isPending && (
              <div className="opacity-25 fixed inset-0 z-20 bg-black cursor-not-allowed" />
            )}
            <Controller
              control={control}
              rules={{
                minLength: {
                  value: 4,
                  message: MESSAGES_ERROR.NAME_MIN_LENGTH,
                },
                validate: value => {
                  return !!value.trim() || MESSAGES_ERROR.NAME_REQUIRED;
                },
              }}
              render={({ field, formState: { errors } }) => {
                const nameErrorMessage = errors.name?.message || "";

                return (
                  <div className="h-[70px] w-full">
                    <TextInput
                      id="name"
                      data-testid="signup-name"
                      placeholder="Name"
                      autoFocus
                      className="py-1 w-full rounded-b-none border-l-0 border-r-0 border-t-0 border-b-1 dark:border-white focus:border-b-2 focus:outline-none focus:border-tremor-brand-subtle shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent ring-0"
                      required
                      {...field}
                    />
                    {nameErrorMessage && (
                      <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                        {nameErrorMessage}
                      </Text>
                    )}
                  </div>
                );
              }}
              name="name"
            />
            <Controller
              control={control}
              rules={{
                required: MESSAGES_ERROR.EMAIL_REQUIRED,
                pattern: {
                  value: REGEX.EMAIL,
                  message: MESSAGES_ERROR.EMAIL_INVALID,
                },
              }}
              render={({ field, formState: { errors } }) => {
                const emailErrorMessage = errors.email?.message || "";

                return (
                  <div className="h-[70px] w-full">
                    <TextInput
                      id="email"
                      placeholder="Email"
                      data-testid="signup-email"
                      type="email"
                      className="py-1 w-full rounded-b-none border-l-0 border-r-0 border-t-0 border-b-1 dark:border-white focus:border-b-2 focus:outline-none focus:border-tremor-brand-subtle shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent ring-0"
                      required
                      tabIndex={0}
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
                pattern: {
                  value: REGEX.PASSWORD,
                  message: MESSAGES_ERROR.PASSWORD_INVALID,
                },
              }}
              render={({ field, formState: { errors } }) => {
                const passwordErrorMessage = errors.password?.message || "";

                return (
                  <div className="h-[70px] w-full">
                    <TextInput
                      id="password"
                      placeholder="Password"
                      type="password"
                      data-testid="signup-password"
                      className="py-1 w-full rounded-b-none border-l-0 border-r-0 border-t-0 border-b-1 dark:border-white focus:border-b-2 focus:outline-none focus:border-tremor-brand-subtle shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent ring-0"
                      required
                      tabIndex={0}
                      {...field}
                    />
                    {passwordErrorMessage && (
                      <Text className="pt-1 text-xs leading-3 text-red-500 dark:text-red-500">
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
              rules={{
                required: MESSAGES_ERROR.TERMS_REQUIRED,
              }}
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => {
                const termErrorMessage = errors.agreeTerms?.message || "";

                return (
                  <div>
                    <div className="flex items-center space-x-3 pt-3">
                      <Checkbox
                        id="termsAndConditions"
                        data-testid="signup-terms"
                        onChange={onChange}
                        checked={value}
                        tabIndex={0}
                        disabled={isPending}
                        aria-label="Terms And Conditions"
                      />
                      <Text className="text-xs xs:text-sm text-tertiary dark:text-dark-romance font-normal">
                        I agree the{" "}
                        <Link
                          tabIndex={0}
                          href="#"
                          className="no-underline text-primary dark:text-white font-bold">
                          Terms and conditions
                        </Link>
                      </Text>
                    </div>
                    {termErrorMessage && (
                      <Text className="pt-1 text-xs leading-3 text-red-500 dark:text-red-500">
                        {termErrorMessage}
                      </Text>
                    )}
                  </div>
                );
              }}
              name="agreeTerms"
            />
            <Button
              tabIndex={0}
              variant={VARIANT_BUTTON.PRIMARY}
              type="submit"
              data-testid="signup-submit"
              size="xs"
              disabled={isDisable}
              additionalClass="min-h-[43px] w-full rounded-lg py-[11px] mt-9 uppercase border-0 border-transparent hover:border-transparent">
              {isPending ? (
                <LoadingIndicator width={5} height={5} />
              ) : (
                <Text className="font-bold text-xs text-white dark:text-white">
                  Create account
                </Text>
              )}
            </Button>
            <Flex justifyContent="center" className="mt-8 mb-2">
              <Text className="text-tertiary dark:text-dark-romance text-xs xs:text-sm font-light">
                Already have an account?
              </Text>
              <Link
                tabIndex={0}
                className="text-primary dark:text-white font-semibold text-xs xs:text-sm ml-1"
                href={ROUTES.SIGN_IN}>
                Sign In
              </Link>
            </Flex>
          </form>
        </div>
      </div>
    </Flex>
  );
};

const SignUpFormWithToast = withToast(SignUpForm, true);
export default SignUpFormWithToast;
