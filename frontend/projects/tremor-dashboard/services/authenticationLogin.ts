"use server";

// Auth
import { signIn } from "@/config/auth";

import { ROUTES } from "@/constants";

export const authenticationLogin = async (formData: FormData) => {
  await signIn("credentials", {
    ...Object.fromEntries(formData.entries()),
    redirectTo: ROUTES.HOME,
  });
};
