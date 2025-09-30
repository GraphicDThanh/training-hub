// Libs
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Auth
import { signOut } from "@/config/auth";

// Constants
import {
  AUTH_SESSION_COOKIES_KEY,
  AVATAR,
  NAME,
  REMEMBER_ME_COOKIES_KEY,
  ROLE,
  UID_KEY,
} from "@/constants";

export async function POST() {
  try {
    cookies().delete(REMEMBER_ME_COOKIES_KEY);
    cookies().delete(UID_KEY);
    cookies().delete(NAME);
    cookies().delete(ROLE);
    cookies().delete(AVATAR);
    cookies().delete(
      (process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_AUTH_SESSION_TOKEN_KEY) ||
        AUTH_SESSION_COOKIES_KEY,
    );

    await signOut({ redirect: false });

    return NextResponse.json({ data: true });
  } catch (error) {
    return NextResponse.error();
  }
}
