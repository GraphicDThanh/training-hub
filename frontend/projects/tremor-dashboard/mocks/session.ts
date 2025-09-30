import { User } from "@/types";

import * as SessionContext from "@/context/session";

export const mockUseSession = (user: User | null = null) => {
  jest.spyOn(SessionContext, "useSession").mockImplementation(() => ({
    user,
    setUser: () => {},
  }));
};
