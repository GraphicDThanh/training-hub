"use client";

import { MESSAGE_SIGN_OUT, PIN_CODE_SKIP_SET_KEY } from "@/constants";
import { getErrorMessage } from "@/helpers";

export const authenticationLogout = async () => {
  const res = await fetch(`/api/logout`, { method: "POST" });

  if (!res.ok) {
    throw new Error(getErrorMessage(res.status, res.statusText));
  }

  const { data } = await res.json();

  // Will throw error when failed signOut
  if (!data) {
    throw new Error(MESSAGE_SIGN_OUT.FAILED);
  }

  localStorage.removeItem(PIN_CODE_SKIP_SET_KEY);
};
