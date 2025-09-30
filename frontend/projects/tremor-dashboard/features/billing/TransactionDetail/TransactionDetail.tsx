import { memo } from "react";
import isEqual from "react-fast-compare";
import dayjs from "dayjs";

// Components
const Transactions = dynamic(() => import("../Transaction/Transactions"));

// Types
import { Transaction, User } from "@/types";
import dynamic from "next/dynamic";

interface TransactionDetailProps {
  transactions: Transaction[];
  users: User[];
  userId: number;
}

const TransactionDetail = ({
  transactions,
  users,
  userId,
}: TransactionDetailProps) => {
  const transactionDate = transactions.length
    ? dayjs(transactions[0].createdAt).format("MMM YYYY")
    : "";

  return (
    <Transactions
      transactions={transactions}
      users={users}
      userId={userId}
      date={transactionDate}
    />
  );
};

export default memo(TransactionDetail, isEqual);
