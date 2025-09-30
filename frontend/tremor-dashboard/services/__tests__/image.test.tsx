// Services
import { uploadImage } from "@/services";

describe("image of services", () => {
  it("should call fetch data image if uploadImage called", async () => {
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
    await uploadImage();
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should throw an error if call uploadImage falsed", async () => {
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
      await uploadImage();
    }).rejects.toThrow();
  });
});
