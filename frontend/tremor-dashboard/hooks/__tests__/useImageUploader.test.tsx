import { renderHook, act } from "@testing-library/react";

// Hooks
import useImageUploader from "@/hooks/useImageUploader";

// Constants
import { NOT_FOUND_IMAGE } from "@/constants";

describe("useImageUploader", () => {
  const mockImageUploader =
    "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/product-11.b01b2346.jpg";

  // Create a PNG file object
  const file = new File(["test image"], mockImageUploader, {
    type: "image/jpg",
  });

  it("should check value image after mock call upload image", async () => {
    jest.useFakeTimers();
    const responseData = {
      message: "success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: {
        image: {
          url: mockImageUploader,
        },
      },
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useImageUploader(mockImageUploader));
    await act(() => {
      result.current.upload(file);
    });
    expect(result.current.imageValue).toEqual(mockImageUploader);
  });

  it("should show error message after mock call upload image falsed", async () => {
    jest.useFakeTimers();
    const responseData = {
      error: "false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      status: "200",
      statusText: "can not upload image",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useImageUploader(mockImageUploader));
    await act(() => {
      result.current.upload(file);
    });
    const { error } = result.current;
    expect(error.toString()).toEqual(
      "Error: An error has occurred: 200 - can not upload image",
    );
  });

  it("check value image after remove image", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useImageUploader(mockImageUploader));
    await act(() => {
      result.current.removeImage();
    });
    expect(result.current.imageValue).toEqual(NOT_FOUND_IMAGE);
  });
});
