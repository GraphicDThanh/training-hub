"use client";

// Libs
import Link from "next/link";

//Components
import { Flex, Title, Text } from "@tremor/react";
import { InvoiceLogo } from "..";

interface InvoiceHeaderProps {
  addressBank: string;
  cityBank: string;
  stateBank: string;
  phoneBank: string;
  fullName: string;
  addressCustomer: string;
  cityCustomer: string;
  stateCode: string;
  stateCustomer: string;
}

const InvoiceHeader = ({
  addressBank,
  cityBank,
  stateBank,
  phoneBank,
  fullName,
  addressCustomer,
  cityCustomer,
  stateCode,
  stateCustomer,
}: InvoiceHeaderProps) => {
  const renderAddressBankInfo = `${addressBank} ${cityBank}, ${stateBank}`;

  return (
    <Flex className="flex-col md:flex-row mb-10 md:mb-20 print:flex-row print:mb-10">
      <Flex
        flexDirection="col"
        alignItems="start"
        className="md:max-w-[35%] print:max-w-[35%]">
        <InvoiceLogo additionalClasses="browser-logo dark:[&>g]:fill-white [&>g]:fill--black" />
        {/* Show this image when in print preview mode */}
        <InvoiceLogo additionalClasses="print-logo" />
        <Title className="text-primary dark:text-white font-semibold leading-6 tracking-wide mt-7 print:text-primary dark:print:!text-primary">
          {renderAddressBankInfo}
        </Title>
        <Link
          href={`tel:${phoneBank}`}
          className="text-tertiary text-base dark:text-dark-romance font-primary font-light leading-6 tracking-wide mt-2 mb-6 md:mb-4 print:text-greyer dark:print:text-greyer print:mb-6">
          tel: {phoneBank}
        </Link>
      </Flex>
      <Flex
        flexDirection="col"
        alignItems="start"
        className="md:items-end md:mt-0 print:items-end print:text-right">
        <Title className="text-primary dark:text-white font-semibold leading-6 tracking-wide print:text-primary dark:print:!text-primary">
          Billed to: {fullName}
        </Title>
        <Text className="text-tertiary text-tremor-title dark:text-dark-romance font-primary font-light leading-6 tracking-wide md:text-right print:text-greyer dark:print:text-greyer">
          {addressCustomer}
          <br /> {cityCustomer} {stateCode}
          <br /> {stateCustomer}
        </Text>
      </Flex>
    </Flex>
  );
};

export default InvoiceHeader;
