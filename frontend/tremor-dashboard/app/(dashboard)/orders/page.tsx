import dynamic from "next/dynamic";
import { Suspense } from "react";

// Components
import { Flex } from "@tremor/react";
import { LoadingIndicator } from "@/components";

const TableOrder = dynamic(
  () => import("@/features/orders/TableOrder/TableOrder"),
);

// Services
import { getOrders } from "@/services";

// Types
import { OrderResponse, TSearchParams } from "@/types";

// Constants
import { DIRECTION, ORDER_LIST_OPTIONS } from "@/constants";

const OrderListPage = async ({
  searchParams,
}: {
  searchParams?: TSearchParams;
}) => {
  const {
    id,
    status,
    page,
    sortBy = "createdAt",
    orderBy = DIRECTION.DESC,
  } = searchParams as TSearchParams;

  const optionByFilter = ORDER_LIST_OPTIONS.find(
    option => option.option?.toLowerCase() === status?.toLowerCase(),
  );

  const response: OrderResponse = await getOrders({
    page,
    status: optionByFilter?.value.toString(),
    query: id,
    sortBy: `${orderBy === DIRECTION.ASC ? "" : "-"}${sortBy}`,
  });

  const { results = [], total } = response;

  return (
    <Flex flexDirection="col" className="gap-4 relative pt-14" as="main">
      <section className="w-full bg-white rounded-lg dark:bg-dark-tremor-primary">
        <Suspense
          fallback={
            <LoadingIndicator
              additionalClass="flex justify-center items-center"
              width={8}
              height={8}
              isFullWidth={false}
              fillColor="river-bed-500"
            />
          }>
          <TableOrder orders={results} total={total} />
        </Suspense>
      </section>
    </Flex>
  );
};

export default OrderListPage;
