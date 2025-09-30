// Services
import { getTransactionsByUserId, addNewTransaction } from "@/services";

describe("transaction of services", () => {
  it("should call fetch data if getTransactionsByUserId called", async () => {
    const transactionData = {
      id: 1,
      amount: 1000,
      fromUserId: 138,
      toUserId: 2,
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: transactionData,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const getTransactionsByUserIdRes = await getTransactionsByUserId(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(getTransactionsByUserIdRes.data).toEqual(transactionData);
  });

  it("should throw an error if call getTransactionsByUserId falsed", async () => {
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
      await getTransactionsByUserId(1);
    }).rejects.toThrow();
  });

  it("should call fetch data if addNewTransaction called", async () => {
    const transactionData = {
      id: 2,
      amount: 1000,
      fromUserId: 13,
      toUserId: 3,
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: transactionData,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const addNewTransactionRes = await addNewTransaction(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(addNewTransactionRes.data).toEqual(transactionData);
  });

  it("should fetch data have message if addNewTransaction called and falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      message: "Fetch false",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const addNewTransactionRes = await addNewTransaction(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(addNewTransactionRes).toEqual("Fetch false");
  });

  it("should fetch null data if addNewTransaction called and falsed", async () => {
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue(null),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const addNewTransactionRes = await addNewTransaction(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(addNewTransactionRes).toEqual(undefined);
  });
});
