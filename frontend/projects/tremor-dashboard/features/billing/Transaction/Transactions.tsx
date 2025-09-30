import { memo } from "react";
import isEqual from "react-fast-compare";
import { revalidateTag } from "next/cache";

// Types
import { OptionType, Transaction, User } from "@/types";

// Icons
import { FaRegCalendarAlt } from "react-icons/fa";

// Context
import ToastProvider from "@/context/toast";

// Components
import { Bold, Text } from "@tremor/react";
import CreateTransactionContainer from "./CreateTransactionContainer/CreateTransactionContainer";
import dynamic from "next/dynamic";
const TransactionList = dynamic(
  () => import("../TransactionList/TransactionList"),
);

interface TransactionsProps {
  transactions: Transaction[];
  date: string;
  users: User[];
  userId: number;
}

export async function handleRefetchTransactionList() {
  "use server";

  revalidateTag("transactions");
}

const Transactions = ({
  transactions,
  date,
  users,
  userId,
}: TransactionsProps) => {
  const newUserList = users.filter(user => user.id !== userId);

  const emailOptions: OptionType[] = newUserList.map((user: User) => ({
    option: user.email,
    value: user.id.toString(),
  }));

  const renderTransactionList = () =>
    transactions.length ? (
      <>
        <Bold className="font-semibold text-xs my-6 text-tertiary dark:text-dark-romance">
          NEWEST
        </Bold>
        <ul
          className="overflow-y-auto max-h-[492px] dark:max-h-[420px] pr-2 sm:pr-3"
          tabIndex={0}>
          <TransactionList transactions={transactions} />
        </ul>
      </>
    ) : (
      <Text className="text-tertiary text-center p-5">
        There is no transaction!
      </Text>
    );

  return (
    <div className="p-4 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <h3 className="text-sm xs:text-base text-primary font-semibold capitalize dark:text-white tracking-[0.12px]">
            Your Transaction&#39;s
          </h3>
          <ToastProvider>
            <CreateTransactionContainer
              options={emailOptions}
              fromUserId={userId}
              onRefetchTransactionList={handleRefetchTransactionList}
            />
          </ToastProvider>
        </div>
        {date && (
          <div className="flex items-center text-secondary" data-testid="date">
            <FaRegCalendarAlt className="dark:text-lighter" />
            <Text className="text-tertiary dark:text-dark-romance ml-2">
              {date}
            </Text>
          </div>
        )}
      </div>
      {renderTransactionList()}
    </div>
  );
};

export default memo(Transactions, isEqual);
