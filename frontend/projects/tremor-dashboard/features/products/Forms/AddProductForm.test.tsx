// Libs
import { fireEvent, render, waitFor, act } from "@testing-library/react";

// Components
import { AddProductForm } from ".";

// Types
import { ProductData } from "@/types";

// Mocks
import { MOCK_PRODUCT_INFO } from "@/mocks";

// Common setup function
const setup = (props?: { productId?: number }) =>
  render(<AddProductForm productId={props?.productId ?? 1} />);

describe("AddProductForm", () => {
  const {
    productName,
    weight,
    quantity,
    price,
    providerName,
    sku,
    shopifyUrl,
    facebookUrl,
    instagramUrl,
  } = MOCK_PRODUCT_INFO as ProductData;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("should render ProductInfoForm component correctly when being step-content-1 and if submit will to step-content-2", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1 (ProductInfoForm)
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
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

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      productName,
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("20");
    expect(
      getByTestId("category").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Electronics");
    expect((getByLabelText("Quantity") as HTMLInputElement).value).toBe("2");
    expect((getByLabelText("Provider Name") as HTMLInputElement).value).toBe(
      providerName,
    );

    fireEvent.submit(container.querySelector("#product-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );
  });

  it("should render MediaForm component correctly in step-content-2 only after if rendered ProductInfoForm component correctly and then submit step-content-1 will to step-content-2 and next if submit step-content-2 will to step-content-3", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1 (ProductInfoForm)
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
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

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      productName,
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("20");
    expect(
      getByTestId("category").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Electronics");
    expect((getByLabelText("Quantity") as HTMLInputElement).value).toBe("2");
    expect((getByLabelText("Provider Name") as HTMLInputElement).value).toBe(
      providerName,
    );

    fireEvent.submit(container.querySelector("#product-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 2 (MediaForm)
    await waitFor(() => container.querySelector("#media-form"));

    expect(container.querySelector("#dropzone-file") as Element).toBeTruthy();

    fireEvent.submit(container.querySelector("#media-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-3").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );
  });

  it("should render SocialForm component correctly in step-content-3 only after if rendered ProductInfoForm component correctly and then submit step-content-1 will to step-content-2 and next if submit step-content-2 will to step-content-3 and last if submit step-content-3 will to last-step-content", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1 (ProductInfoForm)
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
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

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      productName,
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("20");
    expect(
      getByTestId("category").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Electronics");
    expect((getByLabelText("Quantity") as HTMLInputElement).value).toBe("2");
    expect((getByLabelText("Provider Name") as HTMLInputElement).value).toBe(
      providerName,
    );

    fireEvent.submit(container.querySelector("#product-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 2 (MediaForm)
    await waitFor(() => container.querySelector("#media-form"));

    expect(container.querySelector("#dropzone-file") as Element).toBeTruthy();

    fireEvent.submit(container.querySelector("#media-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-3").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 3 (SocialForm)
    await waitFor(() => container.querySelector("#social-form"));

    fireEvent.change(getByLabelText("Shopify Handle"), {
      target: { value: shopifyUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#social-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("last-step-content").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );
  });

  it("should render Pricing Form component after rendered 3 steps and if submit successfuly will show message toast Add product successfully", async () => {
    const {
      container,
      getByLabelText,
      queryAllByText,
      getByTestId,
      getAllByTestId,
    } = setup();

    const responseData = { success: true };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    // FORM 1 (ProductInfoForm)
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
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

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      productName,
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("20");
    expect(
      getByTestId("category").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Electronics");
    expect((getByLabelText("Quantity") as HTMLInputElement).value).toBe("2");
    expect((getByLabelText("Provider Name") as HTMLInputElement).value).toBe(
      providerName,
    );

    fireEvent.submit(container.querySelector("#product-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 2 (MediaForm)
    await waitFor(() => container.querySelector("#media-form"));

    expect(container.querySelector("#dropzone-file") as Element).toBeTruthy();

    fireEvent.submit(container.querySelector("#media-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-3").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 3 (SocialForm)
    await waitFor(() => container.querySelector("#social-form"));

    fireEvent.change(getByLabelText("Shopify Handle"), {
      target: { value: shopifyUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#social-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("last-step-content").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 4 (PricingForm)
    await waitFor(() => container.querySelector("#pricing-form"));

    fireEvent.change(getByLabelText("Price"), {
      target: { value: price },
    });
    fireEvent.change(getByLabelText("SKU"), {
      target: { value: sku },
    });

    fireEvent.submit(container.querySelector("#pricing-form") as Element);
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "Add product successfully",
      ),
    );

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });
  });

  it("should calls back step if being step-1 after call will back step-0", async () => {
    jest.useFakeTimers();
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1 (ProductInfoForm)
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
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

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      productName,
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("20");
    expect(
      getByTestId("category").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Electronics");
    expect((getByLabelText("Quantity") as HTMLInputElement).value).toBe("2");
    expect((getByLabelText("Provider Name") as HTMLInputElement).value).toBe(
      providerName,
    );

    fireEvent.submit(container.querySelector("#product-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 2 (MediaForm)
    await waitFor(() => container.querySelector("#media-form"));

    await act(() => {
      jest.runOnlyPendingTimers();
      fireEvent.click(getByTestId("back-btn"));
    });

    await waitFor(() =>
      expect(
        getByTestId("step-content-0").querySelectorAll("span")[0].className,
      ).toBe("stepper-dot-active"),
    );
  });

  it("should show message toast Failed to add product if calls submit form failed", async () => {
    const {
      container,
      getByLabelText,
      getByTestId,
      queryAllByText,
      getAllByTestId,
    } = setup();
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue({ message: "Failed to add product" }),
    };

    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    // FORM 1 (ProductInfoForm)
    fireEvent.change(getByLabelText("Name"), {
      target: { value: productName },
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

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(
      productName,
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("20");
    expect(
      getByTestId("category").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Electronics");
    expect((getByLabelText("Quantity") as HTMLInputElement).value).toBe("2");
    expect((getByLabelText("Provider Name") as HTMLInputElement).value).toBe(
      providerName,
    );

    fireEvent.submit(container.querySelector("#product-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 2 (MediaForm)
    await waitFor(() => container.querySelector("#media-form"));

    expect(container.querySelector("#dropzone-file") as Element).toBeTruthy();

    fireEvent.submit(container.querySelector("#media-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-3").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 3 (SocialForm)
    await waitFor(() => container.querySelector("#social-form"));

    fireEvent.change(getByLabelText("Shopify Handle"), {
      target: { value: shopifyUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#social-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("last-step-content").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );

    // FORM 4 (PricingForm)
    await waitFor(() => container.querySelector("#pricing-form"));

    fireEvent.change(getByLabelText("Price"), {
      target: { value: price },
    });
    fireEvent.change(getByLabelText("SKU"), {
      target: { value: sku },
    });

    fireEvent.submit(
      container.querySelector("#pricing-form") as HTMLFormElement,
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "Failed to add product",
      ),
    );
    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      const titleTexts = queryAllByText("Price");
      expect(titleTexts.length).toBeGreaterThan(0);
    });
  });
});
