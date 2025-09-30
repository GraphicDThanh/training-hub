import { InView } from "react-intersection-observer";
import { Suspense } from "react";
import { Flex } from "@tremor/react";

import { getUserFromCookies } from "@/helpers/user";

// Components
import {
  BillingDetail,
  BillingDetailsSkeleton,
  BillingInfoDetail,
  BillingInfoSkeleton,
  Invoices,
  InvoicesSkeleton,
  TransactionDetail,
  TransactionsSkeleton,
} from "@/features/billing";

// Services
import {
  getBillings,
  getTransactionsByUserId,
  getInvoices,
  getUsers,
} from "@/services";

export const metadata = {
  title: "Billing - Tremor Dashboard",
};

const Billing = async () => {
  const userCookie = await getUserFromCookies();

  const [transactions, invoices, billings, users] = await Promise.all([
    getTransactionsByUserId(userCookie.id),
    getInvoices(),
    getBillings(),
    getUsers(),
  ]);

  const { billingInfos, cardInfo, aggregation } = billings;

  return (
    <main>
      <Flex flexDirection="col" alignItems="start" className="pb-6 xl:flex-row">
        <Flex
          flexDirection="col"
          alignItems="start"
          className="basis-2/3 xl:flex-row"
          as="section">
          <Suspense fallback={<BillingDetailsSkeleton />}>
            <BillingDetail cardInfo={cardInfo} aggregation={aggregation} />
          </Suspense>
        </Flex>
        <InView className="basis-1/3 w-full" as="section">
          <Flex className="pt-6 xl:pt-0 xl:pl-6" flexDirection="col">
            <Suspense fallback={<InvoicesSkeleton />}>
              <Invoices invoices={invoices} />
            </Suspense>
          </Flex>
        </InView>
      </Flex>
      <Flex flexDirection="col" alignItems="start" className="md:flex-row">
        <InView
          className="w-full max-w-[2042px] bg-white dark:bg-dark-tremor-primary p-4 rounded-xl shadow-box-icon-default dark:shadow-main-content mr-0 md:mr-6"
          as="section">
          <h3 className="text-primary font-semibold capitalize dark:text-white tracking-[0.12px]">
            Billing Information
          </h3>
          <Suspense fallback={<BillingInfoSkeleton />}>
            <BillingInfoDetail billingInfos={billingInfos} />
          </Suspense>
        </InView>
        <InView
          className="w-full md:min-h-[640px] 2xl:max-w-[1450px] mt-6 md:mt-0"
          as="section">
          <Suspense fallback={<TransactionsSkeleton />}>
            <TransactionDetail
              transactions={transactions}
              users={users}
              userId={userCookie.id}
            />
          </Suspense>
        </InView>
      </Flex>
    </main>
  );
};

export default Billing;
