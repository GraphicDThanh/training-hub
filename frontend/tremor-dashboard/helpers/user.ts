"use server";

import { cookies } from "next/headers";

// Constants
import { AVATAR, NAME, ROLE, UID_KEY } from "@/constants";

export const getUserFromCookies = (): {
  id: number;
  role: number;
  name: string;
  avatar: string;
} => {
  return {
    id: Number(cookies().get(UID_KEY)?.value),
    role: Number(cookies().get(ROLE)?.value),
    name: cookies().get(NAME)?.value ?? "",
    avatar: cookies().get(AVATAR)?.value ?? "",
  };
};
