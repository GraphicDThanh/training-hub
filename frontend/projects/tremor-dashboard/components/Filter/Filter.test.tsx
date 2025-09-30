import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";

// Constants
import { ORDER_LIST_OPTIONS } from "@/constants";

// Components
import Filter from "./Filter";

describe("Testing Filter component", () => {
  const mockOnFilterChange = jest.fn();

  const renderComponent = () =>
    render(
      <Filter
        field="isAvailable"
        title="Is Available"
        listOption={ORDER_LIST_OPTIONS}
        onFilterChange={mockOnFilterChange}
      />,
    );
  it("Match Snapshot", () => {
    const { container, getByTestId } = renderComponent();

    fireEvent.click(getByTestId("toggle-select"));

    expect(container).toMatchSnapshot();
  });

  it("Calls filter select", async () => {
    const { getByTestId } = renderComponent();

    fireEvent.click(getByTestId("toggle-select"));

    // Await the list-option appears
    waitFor(() => getByTestId("list-option"));

    fireEvent.click(getByTestId("select-item-0"));

    await waitFor(() => expect(mockOnFilterChange).toHaveBeenCalled());
  });

  it("Calls remove value select", async () => {
    const { getByTestId } = render(
      <Filter
        field="isAvailable"
        title="Is Available"
        listOption={ORDER_LIST_OPTIONS}
        onFilterChange={mockOnFilterChange}
        value={ORDER_LIST_OPTIONS[0].option}
      />,
    );

    fireEvent.click(getByTestId("toggle-select"));

    // Await the remove button appears
    await waitFor(() => getByTestId("remove-filter"));

    fireEvent.click(getByTestId("remove-filter"));

    await waitFor(() => expect(mockOnFilterChange).toHaveBeenCalled());
  });
});
