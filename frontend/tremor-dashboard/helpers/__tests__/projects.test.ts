import { convertProjectData } from "@/helpers";
import { MOCK_PROJECT_FROM_API, MOCK_USERS } from "@/mocks";

// Mocking the dependencies

describe("convertProjectData function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return converted project data correctly", () => {
    const result = convertProjectData(
      MOCK_PROJECT_FROM_API,
      MOCK_PROJECT_FROM_API.toolsData,
      MOCK_USERS,
    );

    expect(result).toEqual({
      description: "<p>Test create new project in profile</p>",
      dueDate: new Date("2024-05-01T17:00:00.000Z"),
      name: "New project",
      tools: ["Asana", "Atlassian"],
      participants: [],
    });
  });
});
