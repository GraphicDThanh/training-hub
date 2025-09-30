// Helpers
import { moneyFormat } from "@/helpers";

// Constants
import { TRANSACTION_CLASS } from "@/constants";

// Types
import { STATUS_LIST } from "@/types";

export const getContentByProps = (
  status: number,
  type: number,
  amount: number,
) => {
  const formattedAmount = moneyFormat({ value: amount });
  const hasStatus = status !== STATUS_LIST.ERROR;
  const hasType = type !== STATUS_LIST.ERROR;

  if (!hasStatus) {
    return {
      ...TRANSACTION_CLASS.PENDING,
      value: "Pending",
    };
  }

  if (hasType) {
    return {
      ...TRANSACTION_CLASS.DECREASE,
      value: `-$${formattedAmount}`,
    };
  }

  return {
    ...TRANSACTION_CLASS.INCREASE,
    value: `+$${formattedAmount}`,
  };
};
