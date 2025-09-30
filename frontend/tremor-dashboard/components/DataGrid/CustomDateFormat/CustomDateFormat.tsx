"use client";

// Components
import { Text } from "@tremor/react";

// Helpers
import { formatDateTime } from "@/helpers/formatDate";

const CustomDateFormat = ({ date }: { date: string }) => (
  <Text className="text-xs text-tertiary dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] w-[180px] truncate">
    {formatDateTime(date)}
  </Text>
);

export default CustomDateFormat;
