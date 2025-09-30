// Libs
import { render, fireEvent, waitFor } from "@testing-library/react";

// Components
import ProductInfoForm from "./ProductInfoForm";

// Mocks
import { mockProductInfo } from "@/mocks";

describe("ProductInfoForm", () => {
  const mockHandleSubmit = jest.fn();

  it("should match snapshot", async () => {
    const { container } = render(
      <ProductInfoForm {...mockProductInfo} onSubmit={mockHandleSubmit} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should not call onSubmit prop and show error message required if product name is empty", async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <ProductInfoForm {...mockProductInfo} onSubmit={mockHandleSubmit} />,
    );

    fireEvent.change(getByLabelText("Name"), { target: { value: "" } });
    expect((getByLabelText("Name") as HTMLInputElement).value).toBe("");

    const buttonSubmit = getByTestId("submit-product-info");
    fireEvent.click(buttonSubmit);

    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalledTimes(0));
    await waitFor(() =>
      expect(getByText("This field is required.")).toBeTruthy(),
    );
  });

  it("should call onSubmit prop", async () => {
    const { getByLabelText, getByTestId } = render(
      <ProductInfoForm {...mockProductInfo} onSubmit={mockHandleSubmit} />,
    );

    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Name Product" },
    });
    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      "Name Product",
    );

    const buttonSubmit = getByTestId("submit-product-info");
    fireEvent.click(buttonSubmit);
    await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalledTimes(1));
  });
});
