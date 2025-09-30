import { render } from "@testing-library/react";

// Mocks
import { MOCK_ORDERS, MOCK_COLUMNS } from "@/mocks";

// Components
import DataGridBody from "./DataGridBody";

// Constants
import { RESULT_NOT_FOUND } from "@/constants";

describe("DataGridBody", () => {
  const mockProps = {
    data: MOCK_ORDERS,
    columns: MOCK_COLUMNS,
  };

  const mockEmptyDataProps = {
    data: [],
    columns: MOCK_COLUMNS,
  };

  it("Should matches snapshot", async () => {
    const { container } = render(
      <table>
        <DataGridBody {...mockProps} />
      </table>,
    );

    expect(container).toMatchSnapshot();
  });

  it("Should check render with data empty", async () => {
    const { getByText } = render(
      <table>
        <DataGridBody {...mockEmptyDataProps} />
      </table>,
    );

    expect(getByText(RESULT_NOT_FOUND)).toBeTruthy();
  });
});
