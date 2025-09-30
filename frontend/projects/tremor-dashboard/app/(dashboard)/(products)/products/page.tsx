import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Flex } from "@tremor/react";

// Components
import { LoadingIndicator } from "@/components";

const TableProduct = dynamic(
  () => import("@/features/products/TableProduct/TableProduct"),
);

// Services
import { getProducts } from "@/services";

// Types
import { TSearchParams } from "@/types";

// Constants
import { ROUTES, PRODUCT_LIST_OPTIONS, DIRECTION } from "@/constants";

const ProductListPage = async ({
  searchParams,
}: {
  searchParams?: TSearchParams;
}) => {
  const {
    query,
    isAvailable,
    page,
    sortBy = "createdAt",
    orderBy = DIRECTION.DESC,
  } = searchParams as TSearchParams;

  const optionByFilter = PRODUCT_LIST_OPTIONS.find(
    option => option.option?.toLowerCase() === isAvailable?.toLowerCase(),
  );

  const response = await getProducts({
    page,
    available: optionByFilter?.value.toString(),
    query,
    sortBy: `${orderBy === DIRECTION.ASC ? "" : "-"}${sortBy}`,
  });

  const { results, total } = response;

  return (
    <Flex flexDirection="col" className="gap-4 relative" as="main">
      <Flex>
        <Link
          href={ROUTES.NEW_PRODUCT}
          className="uppercase text-xs font-bold text-white py-3 px-5 bg-gradient-primary dark:bg-gradient-pickled border-none dark:text-white rounded-lg shadow-btn-primary hover:shadow-btn-primary-hover tracking-wide">
          new product
        </Link>
      </Flex>
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
          <TableProduct products={results} total={total} />
        </Suspense>
      </section>
    </Flex>
  );
};

export default ProductListPage;
