"use client";

// Components
import { ChipStatus } from "@/components";
import { Bold, Text } from "@tremor/react";

// Helpers
import { formatDateTime, getContentByProps } from "@/helpers";

interface TransactionItemProps {
  createdAt: string;
  service: string;
  amount: number;
  type: number;
  status: number;
}

const TransactionItem = ({
  createdAt,
  service,
  amount,
  type,
  status,
}: TransactionItemProps) => {
  const { buttonClasses, textClasses, value } = getContentByProps(
    status,
    type,
    amount,
  );

  return (
    <li className="flex py-4 justify-between items-center">
      <div className="flex gap-2 sm:gap-4 items-center">
        <ChipStatus extendedClass={buttonClasses} value={value} />
        <div>
          <Bold className="text-sm font-semibold text-primary dark:text-white mb-1">
            {service}
          </Bold>
          <Text className="text-xs text-tertiary dark:text-dark-romance">
            {formatDateTime(createdAt)}
          </Text>
        </div>
      </div>
      <Text className={textClasses}>{value}</Text>
    </li>
  );
};

export default TransactionItem;
