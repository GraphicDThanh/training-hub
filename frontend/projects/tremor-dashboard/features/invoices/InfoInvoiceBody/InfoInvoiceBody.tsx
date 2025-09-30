"use client";

import Link from "next/link";
import dayjs from "dayjs";

// Components
import { Flex, Title, Text } from "@tremor/react";

interface InfoInvoiceProps {
  id: number;
  createdAt: string;
  dueAt: string;
}

const InfoInvoice = ({ id, createdAt, dueAt }: InfoInvoiceProps) => {
  const formattedCreateAt = dayjs(createdAt).format("DD/MM/YYYY");
  const formattedDueAt = dayjs(dueAt).format("DD/MM/YYYY");

  return (
    <Flex
      flexDirection="col"
      alignItems="start"
      className="mb-7 md:flex-row md:items-center print:flex-row print:mb-7">
      <div className="w-full mb-5 md:mb-0 print:mb-0">
        <Title className="font-normal dark:text-lighter text-tertiary print:text-greyer dark:print:text-greyer print:mb-1">
          Invoice no
        </Title>
        <Link
          href="#"
          className="text-tremor-primary text-primary dark:text-white leading-relaxed font-bold tracking-wide no-underline print:text-primary dark:print:!text-primary">
          #{id}
        </Link>
      </div>
      <div className="w-full">
        <Flex
          flexDirection="col"
          className="md:flex-row mb-1 md:mb-0 print:flex-row print:mb-1">
          <Title className="w-full mb-1 md:mb-0 print:mb-1 text-left md:text-end print:text-end font-normal dark:text-lighter text-tertiary print:text-greyer dark:print:text-greyer">
            Invoice date:
          </Title>
          <Text className="w-full text-left md:text-end print:text-end text-tremor-title text-primary font-semibold dark:text-white dark:print:text-primary">
            {formattedCreateAt}
          </Text>
        </Flex>
        <Flex flexDirection="col" className="md:flex-row print:flex-row">
          <Title className="w-full mb-1 md:mb-0 print:mb-1 text-left md:text-end print:text-end font-normal dark:text-lighter text-tertiary print:text-greyer dark:print:text-greyer">
            Due date:
          </Title>
          <Text className="w-full text-left md:text-end print:text-end text-tremor-title text-primary font-semibold dark:text-white dark:print:text-primary">
            {formattedDueAt}
          </Text>
        </Flex>
      </div>
    </Flex>
  );
};

export default InfoInvoice;
