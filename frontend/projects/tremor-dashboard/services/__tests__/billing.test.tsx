// Services
import { getBillings } from "@/services";

// Mocks
import { MOCK_BILLING } from "@/mocks";

describe("getBillings of services", () => {
  it("should call fetch data if getBillings called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: MOCK_BILLING,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getBillingsRes = await getBillings();
    expect(mockFetch).toHaveBeenCalled();
    expect(getBillingsRes.data).toEqual(MOCK_BILLING);
  });

  it("should throw an error if call getBillings falsed", async () => {
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
      await getBillings();
    }).rejects.toThrow();
  });
});
