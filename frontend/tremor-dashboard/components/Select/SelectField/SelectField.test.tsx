import { render, queryAllByAttribute, fireEvent } from "@testing-library/react";

// Constants
import { PRICE_TYPE } from "@/constants";

// Components
import { SelectField } from "@/components";

describe("SelectField Component", () => {
  it("Should match snapshot", () => {
    const component = render(
      <SelectField label="Currency" options={PRICE_TYPE} />,
    );
    expect(component).toMatchSnapshot();
  });

  it("renders correct number of options", () => {
    const getById = queryAllByAttribute.bind(null, "id");

    const { container } = render(
      <SelectField options={PRICE_TYPE} name="currency" />,
    );
    const selectElement = getById(container, "currency");
    expect(selectElement[0]?.children).toHaveLength(7);
  });

  it("renders correct name of options", () => {
    const { getAllByText } = render(
      <SelectField label="Currency" options={PRICE_TYPE} value="4" />,
    );
    expect(getAllByText("GBP")).toBeTruthy();
  });

  it("should call onChange handler with selected value", async () => {
    const onChangeMock = jest.fn(); // Mock the onChange handler

    const { getAllByText } = render(
      <SelectField
        label="Test Select"
        options={PRICE_TYPE}
        onChange={onChangeMock}
        name="testSelect"
      />,
    );

    fireEvent.click(getAllByText("Select...")[1]);
    fireEvent.click(getAllByText(PRICE_TYPE[2].option)[1]);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(PRICE_TYPE[2].value);
  });
});
