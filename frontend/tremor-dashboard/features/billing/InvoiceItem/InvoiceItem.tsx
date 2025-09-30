"use client";

import { memo } from "react";

// Libs
import Link from "next/link";
import { MdPictureAsPdf } from "react-icons/md";

// Components
import { Text } from "@tremor/react";

// Constants
import { CURRENCY, ROUTES } from "@/constants";

// Helpers
import { formatNewDate, moneyFormat } from "@/helpers";

interface InvoiceItemProps {
  id: number;
  date: string;
  invoicePrefix: string;
  price: number;
}

const InvoiceItem = ({ id, date, invoicePrefix, price }: InvoiceItemProps) => (
  <li className="w-full flex justify-between py-2 pr-2">
    <div>
      <Text className="font-semibold text-primary dark:text-white">
        {formatNewDate(date)}
      </Text>
      <Text className="text-xs mt-1 text-tertiary dark:text-dark-romance">
        &#35;{invoicePrefix}-{id}
      </Text>
    </div>
    <div className="flex gap-6 items-center">
      <Text className="text-tertiary dark:text-dark-romance">
        {moneyFormat({
          value: price,
          currency: CURRENCY.DOLLAR,
        })}
      </Text>
      <Link
        className="flex gap-1 items-center text-primary dark:text-white font-semibold"
        href={`${ROUTES.INVOICES}/${id}`}>
        <MdPictureAsPdf className="text-xl dark:text-lighter" />
        PDF
      </Link>
    </div>
  </li>
);

export default memo(InvoiceItem);
