"use client";

import { memo, useState } from "react";
import Image from "next/image";

// Components
import { Button, Flex, Text, Title } from "@tremor/react";

//Icons
import { MdWifi } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

// Constants
import { METADATA_IMAGE } from "@/constants";

// Hocs
import { TWithPinCode, withPinCode } from "@/hocs/withPinCode";

interface BillingCard {
  cardNumber: string;
  holderFullName: string;
  expire: string;
  cardLast4Digit: string;
}

const BillingCard = ({
  cardLast4Digit,
  cardNumber,
  expire,
  holderFullName,
  onOpenPinCodeModal,
}: TWithPinCode<BillingCard>) => {
  const [isShowAmount, setIsShowAmount] = useState(false);

  const toggleShowHideModal = () => {
    isShowAmount
      ? setIsShowAmount(false)
      : onOpenPinCodeModal(() => {
          setIsShowAmount(true);
        });
  };

  return (
    <Flex
      alignItems="center"
      className="relative text-white bg-gradient-primary dark:bg-gradient-pickled p-0 rounded-lg w-full md:w-[388px] min-h-[236px] shadow-[rgba(0,0,0,0.1)_0rem_1.25rem_1.5625rem_-0.3125rem,rgba(0,0,0,0.04)_0rem_0.625rem_0.625rem_-0.3125rem]">
      <Image
        alt="Master Card background"
        className="opacity-20 bg-cover object-cover"
        priority
        fill
        src="/images/backgrounds/bg-card.webp"
      />
      <Flex
        flexDirection="col"
        justifyContent="start"
        alignItems="center"
        className="p-4 z-10">
        <Flex>
          <MdWifi className="text-2xl m-2" />
        </Flex>
        <Flex className="mt-6 mb-8 gap-4">
          <Text className="text-xl text-white font-bold">
            {isShowAmount ? cardNumber : `**** **** **** ${cardLast4Digit}`}
          </Text>
          <Button
            aria-label="Toggle Show Salary Button"
            data-testid="toggle-show-amount"
            variant="light"
            icon={isShowAmount ? FaRegEyeSlash : FaRegEye}
            onClick={toggleShowHideModal}
            className="text-white hover:text-white dark:text-white dark:hover:text-white"
          />
        </Flex>
        <Flex className="2xl:py-[5px]">
          <Flex>
            <Flex
              flexDirection="col"
              alignItems="start"
              className="min-w-[138px]">
              <Text className="text-white opacity-80 tracking-[0.4px] ">
                Card Holder
              </Text>
              <h2 className="text-white font-semibold tracking-[0.12px]">
                {holderFullName}
              </h2>
            </Flex>
            <Flex flexDirection="col" alignItems="start">
              <Text className="text-white opacity-80 tracking-[0.4px]">
                Expires
              </Text>
              <Title className="text-white font-semibold tracking-[0.12px]">
                {expire}
              </Title>
            </Flex>
          </Flex>
          <Flex justifyContent="end">
            <Image
              src={METADATA_IMAGE.MASTERCARD}
              alt="master card icon"
              width="40"
              height="30"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const BillingCardWithPinCode = withPinCode(BillingCard);

export default memo(BillingCardWithPinCode);
