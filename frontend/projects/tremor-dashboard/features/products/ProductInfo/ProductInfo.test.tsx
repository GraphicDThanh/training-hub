import {
  render,
  fireEvent,
  createEvent,
  waitFor,
  queryAllByAttribute,
} from "@testing-library/react";
import { useForm } from "react-hook-form";

// Components
import ProductInfo from "./ProductInfo";

// Constants
import { MESSAGES_ERROR, MESSAGES_WARNING, EXCEPT_KEYS } from "@/constants";

// Types
import { ProductBasicInfo } from "@/types";

// Mocks
import { mockProductInfo } from "@/mocks";

interface ProductInfoFormProps {
  productName: string;
  description: string;
  providerName: string;
  weight: number;
  category: number;
  quantity: number;
  onSubmit: (data: ProductBasicInfo) => void;
}

const ProductInfoForm = ({
  productName,
  description,
  providerName,
  weight,
  category,
  quantity,
}: ProductInfoFormProps) => {
  const {
    control,
    formState: { errors },
  } = useForm<ProductBasicInfo>({
    defaultValues: {
      productName,
      description,
      providerName,
      weight,
      category,
      quantity,
    },
    mode: "onBlur",
  });

  return <ProductInfo control={control} errors={errors} />;
};

describe("ProductInfo component", () => {
  const renderComponent = () =>
    render(<ProductInfoForm {...mockProductInfo} />);

  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should not show error messages if have value name product", async () => {
    const { getByTestId, queryByText, getByLabelText } = renderComponent();
    const inputProductName = getByTestId("add-product-name");

    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Product A" },
    });
    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      "Product A",
    );

    fireEvent.blur(inputProductName);

    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeFalsy(),
    );
  });

  it("should show error messages required when empty product Name", async () => {
    const { getByTestId, getByText, getByLabelText } = renderComponent();
    const inputProductName = getByTestId("add-product-name");

    fireEvent.change(getByLabelText("Name"), { target: { value: "" } });
    expect((getByLabelText("Name") as HTMLInputElement).value).toBe("");

    fireEvent.blur(inputProductName);

    await waitFor(() =>
      expect(getByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeTruthy(),
    );
  });

  it("should show error messages when empty weight", async () => {
    const { getByTestId, getByText, getByLabelText } = renderComponent();
    const inputProductWeight = getByTestId("add-product-weight");

    fireEvent.change(getByLabelText("Weight"), { target: { value: "" } });
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("");

    fireEvent.blur(inputProductWeight);

    await waitFor(() =>
      expect(getByText(MESSAGES_WARNING.PRODUCT.WEIGHT_IS_ZERO)).toBeTruthy(),
    );
  });

  it("should show error messages when weight is 0", async () => {
    const { getByTestId, getByText, getByLabelText } = renderComponent();
    const inputProductWeight = getByTestId("add-product-weight");

    fireEvent.change(getByLabelText("Weight"), { target: { value: "0" } });
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("0");

    fireEvent.blur(inputProductWeight);

    await waitFor(() =>
      expect(getByText(MESSAGES_WARNING.PRODUCT.WEIGHT_IS_ZERO)).toBeTruthy(),
    );
  });

  it("should call preventDefault when key is in except key so value will not contain this key", async () => {
    const mockEvent = {
      key: EXCEPT_KEYS.POSITIVE_DOUBLE[3],
    };
    const getById = queryAllByAttribute.bind(null, "id");
    const { container } = renderComponent();
    const quantityInput = getById(container, "add-product-quantity");

    fireEvent.keyDown(quantityInput[0], mockEvent); // Invalid input
    expect(quantityInput[0].value).not.toContain(
      EXCEPT_KEYS.POSITIVE_DOUBLE[3],
    );
  });

  it("should call onPaste and value will not contain this content", async () => {
    const contentPaste = 1;
    const { getByTestId } = renderComponent();
    const quantityInput = getByTestId("add-product-quantity");

    const pasteEvent = createEvent.paste(quantityInput, contentPaste);

    fireEvent(quantityInput, pasteEvent);

    await waitFor(() => {
      expect(quantityInput).not.toContain(contentPaste);
    });
  });

  it("should not show warning message if blur weight input with value is valid number", () => {
    const { getByTestId, queryAllByText, getByLabelText } = renderComponent();
    const inputElement = getByTestId("add-product-weight") as HTMLInputElement;
    fireEvent.change(getByLabelText("Weight"), { target: { value: "12" } });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("12");
    expect(
      queryAllByText(MESSAGES_WARNING.PRODUCT.WEIGHT_IS_ZERO),
    ).toHaveLength(0);
  });

  it("should show message limit if blur weight input with value is greater than 2000", () => {
    const valueWeight = 30000;

    const { getByTestId, getByLabelText, getAllByText } = renderComponent();
    const inputElement = getByTestId("add-product-weight") as HTMLInputElement;
    fireEvent.change(getByLabelText("Weight"), {
      target: { value: valueWeight },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("30000");
    expect(getAllByText(MESSAGES_ERROR.PRODUCT.WEIGHT_LIMIT)).toHaveLength(1);
  });

  it("should show warning message if blur weight input with value is invalid number", () => {
    const valueWeight = "aa";

    const { getByTestId, getAllByText, getByLabelText } = renderComponent();
    const inputElement = getByTestId("add-product-weight") as HTMLInputElement;
    fireEvent.change(getByLabelText("Weight"), {
      target: { value: valueWeight },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("");
    expect(getAllByText(MESSAGES_WARNING.PRODUCT.WEIGHT_IS_ZERO)).toHaveLength(
      1,
    );
  });

  it("should show warring message when input quantity is 0", () => {
    const valueQuantity = 0;

    const { getAllByText, getByTestId, getByLabelText } = renderComponent();
    const inputElement = getByTestId(
      "add-product-quantity",
    ) as HTMLInputElement;
    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: valueQuantity },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("0");
    expect(
      getAllByText(MESSAGES_WARNING.PRODUCT.QUANTITY_IS_ZERO),
    ).toHaveLength(1);
  });

  it("should show warring message if blur quantity input with value is invalid number", () => {
    const valueQuantity = "aa";

    const { getByTestId, getAllByText, getByLabelText } = renderComponent();
    const inputElement = getByTestId(
      "add-product-quantity",
    ) as HTMLInputElement;
    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: valueQuantity },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("");
    expect(
      getAllByText(MESSAGES_WARNING.PRODUCT.QUANTITY_IS_ZERO),
    ).toHaveLength(1);
  });

  it("should show error message limit if quantity input with value is greater than 10000", () => {
    const valueQuantity = 20000; //quantity limit is 10000
    const { getByTestId, getAllByText, getByLabelText } = renderComponent();
    const inputElement = getByTestId(
      "add-product-quantity",
    ) as HTMLInputElement;
    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: valueQuantity },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("20000");
    expect(getAllByText(MESSAGES_ERROR.PRODUCT.QUANTITY_LIMIT)).toHaveLength(1);
  });

  it("should not show warring message if blur quantity input with value is valid number", () => {
    const valueQuantity = "11";
    const { getByTestId, queryAllByText, getByLabelText } = renderComponent();
    const inputElement = getByTestId(
      "add-product-quantity",
    ) as HTMLInputElement;
    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: valueQuantity },
    });
    fireEvent.blur(inputElement);
    expect(
      queryAllByText(MESSAGES_WARNING.PRODUCT.QUANTITY_IS_ZERO),
    ).toHaveLength(0);
  });

  it("should show warring message if blur quantity input with invalid number and don't have error message", () => {
    const valueQuantity = "ab";
    const { getByTestId, queryAllByText, getByLabelText } = renderComponent();
    const inputElement = getByTestId(
      "add-product-quantity",
    ) as HTMLInputElement;
    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: valueQuantity },
    });
    fireEvent.blur(inputElement);
    expect(
      queryAllByText(MESSAGES_WARNING.PRODUCT.QUANTITY_IS_ZERO),
    ).toHaveLength(1);
  });
});
