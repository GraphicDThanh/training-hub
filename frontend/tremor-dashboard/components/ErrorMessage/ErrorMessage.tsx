import { Text } from "@tremor/react";
import React from "react";
import { twMerge } from "tailwind-merge";

const ErrorMessage = ({
  errorMessage,
  className = "",
}: {
  errorMessage: string;
  className?: string;
}) => {
  return (
    <Text
      className={twMerge("text-xs text-red-500 dark:text-red-500", className)}>
      {errorMessage}
    </Text>
  );
};

export default ErrorMessage;
