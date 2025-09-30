import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SelectOption, { SelectOptionProps } from "./SelectOption";

const mockData = [
  { option: "Option 1", value: "value1" },
  { option: "Option 2", value: "value2" },
];

const propsDefault: SelectOptionProps = {
  title: "Test Title",
  data: mockData,
  onSelectItem: jest.fn(),
  onSelectRemove: jest.fn(),
  value: mockData[0],
};

const renderSelectOption = (override: Partial<SelectOptionProps> = {}) => {
  return render(
    <>
      <div id="outside-element"></div>
      <SelectOption {...propsDefault} {...override} />
    </>,
  );
};

describe("SelectOption", () => {
  it("Should render SelectOption snapshot correctly", () => {
    const { container } = renderSelectOption();
    expect(container).toMatchSnapshot();
  });

  it("calls onSelectItem when an option is clicked", async () => {
    const { getByTestId } = renderSelectOption();

    await waitFor(() => {
      fireEvent.click(getByTestId("toggle-select"));
    });

    const optionButton = getByTestId("select-item-1");
    fireEvent.click(optionButton);

    expect(propsDefault.onSelectItem).toHaveBeenCalled();
  });

  it("calls onSelectRemove when remove filter button is clicked", async () => {
    const { getByTestId } = renderSelectOption({
      value: { option: "Yes", value: "true" },
    });

    await waitFor(() => {
      fireEvent.click(getByTestId("toggle-select"));
    });

    const removeButton = getByTestId("remove-filter");
    fireEvent.click(removeButton);
    expect(propsDefault.onSelectRemove).toHaveBeenCalled();
  });

  it("should handle clicked outside", async () => {
    const { container, getByTestId } = renderSelectOption();

    fireEvent.click(getByTestId("toggle-select"));
    fireEvent.mouseDown(document);

    expect(container).toMatchSnapshot();
  });

  it("render empty select option is Filters", async () => {
    const { container } = renderSelectOption({
      value: undefined,
    });

    expect(container).toMatchSnapshot();
  });
});
