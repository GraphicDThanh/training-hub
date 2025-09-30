"use server";

// Libs
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

// Types
import type {
  User,
  IResponseFromAPI,
  UserAddPayLoad,
  UserResponse,
} from "@/types";

// Constants
import {
  API_ROUTES,
  MESSAGE_USER,
  PAGE_SIZE,
  ROUTER_API_URL,
  ROUTES,
  UID_KEY,
} from "@/constants";

// Helper
import { getErrorMessage } from "@/helpers";
import { updateDataFirestore } from "./firebase";

export const logIn = async (formData: { email: string; password: string }) => {
  let errorMessage;

  try {
    const res = await fetch(`${ROUTER_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { user: null, errorMessage: data.message };
    }

    return { user: data, errorMessage: null };
  } catch (error) {
    errorMessage = error instanceof Error ? `${error.message}` : `${error}`;

    return { user: null, errorMessage };
  }
};

const signUp = async (formData: User) => {
  let errorMessage;

  try {
    const res = await fetch(`${ROUTER_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.status === 400) return { user: null, errorMessage: data.message };

    const { email, id, name } = data;
    await updateDataFirestore({
      data: { email, name },
      entity: "users",
      id,
    });

    return { errorMessage: null };
  } catch (error) {
    errorMessage = error instanceof Error ? `${error.message}` : `${error}`;
    return { errorMessage };
  }
};

const updatePinCode = async (codes: string) => {
  const id = cookies().get(UID_KEY)?.value;

  if (!id) {
    throw new Error(MESSAGE_USER.GET_USER_FAILED);
  }

  const res = await fetch(`${API_ROUTES.USERS}/${id}?requestUserId=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ pinCode: +codes }),
  });

  const { message } = await res.json();

  if (res.ok) {
    return { errorMessage: null };
  }

  return { errorMessage: message };
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${ROUTER_API_URL}/users`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    next: {
      tags: ["users"],
    },
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

export const getUsersPagination = async (params: {
  page: number;
  size?: number;
  query?: string;
  sortBy?: string;
}): Promise<UserResponse> => {
  const { page, query = "", sortBy = "", size = PAGE_SIZE.SIZE } = params;

  const searchParams = new URLSearchParams({
    ...(page !== undefined && {
      size: `${size}`,
      sortBy,
      page: `${page > 1 ? page - 1 : 0}`,
      ...(query && { query }),
    }),
  });

  const res = await fetch(
    `${ROUTER_API_URL}/users?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      next: {
        tags: ["users-pagination"],
      },
    },
  );

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

const getUserById = async (id: number): Promise<User> => {
  const res = await fetch(`${API_ROUTES.USERS}/${id}`, {
    method: "GET",
    cache: "no-store",
    next: {
      tags: [`user ${id}`],
    },
  });

  if (!res.ok) {
    throw new Error(MESSAGE_USER.GET_USER_FAILED);
  }

  return (await res.json()) as User;
};

const getCurrentUser = async (): Promise<User | null> => {
  const id = parseInt(cookies().get(UID_KEY)?.value ?? "");

  if (!id) {
    return null;
  }

  const user = await getUserById(id);
  const { name } = user;
  if (!user || !name) {
    return null;
  }

  return user;
};

const getUserProjects = async (id: number) => {
  const res = await fetch(`${ROUTER_API_URL}/users/${id}/projects`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

const addNewUser = async (newUser: UserAddPayLoad, requestUserId: number) => {
  const response = await fetch(
    `${ROUTER_API_URL}/users?requestUserId=${requestUserId}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(newUser),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      message: result.message,
    };
  }

  revalidatePath(ROUTES.USERS);

  return { message: undefined };
};

/**
 *  The function handler edit information user
 *
 * @param id - the user id
 * @param requestUserId - the admin user id
 * @param dataField - the payload
 * @returns - update information user
 */
const editUser = async <T, Q>(
  id: number,
  requestUserId: number,
  dataField: T,
): Promise<IResponseFromAPI<Q>> => {
  const response = await fetch(
    `${API_ROUTES.USERS}/${id}?requestUserId=${requestUserId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      cache: "no-store",
      body: JSON.stringify(dataField),
    },
  );

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

  revalidateTag("users-pagination");

  return { errorMessages: [], data: result };
};

export {
  getCurrentUser,
  getUserById,
  getUserProjects,
  signUp,
  updatePinCode,
  addNewUser,
  editUser,
};
