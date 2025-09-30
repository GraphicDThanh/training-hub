import { fireEvent, render } from "@testing-library/react";

// Components
import DashboardHeader from "./DashboardHeader";

// Themes
import { ThemeContext, ThemeProvider } from "@/context/theme";
import { USER_ROLE } from "@/types";

// Mocking usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest
    .fn()
    .mockReturnValueOnce("/projects")
    .mockReturnValueOnce("/projects")
    .mockReturnValue("/products"),
  useParams: jest.fn().mockReturnValue({}),
}));

describe("DashboardHeader component", () => {
  const mockFunction = jest.fn();

  const propsDefault = {
    toggleSidebar: mockFunction,
    isCollapseSidebar: true,
    role: USER_ROLE.ADMIN,
  };

  const dashboardHeader = () => {
    return render(<DashboardHeader {...propsDefault} />);
  };

  it("Should render DashboardHeader snapshot correctly", () => {
    const { container } = render(
      <DashboardHeader {...propsDefault} isCollapseSidebar={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should set isScrolled state to true when window is scrolled down", () => {
    Object.defineProperty(window, "scrollY", { value: 100 });

    const { container } = dashboardHeader();

    fireEvent.scroll(window);

    // Check if isScrolled state is true
    const headerElement = container.querySelector(".sticky");
    expect(headerElement).toBeTruthy();
    expect(headerElement!.classList.contains("sticky")).toBe(true);
  });

  it("Should set isScrolled state to false when window is scrolled to top", () => {
    Object.defineProperty(window, "scrollY", { value: 0 });

    const { container } = dashboardHeader();

    const link = container.getElementsByClassName("bc-link")[0];
    expect(link.textContent).toEqual("products");
    fireEvent.scroll(window);

    // Check if isScrolled state is false
    expect(container.querySelector(".sticky")).not.toBeTruthy();
  });

  it("Should set dark theme is true", () => {
    Object.defineProperty(window, "scrollY", { value: 0 });

    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ isDarkTheme, toggleTheme }) => (
            <>
              <DashboardHeader {...propsDefault} />
              <button
                data-testid="toggle-theme"
                onClick={() =>
                  toggleTheme()
                }>{`isDarkTheme to ${isDarkTheme}`}</button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    const themeButton = getByTestId("toggle-theme");

    fireEvent.click(themeButton);
    expect(themeButton.textContent).toBe("isDarkTheme to true");

    fireEvent.click(themeButton);
    expect(themeButton.textContent).toBe("isDarkTheme to false");
  });
});
