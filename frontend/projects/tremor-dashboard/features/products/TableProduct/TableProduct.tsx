"use client";

import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";

// Components
import {
  IdentifyField,
  CustomDateFormat,
  CustomNumberFormat,
  CustomAvatarName,
  DataGrid,
} from "@/components";

import { Text } from "@tremor/react";

// Types
import { Product, ColumnType } from "@/types";

// Constants
import { ROUTES, PRODUCT_LIST_OPTIONS } from "@/constants";

interface TableProductProps {
  products: Product[];
  total: number;
}

const TableProduct = ({ products, total }: TableProductProps) => {
  // Product Table Props
  const columns: ColumnType<Product>[] = useMemo(
    () => [
      {
        key: "id",
        title: "Id",
        customNode: (_, { id }) => (
          <IdentifyField id={id} link={`${ROUTES.PRODUCTS}/${id}`} />
        ),
      },
      {
        key: "productName",
        title: "Product",
        customNode: (_, { productName, image }) => {
          return (
            <CustomAvatarName avatar={image} text={productName} enableMagnify />
          );
        },

        isSortable: true,
      },
      {
        key: "price",
        title: "Price",
        customNode: (_, { price }) => <CustomNumberFormat value={price} />,
        isSortable: true,
      },
      {
        key: "quantity",
        title: "Is Available",
        customNode: (_, { quantity }) => (
          <Text className="text-xs text-tertiary dark:text-lighter font-semibold">
            {quantity && quantity > 0 ? "Yes" : "No"}
          </Text>
        ),
        isSortable: true,
      },
      {
        key: "providerName",
        title: "Provider Name",
        customNode: (_, { providerName }) => (
          <Text className="text-xs text-tertiary dark:text-lighter font-semibold w-[180px] truncate">
            {providerName}
          </Text>
        ),
        isSortable: true,
      },
      {
        key: "createdAt",
        title: "Created Date",
        customNode: (_, { createdAt }) => (
          <CustomDateFormat date={createdAt ?? ""} />
        ),
        isSortable: true,
      },
    ],
    [],
  );

  return (
    <DataGrid
      data={products}
      columns={columns}
      total={total}
      filter={{
        field: "isAvailable",
        title: "Is Available",
        listOption: PRODUCT_LIST_OPTIONS,
      }}
      search={{
        field: "query",
        param: "page",
        valueParam: "1",
        placeholder: "Search by product name",
      }}
    />
  );
};

export default memo(TableProduct, isEqual);
