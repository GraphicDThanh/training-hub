"use client";

// Import libs
import Image from "next/image";
import { Button, Flex } from "@tremor/react";
import { memo, useCallback, useState } from "react";
import { InView } from "react-intersection-observer";

// Components
import { Popover } from "@/components";

// Constants
import { METADATA_IMAGE, VARIANT_BUTTON } from "@/constants";

// HOCs
import { TWithPinCode, withPinCode } from "@/hocs/withPinCode";

// Icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// Helpers
import { formatCreditCard } from "@/helpers";

export interface IPaymentDetails {
  cardLast4Digit: string;
  cardDigit: string;
}

const PaymentDetails = ({
  cardLast4Digit,
  cardDigit,
  onOpenPinCodeModal,
}: TWithPinCode<IPaymentDetails>) => {
  const [isShowCardDigit, setIsShowCardDigit] = useState(false);

  const handleClick = useCallback(() => {
    const showCardDigitCallback = () => {
      setIsShowCardDigit(true);
    };

    isShowCardDigit
      ? setIsShowCardDigit(false)
      : onOpenPinCodeModal(showCardDigitCallback);
  }, [isShowCardDigit]);

  return (
    <div>
      <h6 className="text-tremor-content-title dark:text-dark-primary font-bold">
        Payment Details
      </h6>
      <Flex className="p-6 mt-4 border-[#dee2e6] rounded-lg border">
        <InView>
          <Flex justifyContent="start">
            <Image
              className="mr-4"
              src={METADATA_IMAGE.MASTERCARD}
              alt="master card icon"
              width="38"
              height="28"
            />

            <h6 className="text-tremor-content-title dark:text-dark-primary font-bold">
              {isShowCardDigit
                ? formatCreditCard(cardDigit)
                : `**** **** **** ${cardLast4Digit}`}
            </h6>
          </Flex>
        </InView>
        <div className="group relative">
          <Popover
            content="We do not store card details"
            className="text-center !bg-black !bottom-[-50px] min-w-[200px] rounded-md text-white right-[-50px] sm:right-[-60px] lg:right-[-82px] before:content-['▲'] before:absolute before:top-[-15px] before:right-[54px] sm:before:right-[64px] lg:before:right-[86px] before:text-[black]">
            <Button
              data-testid="btn-eyes"
              variant={VARIANT_BUTTON.LIGHT}
              icon={isShowCardDigit ? FaRegEyeSlash : FaRegEye}
              onClick={handleClick}
              aria-label="Toggle Show Card Digit Button"
              className="text-primary hover:text-primary dark:text-lighter dark:hover:text-lighter"
            />
          </Popover>
        </div>
      </Flex>
    </div>
  );
};

const PaymentDetailsWithPinCode = withPinCode(PaymentDetails);

export default memo(PaymentDetailsWithPinCode);
