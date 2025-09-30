// Constants
import { API_ROUTES } from "@/constants";

// Utils
import { getUrlWithParam } from "@/helpers";

// Helpers
import { getErrorMessage } from "@/helpers";

export const getTransactionsByUserId = async (id: number) => {
  const res = await fetch(
    getUrlWithParam(API_ROUTES.TRANSACTION, {
      userId: id,
      sortBy: "-createdAt",
    }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      next: {
        // Re-validate every hour
        revalidate: 3600,
        tags: ["transactions"],
      },
    },
  );

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

export const addNewTransaction = async <T, Q>(
  dataField: T,
): Promise<Q | string> => {
  const response: Response = await fetch(
    getUrlWithParam(API_ROUTES.TRANSACTION),
    {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(dataField),
    },
  );

  const result: Q | Record<string, string> = await response.json();

  if (!response.ok) {
    const { message } = result || {};

    return message;
  }

  return result as Q;
};
