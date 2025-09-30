import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";

// Constants
import { ORDER_LIST_OPTIONS } from "@/constants";

// Mocks
import { MOCK_ORDERS, MOCK_COLUMNS } from "@/mocks";

// Components
import DataGrid from "./DataGrid";

// Helpers
import { delay } from "@/helpers";

const mockReplace = jest.fn();

// Mock next
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => {
    const params = new URLSearchParams();
    return { params };
  }),
  usePathname: jest.fn(),
  useRouter: () => ({ replace: mockReplace }),
}));

describe("DataGrid", () => {
  const mockProps = {
    data: MOCK_ORDERS,
    columns: MOCK_COLUMNS,
    pageSize: 2,
    total: MOCK_ORDERS.length,
    filter: {
      field: "status",
      title: "Status",
      listOption: ORDER_LIST_OPTIONS,
    },
    search: {
      field: "id",
      param: "page",
      valueParam: "1",
    },
  };

  let renderResult: RenderResult;
  const dataGridComponent = <DataGrid {...mockProps} />;

  beforeEach(() => {
    renderResult = render(dataGridComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should matches snapshot", async () => {
    jest.spyOn(URLSearchParams.prototype, "get").mockReturnValue("1");

    const { container } = render(
      <DataGrid
        {...mockProps}
        pageSize={undefined}
        filter={undefined}
        search={undefined}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("Calls handlePageChange correctly on next button click", async () => {
    const { container, rerender, getByTestId } = renderResult;

    fireEvent.click(getByTestId("next-page-button"));
    await waitFor(() => {
      rerender(<DataGrid {...mockProps} />);
    });

    expect(container).toMatchSnapshot();
  });

  it("Calls handlePageChange correctly on prev button click", async () => {
    const { container, rerender, getByTestId } = renderResult;

    fireEvent.click(getByTestId("next-page-button"));
    await waitFor(() => {
      rerender(<DataGrid {...mockProps} />);
    });

    fireEvent.click(getByTestId("prev-page-button"));
    await waitFor(() => {
      rerender(dataGridComponent);
    });

    expect(container).toMatchSnapshot();
  });

  it("Calls handlePageChange correctly on page button click", async () => {
    const { container, rerender, getByLabelText } = renderResult;

    fireEvent.click(getByLabelText("Page button 2"));

    await waitFor(() => {
      rerender(<DataGrid {...mockProps} />);
    });

    expect(container).toMatchSnapshot();
  });

  it("calls handleFilterChange correctly on page click filter", async () => {
    const { container, rerender, getByTestId } = renderResult;

    fireEvent.click(getByTestId("toggle-select"));

    waitFor(() => getByTestId("list-option"));

    fireEvent.click(getByTestId("select-item-0"));

    await waitFor(() => {
      rerender(<DataGrid {...mockProps} />);
    });

    expect(container).toMatchSnapshot();
  });

  it("calls handleSortingChange correctly click sort", () => {
    const { getByTestId } = renderResult;

    const dateHeaderElement = getByTestId("header-cell-Date");
    fireEvent.click(dateHeaderElement);

    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining("createdAt"),
    );
  });

  it("calls handleSearchChange correctly when search", async () => {
    const { getByTestId } = renderResult;

    const inputSearchElement = getByTestId("test-input-debounce");
    fireEvent.change(inputSearchElement, { target: { value: "" } });
    await delay(1000);
    fireEvent.change(inputSearchElement, { target: { value: "abc" } });
    await delay(1000);
    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining("id=abc"));
  });
});
