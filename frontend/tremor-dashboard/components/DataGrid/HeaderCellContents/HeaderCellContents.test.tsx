import { render } from "@testing-library/react";

// Components
import HeaderCellContents from "./HeaderCellContents";

describe("HeaderCellContents component", () => {
  const propsHaveSortHeaderCell = {
    title: "Product",
    keyColumn: "id",
    sortField: "id",
    sortType: "",
    isSortable: true,
  };

  it("should render snapshot correctly", () => {
    const { container } = render(
      <HeaderCellContents {...propsHaveSortHeaderCell} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should have Sort button if isSortable is true", () => {
    const { getByLabelText } = render(
      <HeaderCellContents {...propsHaveSortHeaderCell} />,
    );

    expect(getByLabelText("Arrow Drop Up")).toBeTruthy();
    expect(getByLabelText("Arrow Drop Down")).toBeTruthy();
  });

  it("should not have Sort button if isSortable is false", () => {
    const propsIncreaseTypeHeaderCell = {
      title: "Product",
      keyColumn: "id",
      sortField: "id",
      sortType: "",
      isSortable: false,
    };

    const { queryByLabelText } = render(
      <HeaderCellContents {...propsIncreaseTypeHeaderCell} />,
    );

    expect(queryByLabelText("Arrow Drop Up")).toBeFalsy();
    expect(queryByLabelText("Arrow Drop Down")).toBeFalsy();
  });
});
