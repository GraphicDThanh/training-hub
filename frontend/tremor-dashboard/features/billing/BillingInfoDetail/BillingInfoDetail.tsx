import { memo } from "react";
import isEqual from "react-fast-compare";

// Components
import { BillingInfo } from "@/features/billing";

// Types
import { BillingInfoData } from "@/types/orderDetails";

interface BillingInfoDataProps {
  billingInfos: BillingInfoData[];
}

const BillingInfoDetail = ({ billingInfos }: BillingInfoDataProps) => {
  return (
    <>
      {billingInfos.map(
        ({ id, ownerName, companyName, email, vat }: BillingInfoData) => (
          <BillingInfo
            key={id}
            ownerName={ownerName}
            companyName={companyName}
            email={email}
            vat={vat}
          />
        ),
      )}
    </>
  );
};

export default memo(BillingInfoDetail, isEqual);
