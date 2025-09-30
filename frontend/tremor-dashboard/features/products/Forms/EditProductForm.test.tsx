// Libs
import { fireEvent, render, waitFor, act } from "@testing-library/react";

// Components
import { EditProductForm } from ".";

// Mocks
import { MOCK_PRODUCT_INFO } from "@/mocks";

// Types
import { EditProductData } from "@/types";

describe("EditProductForm", () => {
  // Common setup function
  const setup = ({
    id = 545,
    productData = MOCK_PRODUCT_INFO,
  }: {
    id?: number;
    productData?: EditProductData;
  }) => render(<EditProductForm id={id} productData={productData} />);

  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("should render snapshot", async () => {
    const { container } = setup({ productData: { ...MOCK_PRODUCT_INFO } });
    expect(container).toMatchSnapshot();
  });

  it("should render component correctly and show message toast success if call submit edit successfully", async () => {
    jest.useFakeTimers();
    const responseData = { success: true };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const {
      container,
      getByLabelText,
      getAllByTestId,
      getByTestId,
      queryAllByText,
    } = setup({ productData: { ...MOCK_PRODUCT_INFO } });
    const {
      productName,
      weight,
      quantity,
      providerName,
      shopifyUrl,
      facebookUrl,
      instagramUrl,
    } = MOCK_PRODUCT_INFO;

    // ProductInfoForm
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
    });
    fireEvent.change(getByLabelText("Weight"), {
      target: { value: weight },
    });
    fireEvent.change(getByLabelText("Weight"), { target: { value: weight } });
    fireEvent.click(getByTestId("category").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);

    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: quantity },
    });
    fireEvent.change(getByLabelText("Provider Name"), {
      target: { value: providerName },
    });

    // Form Social
    fireEvent.change(getByLabelText("Shopify Handle"), {
      target: { value: shopifyUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#edit-product-form") as Element);

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "Edit product successfully",
      ),
    );
    await act(() => {
      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(3000);
    });
  });

  it("product image should be replaced by default image if user removes current image", async () => {
    jest.useFakeTimers();
    const { container, getByText } = setup({
      productData: {
        ...MOCK_PRODUCT_INFO,
        image: "/assets/images/products/blue-shoe.webp",
      },
    });

    fireEvent.click(getByText("Remove Image"));

    await act(() => {
      jest.runOnlyPendingTimers();
      fireEvent.submit(
        container.querySelector("#edit-product-form") as Element,
      );
    });
    await waitFor(() => {
      expect(container.querySelector("img")?.src).toContain(
        "_next/image?url=%2Fimages%2Fno-image-square.webp&w=3840&q=40",
      );
    });
  });

  it("should show message toast failed if call submit edit product failed", async () => {
    jest.useFakeTimers();
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup({
      productData: { ...MOCK_PRODUCT_INFO },
    });
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue({ data: null }),
    };

    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const {
      productName,
      weight,
      quantity,
      providerName,
      shopifyUrl,
      facebookUrl,
      instagramUrl,
    } = MOCK_PRODUCT_INFO;

    // ProductInfoForm
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
    });
    fireEvent.change(getByLabelText("Weight"), {
      target: { value: weight },
    });
    fireEvent.change(getByLabelText("Weight"), { target: { value: weight } });
    fireEvent.click(getByTestId("category").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);

    fireEvent.change(getByLabelText("Quantity"), {
      target: { value: quantity },
    });
    fireEvent.change(getByLabelText("Provider Name"), {
      target: { value: providerName },
    });

    // Form Social
    fireEvent.change(getByLabelText("Shopify Handle"), {
      target: { value: shopifyUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#edit-product-form") as Element);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "Failed to edit product",
      ),
    );
    await act(() => {
      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(3000);
    });
  });
});
