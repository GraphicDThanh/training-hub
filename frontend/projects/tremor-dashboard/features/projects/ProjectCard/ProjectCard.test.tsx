import fetchMock from "jest-fetch-mock";
import { fireEvent, render, waitFor } from "@testing-library/react";

//Components
import ProjectCard from "./ProjectCard";

//Mocks
import { MOCK_USERS, PROJECT_DATA } from "@/mocks";

let isRevalidatePathEnabled = true;

jest.mock("next/cache", () => ({
  __esModule: true,
  revalidatePath: jest.fn((path: string) => {
    return isRevalidatePathEnabled;
  }),
}));

describe("Testing ProjectCard component", () => {
  const propsDefault = {
    projectData: PROJECT_DATA[0],
    userId: MOCK_USERS[0].id,
    handleEditModal: jest.fn(),
    openToast: jest.fn(),
  };

  const renderWrapper = () => render(<ProjectCard {...propsDefault} />);

  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    fetchMock.enableMocks();
  });

  it("Should match snapshot", () => {
    const component = renderWrapper();

    expect(component).toMatchSnapshot();
  });

  it("Should toggle action menu when ellipsis icon is clicked", async () => {
    const { findByTestId } = renderWrapper();

    fireEvent.click(await findByTestId("toggle-icon"));

    expect(await findByTestId("menu-action")).toBeTruthy();
  });

  it("Should close action menu when clicking outside the component", async () => {
    const mockProject = {
      projectData: { ...propsDefault.projectData, cover: "" },
      openToast: jest.fn(),
    };
    const renderWrapperWithOutSide = () =>
      render(
        <div data-testid="outside">
          <ProjectCard
            {...mockProject}
            userId={propsDefault.userId}
            handleEditModal={propsDefault.handleEditModal}
          />
        </div>,
      );
    const { findByTestId } = renderWrapperWithOutSide();

    fireEvent.click(await findByTestId("toggle-icon"));
    fireEvent.click(await findByTestId("outside"));

    waitFor(() => expect(findByTestId("menu-action")).toBeFalsy());
  });

  it("Should close action menu when an action edit is clicked", async () => {
    const { findByTestId } = renderWrapper();

    fireEvent.click(await findByTestId("toggle-icon"));
    fireEvent.click(await findByTestId("edit-project"));

    waitFor(() => expect(findByTestId("menu-action")).toBeFalsy());
  });

  it("Should close action menu when an action delete is clicked", async () => {
    const { findByTestId, queryByTestId } = renderWrapper();

    fireEvent.click(await findByTestId("toggle-icon"));
    fireEvent.click(await findByTestId("delete-project"));

    fetchMock.mockResponse(JSON.stringify({ status: 204 }));
    isRevalidatePathEnabled = true;

    await waitFor(async () => {
      const menuAction = await queryByTestId("menu-action");
      expect(menuAction).toBe(null);
    });
  });
});
