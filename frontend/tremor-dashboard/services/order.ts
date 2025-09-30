"use server";

import { revalidateTag } from "next/cache";

// Constants
import { PAGE_SIZE, ROUTER_API_URL, ROUTES } from "@/constants";

// Helpers
import { getErrorMessage } from "@/helpers";

export const getOrders = async ({
  page,
  status = "",
  query = "",
  sortBy = "",
}: {
  page?: number;
  status?: string;
  query?: string;
  sortBy?: string;
  orderBy?: string;
}) => {
  const params = new URLSearchParams({
    page: `${page ? page - 1 : 0}`,
    size: `${PAGE_SIZE.SIZE}`,
    status: status,
    query: query,
    sortBy,
  });

  const res = await fetch(`${ROUTER_API_URL}/orders?${params.toString()}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    next: {
      revalidate: 60,
      tags: [ROUTES.ORDERS],
    },
  });

  return res.json();
};

export const getOrderDetails = async (id: number) => {
  const res = await fetch(`${ROUTER_API_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    next: {
      // Re-validate every minute
      revalidate: 60,
    },
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  revalidateTag(ROUTES.PRODUCTS);
  return res.json();
};
