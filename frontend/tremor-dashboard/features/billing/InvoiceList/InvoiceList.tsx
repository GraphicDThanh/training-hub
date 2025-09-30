"use client";

// Libs
import { memo } from "react";
import isEqual from "react-fast-compare";
import dynamic from "next/dynamic";

// Components
import { Text } from "@tremor/react";
import Button from "@/components/Button/Button";
const InvoiceItem = dynamic(() => import("../InvoiceItem/InvoiceItem"), {
  ssr: false,
});

// Types
import { Invoice } from "@/types/billing";

// Constants
import { VARIANT_BUTTON } from "@/constants/common";

interface InvoicesProps {
  invoices: Invoice[];
}

const Invoices = ({ invoices }: InvoicesProps) => {
  const invoiceListDeskTop = invoices.slice(0, 2).map(invoice => {
    const { id, invoicePrefix, createdAt, totalCost } = invoice;
    return (
      <InvoiceItem
        key={id}
        id={id}
        date={createdAt}
        invoicePrefix={invoicePrefix}
        price={totalCost}
      />
    );
  });

  const invoiceList = invoices.slice(0, 5).map(invoice => {
    const { id, invoicePrefix, createdAt, totalCost } = invoice;
    return (
      <InvoiceItem
        key={id}
        id={id}
        date={createdAt}
        invoicePrefix={invoicePrefix}
        price={totalCost}
      />
    );
  });

  return (
    <div className="py-6 px-4 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-md w-full min-h-[236px]">
      <div className="text-primary dark:text-white flex justify-between items-center">
        <h3 className="font-semibold">Invoices</h3>
        <Button
          variantTremor={VARIANT_BUTTON.LIGHT}
          additionalClass="uppercase font-bold px-4 py-1.5 border border-primary dark:border-white rounded-md tracking-wide hidden">
          <Text className="text-xs text-primary">view all</Text>
        </Button>
      </div>
      <ul className="flex flex-col gap-2 mt-6 lg:block">
        {invoiceListDeskTop}
      </ul>
      <ul className="flex flex-col gap-2 mt-2 lg:hidden">{invoiceList}</ul>
    </div>
  );
};

export default memo(Invoices, isEqual);
