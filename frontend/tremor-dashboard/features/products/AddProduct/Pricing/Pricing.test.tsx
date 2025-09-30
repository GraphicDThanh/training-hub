import {
  fireEvent,
  render,
  queryAllByAttribute,
  waitFor,
} from "@testing-library/react";
import { useForm } from "react-hook-form";

// Components
import Pricing from "./Pricing";

//Types
import { NewPricing } from "@/types";

// Constants
import { MESSAGES_ERROR, EXCEPT_KEYS } from "@/constants";

// Mocks
import { mockProductInfo } from "@/mocks";

interface PricingFormProps {
  price: number;
  sku: string;
  tags: number[];
}

const PricingForm = ({ price = 0, tags = [0, 1], sku }: PricingFormProps) => {
  const { control } = useForm<NewPricing>({
    defaultValues: {
      price,
      tags,
      sku,
    },
    mode: "onBlur",
  });

  return <Pricing control={control} />;
};

describe("Testing Pricing component", () => {
  const renderComponent = () => {
    return render(<PricingForm {...mockProductInfo} />);
  };

  it("should match snapshot", () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it("should not show error messages for valid price", () => {
    const validPrice = 123;
    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("add-price");

    fireEvent.change(inputPrice, { target: { value: validPrice } });
    fireEvent.blur(inputPrice);
    expect(inputPrice.value).toEqual("123");
    expect(queryByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeNull();
  });

  it("Should show error messages for limit price", async () => {
    const limitPrice = 22222;

    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("add-price");

    fireEvent.change(inputPrice, { target: { value: limitPrice } });
    fireEvent.blur(inputPrice);
    expect(inputPrice.value).toEqual("22,222");
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.PRODUCT.PRICE_LIMIT)).toBeTruthy(),
    );
  });

  it("Should show error messages for empty price", async () => {
    const emptyPrice = "";

    const { queryByText, getByTestId } = renderComponent();
    const inputPrice = getByTestId("add-price");

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
    const inputSku = getByTestId("add-sku");

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
    const inputSku = getByTestId("add-sku");

    fireEvent.change(inputSku, { target: { value: invalidSKU } });
    fireEvent.blur(inputSku);
    expect(inputSku.value).toEqual("invalid");

    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.SKU_INVALID)).toBeTruthy(),
    );
  });

  it(`price input should not contain key in EXCEPT_KEYS if input price with these key ["e", "E", "+", "-"]`, async () => {
    const mockEvent = {
      key: EXCEPT_KEYS.POSITIVE_DOUBLE[3],
    };
    const getById = queryAllByAttribute.bind(null, "id");
    const { container } = renderComponent();
    const priceInput = getById(container, "add-product-price");

    fireEvent.keyDown(priceInput[0], mockEvent); // Invalid input
    expect(priceInput[0].value).not.toContain(EXCEPT_KEYS.POSITIVE_DOUBLE[3]);
  });

  it(`sku input should not contain key in EXCEPT_KEYS if input sku with these key ["e", "E", "+", "-", "."]`, async () => {
    const mockEvent = {
      key: EXCEPT_KEYS.POSITIVE_INTEGER[3],
    };
    const getById = queryAllByAttribute.bind(null, "id");
    const { container } = renderComponent();
    const priceInput = getById(container, "add-product-sku");

    fireEvent.keyDown(priceInput[0], mockEvent); // Invalid input
    expect(priceInput[0].value).not.toContain(EXCEPT_KEYS.POSITIVE_DOUBLE[3]);
  });
});
