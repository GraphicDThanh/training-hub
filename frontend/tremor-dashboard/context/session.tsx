"use client";

import { User } from "@/types";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

export interface Session {
  user: User | null;
}

interface ISessionContext extends Session {
  setUser: (user: User) => void;
}

const initialSession: ISessionContext = { user: null, setUser: () => {} };

const SessionContext = createContext<ISessionContext>(initialSession);

export const SessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  const [user, setUser] = useState<User | null>(session?.user ?? null);

  const values = useMemo(() => ({ user, setUser }), [user]);

  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession hooks should using inside SessionProvider!");
  }

  return context;
};
