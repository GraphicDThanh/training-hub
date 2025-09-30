"use server";

import { revalidatePath } from "next/cache";

// Constants
import { PAGE_SIZE, ROUTER_API_URL, ROUTES } from "@/constants";

// Helpers
import { getErrorMessage } from "@/helpers";

// Types
import { ProductData, ProductResponse } from "@/types";

export const getProducts = async ({
  page = 0,
  available = "",
  query = "",
  sortBy = "",
  size = PAGE_SIZE.SIZE,
}: {
  page?: number;
  size?: number;
  available?: string;
  query?: string;
  sortBy?: string;
}): Promise<ProductResponse> => {
  const params = new URLSearchParams({
    sortBy,
    size: `${size}`,
    isAvailable: available,
    page: `${page > 1 ? page - 1 : 0}`,
    ...(query && { query }),
  });

  const res = await fetch(`${ROUTER_API_URL}/products?${params.toString()}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    next: {
      tags: [ROUTES.PRODUCTS],
    },
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

export const getProduct = async (id: number) => {
  const res = await fetch(`${ROUTER_API_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

export const editProduct = async (id: number, formData: ProductData) => {
  const response = await fetch(`${ROUTER_API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok) {
    const errors = result.errors ?? [];

    const errorMessages: Array<Record<string, string>> = errors?.map(
      (error: Record<string, string>) => error,
    );

    return {
      errorMessages: errorMessages,
      data: null,
    };
  }

  revalidatePath(ROUTES.PRODUCTS);

  return { errorMessages: [], data: result };
};

export const addNewProduct = async (newProduct: ProductData) => {
  const response = await fetch(`${ROUTER_API_URL}/products`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(newProduct),
  });

  const result = await response.json();

  if (!response.ok)
    return {
      message: result.message,
    };

  revalidatePath(ROUTES.PRODUCTS);

  return { message: undefined };
};
