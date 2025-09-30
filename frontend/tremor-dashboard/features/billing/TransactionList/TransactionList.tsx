import dynamic from "next/dynamic";

// Components
const TransactionItem = dynamic(
  () => import("../TransactionItem/TransactionItem"),
  { ssr: false },
);

// Types
import { Transaction } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) =>
  transactions.map((transaction: Transaction) => {
    const { id, createdAt, amount, service, status, type } = transaction;
    return (
      <TransactionItem
        key={id}
        createdAt={createdAt}
        type={type}
        status={status}
        service={service}
        amount={amount}
      />
    );
  });

export default TransactionList;
