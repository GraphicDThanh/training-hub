// Services
import {
  getProjects,
  addNewProject,
  editProject,
  getProjectTools,
  deleteProject,
} from "@/services";

// Mocks
import { PROJECT_DATA } from "@/mocks";

describe("projects of services", () => {
  it("should call fetch data if getProduct is called", async () => {
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
    await getProjects(1);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should throw an error if call getProjects falsed", async () => {
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
      await getProjects(1);
    }).rejects.toThrow();
  });

  it("should call fetch data if addNewProject is called", async () => {
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
    await addNewProject(PROJECT_DATA[0], 1);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should call fetch data if editProject is called", async () => {
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
    await editProject(PROJECT_DATA[0], 1, 1);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should call fetch data if getProjectTools is called", async () => {
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
    await getProjectTools();
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should throw an error if call getProjectTools falsed", async () => {
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
      await getProjectTools();
    }).rejects.toThrow();
  });
  it("should call fetch data if deleteProject is called", async () => {
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
    await deleteProject();
    expect(mockFetch).toHaveBeenCalled();
  });
});
