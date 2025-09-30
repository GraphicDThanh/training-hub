// Libs
import NextAuth from "next-auth";
import { z } from "zod";
import { cookies } from "next/headers";

// "Credentials" next-provider: User login by "email" & "password"
import CredentialsProvider from "next-auth/providers/credentials";

// Configs
import { authConfig } from "./auth.config";

import { AVATAR, NAME, ROLE, UID_KEY } from "@/constants";

const setCookie = (
  name: string,
  value: string,
  httpOnly: boolean,
  path: string,
) => {
  cookies().set({
    name,
    value,
    httpOnly,
    path,
  });
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        const user = await req.json();

        cookies().set({
          name: "remember-me",
          value: user.remember,
          httpOnly: true,
          path: "/",
        });

        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(8) })
            .safeParse(credentials);

          if (user && parsedCredentials.success) {
            const { id, role, name, avatar } = user;

            setCookie(UID_KEY, id.toString(), true, "/");
            setCookie(ROLE, role.toString(), true, "/");
            setCookie(NAME, name, true, "/");
            setCookie(AVATAR, avatar, true, "/");

            return user;
          }

          return null;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
});
