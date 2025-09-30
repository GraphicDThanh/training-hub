// Libs
import { render } from "@testing-library/react";
import React from "react";

// Contexts
import { useSession, SessionProvider } from "@/context/session";

// Types
import { USER_ROLE } from "@/types";

// Constants
import { ADMIN_ID } from "@/constants";

// Mocks
import { MOCK_USERS } from "@/mocks";

const mockAdminUser = {
  ...MOCK_USERS[0],
  user: {
    id: ADMIN_ID,
    name: "Admin",
    pinCode: "118791",
    role: USER_ROLE.ADMIN,
    gender: 0,
  },
};

const ChildSetWithUser = () => {
  const { user: currentUser } = useSession();
  const { name } = currentUser;

  return <span>{name}</span>;
};

const ChildSetNoneUser = () => {
  const { user: currentUser } = useSession();

  return <span>{currentUser?.name}</span>;
};

describe("Test Session Context", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setupRenderWithUser = () => {
    return render(
      <SessionProvider session={mockAdminUser}>
        <ChildSetWithUser />
      </SessionProvider>,
    );
  };

  const setupRenderNoneUser = () => {
    return render(
      <SessionProvider session={MOCK_USERS[1]}>
        <ChildSetNoneUser />
      </SessionProvider>,
    );
  };

  it("Should match snapshot in case set session none user", async () => {
    const { container } = setupRenderNoneUser();
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot in case set session with user", async () => {
    const { container } = setupRenderWithUser();
    expect(container).toMatchSnapshot();
  });

  it("Should throw error in case context is undefined", async () => {
    jest.spyOn(React, "useContext").mockImplementation(() => {
      undefined;
    });
    jest.spyOn(console, "error").mockImplementation(() => null);

    expect(() => setupRenderWithUser()).toThrow();
  });
});
