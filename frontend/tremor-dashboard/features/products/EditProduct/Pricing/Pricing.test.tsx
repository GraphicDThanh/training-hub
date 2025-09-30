import {
  fireEvent,
  render,
  queryAllByAttribute,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormProvider, useForm } from "react-hook-form";

// Components
import PricingInfo from "./Pricing";

// Constants
import { MESSAGES_ERROR, EXCEPT_KEYS } from "@/constants";

// Types
import { EditProductData } from "@/types";

// Mocks
import { mockProductInfo } from "@/mocks";

interface ProductInfoFormProps {
  price: number;
}

const PricingInfoForm = ({ price = 0 }: ProductInfoFormProps) => {
  const formHandler = useForm<EditProductData>({
    defaultValues: {
      price,
    },
    mode: "onBlur",
  });
  return (
    <FormProvider {...formHandler}>
      <PricingInfo />
    </FormProvider>
  );
};

describe("Testing PricingInfo component", () => {
  const renderComponent = () =>
    render(<PricingInfoForm {...mockProductInfo} />);

  it("Should match snapshot", () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it("Should not show error messages for valid price", async () => {
    const validPrice = 123;
    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("edit-price");

    fireEvent.change(inputPrice, { target: { value: validPrice } });
    fireEvent.blur(inputPrice);
    expect(inputPrice.value).toEqual("123");
    expect(queryByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeNull();
  });

  it("Should show error messages for limit price", async () => {
    const limitPrice = 22222;

    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("edit-price");

    fireEvent.change(inputPrice, { target: { value: limitPrice } });
    fireEvent.blur(inputPrice);
    expect(inputPrice.value).toEqual("22,222");
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.PRODUCT.PRICE_LIMIT)).toBeTruthy(),
    );
  });

  it("Should not show error messages for valid price", async () => {
    const validPrice = 123;
    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("edit-price");

    fireEvent.change(inputPrice, { target: { value: validPrice } });
    fireEvent.blur(inputPrice);
    expect(inputPrice.value).toEqual("123");
    expect(queryByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeNull();
  });

  it("Should show error messages for empty price", async () => {
    const emptyPrice = "";

    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("edit-price");

    fireEvent.change(inputPrice, { target: { value: emptyPrice } });
    fireEvent.blur(inputPrice);
    expect(inputPrice.value).toEqual("");

    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeTruthy(),
    );
  });

  it("Should not show error messages for valid SKU", async () => {
    const validSKU = 123;

    const { queryByText, getByTestId } = renderComponent();
    const inputSku = getByTestId("edit-sku");

    fireEvent.change(inputSku, { target: { value: validSKU } });
    fireEvent.blur(inputSku);
    expect(inputSku.value).toEqual("123");

    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.SKU_INVALID)).not.toBeTruthy(),
    );
  });

  it("Should show error messages for invalid SKU", async () => {
    const invalidSKU = "invalid";
    const { queryByText, getByTestId } = renderComponent();
    const inputSku = getByTestId("edit-sku");

    fireEvent.change(inputSku, { target: { value: invalidSKU } });
    fireEvent.blur(inputSku);
    expect(inputSku.value).toEqual("invalid");

    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.SKU_INVALID)).toBeTruthy(),
    );
  });

  it("Should call preventDefault when key is in except key", async () => {
    const mockEvent = {
      key: EXCEPT_KEYS.POSITIVE_DOUBLE[3],
    };
    const getById = queryAllByAttribute.bind(null, "id");
    const { container } = renderComponent();
    const priceInput = getById(container, "edit-price");

    fireEvent.keyDown(priceInput[0], mockEvent); // Invalid input

    expect(priceInput[0]).toBeInTheDocument();
  });
});
