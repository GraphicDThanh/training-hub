import { fireEvent, render } from "@testing-library/react";

// Constants
import { ROUTES } from "@/constants";
import { PROFILE_ITEM } from "@/mocks";

// Component
import Sidebar from "./Sidebar";

// Types
import { USER_ROLE } from "@/types";

describe("Sidebar component", () => {
  const mockFunction = jest.fn();

  const propsDefault = {
    avatarUrl: PROFILE_ITEM.avatar,
    name: PROFILE_ITEM.name,
    pathname: ROUTES.PROJECTS,
    isCollapse: false,
    role: USER_ROLE.ADMIN,
    toggleSidebar: mockFunction,
    onSignOut: mockFunction,
  };

  const sidebar = () => {
    return render(<Sidebar {...propsDefault} />);
  };

  it("Should render Sidebar snapshot correctly", () => {
    expect(sidebar()).toMatchSnapshot();
  });

  it("Should call toggleSidebar when clicked outside", () => {
    const toggleSidebar = jest.fn();
    const onSignOut = jest.fn();
    const { container } = render(
      <div>
        <div id="outside-element">Outside Element</div>
        <Sidebar
          avatarUrl=""
          name=""
          isCollapse={true}
          role={USER_ROLE.ADMIN}
          toggleSidebar={toggleSidebar}
          pathname={ROUTES.SETTING}
          onSignOut={onSignOut}
        />
      </div>,
    );

    const outsideElement = container.querySelector("#outside-element");
    fireEvent.mouseDown(outsideElement!);

    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("Should call toggleSidebar when clicked item", () => {
    const toggleSidebar = jest.fn();
    const { getByText } = render(
      <Sidebar {...propsDefault} toggleSidebar={toggleSidebar} />,
    );

    const itemElement = getByText("Projects");
    fireEvent.click(itemElement);

    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  // Mock window.innerWidth
  const originalInnerWidth = window.innerWidth;
  beforeAll(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800, // Set a value less than BREAKPOINTS === 1280
    });
  });

  it("Closes sidebar when window width is smaller than or equal to BREAKPOINTS === 1280", () => {
    const toggleSidebar = jest.fn();

    const { container } = render(
      <Sidebar
        {...propsDefault}
        role={USER_ROLE.NORMAL}
        isCollapse={true}
        toggleSidebar={toggleSidebar}
      />,
    );

    const sidebar = container.querySelector(".sidebar");
    fireEvent.click(sidebar!);

    expect(toggleSidebar).toHaveBeenCalledTimes(0);
  });

  it("Calls sign out", async () => {
    const mockOnSignOut = jest.fn();
    const { getByTestId, getByText } = render(
      <Sidebar {...propsDefault} onSignOut={mockOnSignOut} />,
    );

    // Click it to open the logout button
    fireEvent.click(getByTestId("openAccordionBody"));

    // Await the logout button displays
    const logoutBtn = getByText("Logout").parentElement as Element;

    // Click logout
    fireEvent.click(logoutBtn);

    expect(mockOnSignOut).toHaveBeenCalled();
  });

  // Restore window.innerWidth
  afterAll(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("Should render labels when click user button", async () => {
    const mockOnSignOut = jest.fn();
    const { getByTestId } = render(
      <Sidebar {...propsDefault} onSignOut={mockOnSignOut} />,
    );

    // Click it to open the logout button
    fireEvent.click(getByTestId("openAccordionBody"));

    expect(sidebar()).toMatchSnapshot();
  });
});
