import { RenderResult, fireEvent, render } from "@testing-library/react";

// Types
import { ColumnType, Product } from "@/types";

// Components
import DataGridHeader from "./DataGridHeader";

const mockColumns: ColumnType<Product>[] = [
  {
    key: "id",
    title: "Id",
    isSortable: true,
  },
  {
    key: "productName",
    title: "Product",
    isSortable: true,
  },
];

const mockOnSort = jest.fn();

describe("DataGridHeader component", () => {
  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(
      <table>
        <DataGridHeader columns={mockColumns} onSort={mockOnSort} />
      </table>,
    );
  });

  it("Should matches snapshot", () => {
    const { container } = renderedComponent;
    // Take a snapshot of the rendered component
    expect(container).toMatchSnapshot();
  });

  it("Should be call handleSorting function when isSortable column header is clicked", () => {
    const { getByText } = renderedComponent;
    // Click on a isSortable column header
    fireEvent.click(getByText(mockColumns[0].title));

    // Click on a isSortable column header again
    fireEvent.click(getByText(mockColumns[0].title));

    // Click on a isSortable column header again
    fireEvent.click(getByText(mockColumns[0].title));

    expect(mockOnSort).toHaveBeenNthCalledWith(3, "id");

    // Click on a non-isSortable column header
    fireEvent.click(getByText(mockColumns[1].title));

    expect(mockOnSort).toHaveBeenNthCalledWith(4, "productName");
  });
});
