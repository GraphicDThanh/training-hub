import { render } from "@testing-library/react";

// Mocks
import { MOCK_TRANSACTIONS, MOCK_USERS } from "@/mocks";

// Components
import TransactionDetail from "./TransactionDetail";

describe("TransactionDetail", () => {
  it("match snapshot", () => {
    const { container } = render(
      <TransactionDetail
        transactions={[]}
        users={MOCK_USERS}
        userId={MOCK_USERS[0].id}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("renders transaction date is correct", () => {
    const { getByTestId } = render(
      <TransactionDetail
        transactions={MOCK_TRANSACTIONS}
        users={MOCK_USERS}
        userId={MOCK_USERS[0].id}
      />,
    );

    expect(getByTestId("date").lastChild?.textContent).toBe("Feb 2024");
  });
});
