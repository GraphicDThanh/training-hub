"use client";

import { ChangeEvent, ReactNode, forwardRef, useState } from "react";

// Helpers
import { cn } from "@/helpers";

// Components
import { Text, Flex } from "@tremor/react";

// Icons
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  additionalClass?: string;
}

export type InputProps = Omit<InputPasswordProps, "stepper" | "onChange"> & {
  defaultValue?: string;
  icon?: ReactNode;
  errorMessage?: string;
  onChange: (value: string) => void;
};

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      placeholder,
      additionalClass = "",
      errorMessage = "",
      onChange,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value: string =
        event.target.value.trimStart().replace(/\s+/g, " ") ?? "";

      onChange?.(value);
    };

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="text-grey text-sm dark:text-lighter after:content-['*'] after:text-red-500 after:text-md">
          {label}
        </label>
        <Flex className="relative">
          <div className="w-full">
            <div className="relative">
              <input
                ref={ref}
                id={id}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={disabled}
                className={cn(
                  "block py-1.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer disabled:cursor-not-allowed disabled:opacity-50",
                  additionalClass,
                )}
                {...rest}
              />
              {!disabled && (
                <div
                  className="absolute right-0 top-0 mt-2 mr-2 hover:cursor-pointer hover:opacity-75"
                  onClick={toggleShowPassword}>
                  {showPassword ? (
                    <RiEyeOffFill className="text-primary text-xl dark:hover:text-white" />
                  ) : (
                    <RiEyeFill className="text-primary text-xl dark:hover:text-white" />
                  )}
                </div>
              )}
            </div>
            {errorMessage && (
              <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
                {errorMessage}
              </Text>
            )}
          </div>
        </Flex>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
