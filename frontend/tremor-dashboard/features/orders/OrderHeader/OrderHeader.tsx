// Libs
import { Flex, Bold, Text } from "@tremor/react";
import { memo } from "react";

// Types
import { InvoiceHeaderData } from "@/types";

const OrderHeader = ({ id, createdAt, orderCode }: InvoiceHeaderData) => {
  return (
    <Flex flexDirection="col" alignItems="start" className="invoice">
      <Bold className="text-primary font-semibold capitalize dark:text-white tracking-[0.12px]">
        Order Details
      </Bold>
      <div className="mt-2 tracking-[0.4px]">
        <Text className="text-tertiary dark:text-dark-romance">
          Order no. <Bold>{id}</Bold> from{" "}
          <Bold>
            {createdAt?.replace(/T.*/, "").split("-").reverse().join(".")}
          </Bold>
        </Text>
        <Text className="text-tertiary dark:text-dark-romance">
          Code: <Bold>{orderCode}</Bold>
        </Text>
      </div>
    </Flex>
  );
};

export default memo(OrderHeader);
