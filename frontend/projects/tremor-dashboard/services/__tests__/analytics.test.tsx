// Services
import { getAnalytics } from "@/services";

// Mocks
import { ANALITICS_DATA } from "@/mocks";

describe("getAnalytics of services", () => {
  it("should fetch correct data if getAnalytics called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: ANALITICS_DATA,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const responseGetAnlytics = await getAnalytics();
    expect(responseGetAnlytics.data.performance_statistic).toBeTruthy();
  });

  it("should throw an error if mock fetch falsed", async () => {
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
      await getAnalytics();
    }).rejects.toThrow();
  });
});
