import { memo } from "react";

// Types
import { SalaryCardData } from "@/types/billing";

// Components
import { Flex } from "@tremor/react";
import BillingCard from "../BillingCard/BillingCard";
import SalaryCard from "../SalaryCard/SalaryCard";

export interface BillingDataProps {
  cardInfo: {
    expire: string;
    cardNumber: string;
    holderFullName: string;
    cardLast4Digit: string;
  };
  aggregation: SalaryCardData[];
}

const BillingDetail = ({ cardInfo, aggregation }: BillingDataProps) => {
  const { cardNumber, holderFullName, expire, cardLast4Digit } = cardInfo;
  const billingCardNumber = cardNumber.match(/.{1,4}/g)?.join(" ") ?? "";

  return (
    <div className="w-full flex flex-col md:flex-row items-center">
      <div className="w-full mr-0 md:mr-6 max-w-[380px]">
        <BillingCard
          cardNumber={billingCardNumber}
          holderFullName={holderFullName}
          expire={expire}
          cardLast4Digit={cardLast4Digit}
        />
      </div>
      <Flex
        flexDirection="col"
        className="w-full gap-6 mt-6 md:mt-0 md:flex-row">
        {aggregation.map((item: SalaryCardData) => (
          <SalaryCard
            key={`${item.type}`}
            type={item.type}
            value={item.value}
          />
        ))}
      </Flex>
    </div>
  );
};

export default memo(BillingDetail);
