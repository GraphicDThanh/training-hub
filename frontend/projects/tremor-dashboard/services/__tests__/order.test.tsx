// Services
import { getOrders, getOrderDetails } from "@/services";

import { DIRECTION } from "@/constants";
import { MOCK_ORDERS } from "@/mocks";

describe("order of services", () => {
  it("should call fetch data if getOrders called", async () => {
    const paramOrder = {
      page: 1,
      status: "0",
      query: "1",
      sortBy: "createdAt",
      orderBy: DIRECTION.DESC,
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: MOCK_ORDERS,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getOrdersRes = await getOrders(paramOrder);
    expect(mockFetch).toHaveBeenCalled();
    expect(getOrdersRes.data).toEqual(MOCK_ORDERS);
  });

  it("should call fetch data if getOrders called with empty param", async () => {
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
    const getOrdersRes = await getOrders(paramOrder);
    expect(mockFetch).toHaveBeenCalled();
    expect(getOrdersRes.data).toEqual({});
  });

  it("should call fetch data if getOrderDetails called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: MOCK_ORDERS[0],
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getOrderDetailRes = await getOrderDetails(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(getOrderDetailRes.data).toEqual(MOCK_ORDERS[0]);
  });

  it("should throw an error if call getOrderDetails falsed", async () => {
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
      await getOrderDetails(1);
    }).rejects.toThrow();
  });
});
