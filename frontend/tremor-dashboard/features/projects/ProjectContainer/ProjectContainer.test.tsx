import { fireEvent, render, waitFor, act } from "@testing-library/react";

// Mocks
import { MOCK_USERS, PROJECT_DATA } from "@/mocks";

// Constants
import { TOOL_ICON_OPTION } from "@/constants";

// Components
import ProjectContainer from "./ProjectContainer";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("ProjectContainer", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  window.ResizeObserver = ResizeObserver;

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ProjectContainer
        userId={1}
        projectTools={TOOL_ICON_OPTION}
        projectsData={PROJECT_DATA}
        users={MOCK_USERS}
      />,
    );
  };

  it("match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it("should show project modal after click add new project button", async () => {
    const { getByTestId, queryByText } = renderComponent();

    await act(async () => {
      await fireEvent.click(getByTestId("add-new-btn"));
    });

    expect(queryByText("Add new project")).toBeTruthy();
  });

  it("should close project modal after click icon close modal project button", async () => {
    const { getByTestId, queryByText } = renderComponent();

    await act(async () => {
      await fireEvent.click(getByTestId("add-new-btn"));
    });

    expect(queryByText("Add new project")).toBeTruthy();
    fireEvent.click(getByTestId("close-modal-btn"));
    expect(queryByText("Add new project")).toBeFalsy();
  });

  it("should close action menu when an action edit is clicked", async () => {
    const { getAllByTestId, findByTestId } = renderComponent();
    const toggleIcons = getAllByTestId("toggle-icon") as HTMLInputElement[];

    expect(toggleIcons.length).toEqual(6);
    fireEvent.click(toggleIcons[0]);
    expect(await findByTestId("menu-action")).toBeTruthy();
    fireEvent.click(await findByTestId("edit-project"));
    waitFor(() => expect(findByTestId("menu-action")).toBeFalsy());
  });
});
