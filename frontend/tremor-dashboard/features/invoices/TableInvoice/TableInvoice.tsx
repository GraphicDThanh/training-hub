"use client";

// Components
import { DataGrid } from "@/components";
import { Text } from "@tremor/react";

// Types
import { TInvoiceDetail, ColumnType } from "@/types";

// Helpers
import { moneyFormat } from "@/helpers";

// Constants
import { CURRENCY } from "@/constants";

// Styles
import "@/styles/products.css";

const TableInvoice = ({
  details,
  totalCost,
}: {
  details: TInvoiceDetail[];
  totalCost: number;
}) => {
  // Invoice Body Table Props
  const columns: ColumnType<TInvoiceDetail>[] = [
    {
      key: "name",
      title: "Item",
      customNode: (_, { productName }) => (
        <Text className="max-w-[250px] md:max-w-sm truncate print:text-greyer dark:print:text-greyer text-tertiary">
          {productName}
        </Text>
      ),
    },
    {
      key: "quantity",
      title: "Qty",
      customNode: (_, { quantity }) => (
        <Text className="dark:text-lighter print:text-greyer dark:print:text-greyer text-tertiary">
          {quantity}
        </Text>
      ),
    },
    {
      key: "rate",
      title: "Rate",
      customNode: (_, { price }) => (
        <div>
          <Text className="dark:text-lighter print:text-greyer dark:print:text-greyer text-tertiary">
            {moneyFormat({
              value: price,
              currency: CURRENCY.DOLLAR,
              delimiter: " ",
            })}
          </Text>
          <Text className="total hidden mt-6 dark:!text-white dark:print:!text-primary">
            Total
          </Text>
        </div>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      customNode: (_, { price, quantity }) => (
        <div>
          <Text className="dark:text-lighter print:text-greyer dark:print:text-greyer text-tertiary">
            {moneyFormat({
              value: price * quantity,
              currency: CURRENCY.DOLLAR,
              delimiter: " ",
            })}
          </Text>
          <Text
            className="total hidden mt-6 flex-col items-end dark:!text-white dark:print:!text-primary"
            data-testid="total-price">
            {moneyFormat({
              value: totalCost,
              currency: CURRENCY.DOLLAR,
            })}
          </Text>
        </div>
      ),
    },
  ];
  return (
    <DataGrid
      data={details}
      columns={columns}
      className="!shadow-none"
      hasPagination={false}
    />
  );
};

export default TableInvoice;
