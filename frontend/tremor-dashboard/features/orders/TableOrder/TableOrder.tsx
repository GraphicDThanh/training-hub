"use client";

import { memo } from "react";

// Components
import {
  IdentifyField,
  CustomList,
  CustomNumberFormat,
  CustomStatus,
  CustomQuantity,
  DataGrid,
  CustomAvatarName,
} from "@/components";

const CustomDateFormat = dynamic(
  () =>
    import("@/components").then(({ CustomDateFormat }) => ({
      default: CustomDateFormat,
    })),
  { ssr: false },
);

//Types
import { ColumnType, Order } from "@/types";

// Constants
import { ROUTES, ORDER_LIST_OPTIONS } from "@/constants";
import dynamic from "next/dynamic";

interface TableOrderProps {
  orders: Order[];
  total: number;
}

// Table Columns
const columns: ColumnType<Order>[] = [
  {
    key: "id",
    title: "Id",
    customNode: (_, { id }) => (
      <IdentifyField id={id} link={`${ROUTES.ORDERS}/${id}`} />
    ),
  },
  {
    key: "createdAt",
    title: "Date",
    customNode: (_, { createdAt }) => <CustomDateFormat date={createdAt} />,
    isSortable: true,
  },
  {
    key: "status",
    title: "Status",
    customNode: (_, { status }) => <CustomStatus status={status} />,
    isSortable: true,
  },
  {
    key: "customerName",
    title: "Customer",
    customNode: (_, { customer }) => {
      return (
        <CustomAvatarName avatar={customer.avatar} text={customer.fullName} />
      );
    },
  },
  {
    key: "productName",
    title: "Products",
    customNode: (_, { products }) => (
      <CustomList products={products} className="min-w-[100px] text-wrap line-clamp-1" />
    ),
  },
  {
    key: "count",
    title: "quantity",
    customNode: (_, { products }) => <CustomQuantity products={products} />,
  },
  {
    key: "revenue",
    title: "Revenue",
    customNode: (_, { revenue }) => (
      <CustomNumberFormat value={revenue} className="w-[80px]" />
    ),
    isSortable: true,
  },
];

const TableOrder = ({ orders, total }: TableOrderProps) => (
  <DataGrid
    data={orders}
    columns={columns as unknown as ColumnType<Order>[]}
    total={total}
    hasPagination={!!orders.length}
    filter={{
      field: "status",
      title: "Status",
      listOption: ORDER_LIST_OPTIONS,
    }}
    search={{
      field: "id",
      param: "page",
      valueParam: "1",
      placeholder: "Search by ID",
    }}
  />
);

export default memo(TableOrder);
