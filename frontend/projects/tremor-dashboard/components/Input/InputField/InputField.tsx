import { ChangeEvent, ReactNode, forwardRef } from "react";

// Helpers
import { cn } from "@/helpers";

// Components
import { Text, Flex } from "@tremor/react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  required?: boolean;
  contentPrefix?: string | JSX.Element | null;
  errorMessage?: string;
  classCustomInput?: string;
}

export type InputProps = Omit<InputFieldProps, "stepper" | "onChange"> & {
  defaultValue?: string;
  icon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    label,
    type = "text",
    placeholder,
    contentPrefix = "",
    classCustomInput = "",
    required = false,
    errorMessage = "",
    onChange,
    onBlur,
    ...rest
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string =
      event.target.value
        .replace(/(^\s*)/gi, "") // removes leading spaces
        .replace(/[ ]{2,}/gi, " ") // replaces multiple spaces with one space
        .replace(/\n +/, "\n") ?? ""; // trailing break down character
    onChange?.(value);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    onBlur?.({
      ...event,
      target: {
        ...event.target,
        value: event.target.value.replace(/(\s*$)/gi, ""), // trailing spaces
      },
    });
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={cn("text-grey text-sm dark:text-lighter", {
          "after:content-['*'] after:text-red-500 after:text-md": required,
        })}>
        {label}
      </label>
      <Flex className="relative">
        {contentPrefix && (
          <span className="absolute top-0 left-0 text-sm min-h-[30px] py-1.5 text-primary dark:text-white">
            {contentPrefix}
          </span>
        )}
        <div className="w-full">
          <input
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block py-1.5 px-0 w-full text-sm text-primary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer disabled:cursor-not-allowed disabled:opacity-50 ${classCustomInput}`}
            {...rest}
          />
          {errorMessage && (
            <Text className="pt-1 text-xs text-red-500 dark:text-red-500">
              {errorMessage}
            </Text>
          )}
        </div>
      </Flex>
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
