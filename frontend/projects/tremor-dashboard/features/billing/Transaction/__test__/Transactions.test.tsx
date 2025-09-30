// Libs
import { render } from "@testing-library/react";
import { revalidateTag } from "next/cache";

// Components
import Transactions, { handleRefetchTransactionList } from "../Transactions";

// Mocks
import { MOCK_TRANSACTIONS, MOCK_USERS } from "@/mocks";

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
}));

const mockJson = jest.fn().mockReturnValue(Promise.resolve(MOCK_USERS));
const mockFetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: mockJson,
    ok: true,
  }),
);

global.fetch = mockFetch;

describe("Transactions Component Testing", () => {
  it("should match snapshot", async () => {
    const { container } = render(
      <Transactions
        transactions={MOCK_TRANSACTIONS}
        users={MOCK_USERS}
        userId={MOCK_USERS[0].id}
        date="23 - 30 March 2020"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("Calls refetch transaction list", async () => {
    const revalidateTagMock = revalidateTag as jest.MockedFunction<
      typeof revalidateTag
    >;

    await handleRefetchTransactionList();

    expect(revalidateTagMock).toHaveBeenCalledWith("transactions");
  });
});
