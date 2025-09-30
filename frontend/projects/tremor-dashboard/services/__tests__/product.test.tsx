// Services
import {
  getProducts,
  getProduct,
  editProduct,
  addNewProduct,
} from "@/services";

// Constants
import { PAGE_SIZE } from "@/constants";

// Mocks
import { MOCK_PRODUCT_INFO } from "@/mocks";

describe("product of services", () => {
  it("should call fetch data if getProducts is called", async () => {
    const paramOrder = {
      page: 2,
      available: "",
      query: "",
      sortBy: "",
      orderBy: PAGE_SIZE.SIZE,
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: [MOCK_PRODUCT_INFO],
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const res = await getProducts(paramOrder);
    expect(res.data).toEqual([MOCK_PRODUCT_INFO]);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should call fetch data if getProducts called with empty param", async () => {
    const paramOrder = {};
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: {},
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const res = await getProducts(paramOrder);
    expect(res.data).toEqual({});
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should call throw an error if call getProducts falsed", async () => {
    const paramOrder = {
      page: "2",
      available: "",
      query: 1,
      sortBy: "",
      orderBy: PAGE_SIZE.SIZE,
    };
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    expect(async () => {
      await getProducts(paramOrder);
    }).rejects.toThrow();
  });

  it("should call fetch data if getProduct called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: MOCK_PRODUCT_INFO,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const res = await getProduct(1);
    expect(res.data).toEqual(MOCK_PRODUCT_INFO);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should throw an error if call getProduct falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getProduct(1);
    }).rejects.toThrow();
  });

  it("should call fetch data if editProduct called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      results: MOCK_PRODUCT_INFO,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const res = await editProduct(1, MOCK_PRODUCT_INFO);
    expect(res.data.results).toEqual(MOCK_PRODUCT_INFO);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should show error if call editProduct falsed", async () => {
    const mockProduct = {
      ...MOCK_PRODUCT_INFO,
      price: "1",
    };

    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      errors: [{ error: "Fetch product falsed" }],
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const result = await editProduct(1, mockProduct);
    expect(result.errorMessages[0]?.error).toEqual("Fetch product falsed");
  });

  it("should call fetch data with message is undefined if addNewProduct called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: {},
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const res = await addNewProduct(MOCK_PRODUCT_INFO);
    expect(res.message).toEqual(undefined);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should throw an error if call addNewProduct falsed", async () => {
    const responseData = {
      message: "Fetch falsed",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      message: "Fetch falsed",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const res = await addNewProduct(MOCK_PRODUCT_INFO);
    expect(res.message).toEqual("Fetch falsed");
    expect(mockFetch).toHaveBeenCalled();
  });
});
