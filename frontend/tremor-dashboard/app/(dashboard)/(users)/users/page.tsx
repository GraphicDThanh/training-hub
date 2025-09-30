import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Components
import { Flex } from "@tremor/react";
import { LoadingIndicator, NoPermissionContent } from "@/components";

// Types
import { TSearchParams, USER_ROLE } from "@/types";

//Constants
import { DIRECTION, ROUTES } from "@/constants";

// Services
import { getUsersPagination } from "@/services";

// Helpers
import { getUserFromCookies } from "@/helpers";

const TableUser = dynamic(() => import("@/features/users/TableUser/TableUser"));

export const metadata = {
  title: "Users - Tremor Dashboard",
};

const Users = async ({ searchParams }: { searchParams?: TSearchParams }) => {
  const userCookie = await getUserFromCookies();

  const {
    query,
    page = 1,
    sortBy = "createdAt",
    orderBy = DIRECTION.DESC,
  } = searchParams as TSearchParams;

  const response = await getUsersPagination({
    page,
    query,
    sortBy: `${orderBy === DIRECTION.ASC ? "" : "-"}${sortBy}`,
  });

  const { results, total } = response;

  if (userCookie.role !== USER_ROLE.ADMIN) {
    return <NoPermissionContent />;
  }

  return (
    <Flex flexDirection="col" className="gap-4 relative">
      <Flex>
        <Link
          href={ROUTES.NEW_USER}
          className="uppercase text-xs font-bold text-white py-3 px-5 bg-gradient-primary dark:bg-gradient-pickled border-none dark:text-white rounded-lg shadow-btn-primary hover:shadow-btn-primary-hover tracking-wide">
          new user
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
          <TableUser users={results} total={total} />
        </Suspense>
      </section>
    </Flex>
  );
};

export default Users;
