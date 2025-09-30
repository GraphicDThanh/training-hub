// Services
import { authenticationLogout } from "@/services";

describe("authenticationLogout", () => {
  it("should mockFetch to call authenticationLogout success", async () => {
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
    await authenticationLogout();
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should throw an error if call authenticationLogout falsed", async () => {
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
      await authenticationLogout();
    }).rejects.toThrow();
  });

  it("should throw an error if call authenticationLogout with null data", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await authenticationLogout();
    }).rejects.toThrow();
  });
});
