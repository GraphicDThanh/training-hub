import { fireEvent, render } from "@testing-library/react";

// Constants
import {
  SETTING_DATA_APPLICATION,
  SETTING_FIELDS_APPLICATION,
} from "@/constants";

// Contexts
import { ThemeContext, ThemeProvider } from "@/context/theme";

// Types
import { ApplicationSettingData } from "@/types";

// Components
import PlatformSettingContainer, {
  PlatformSettingContainerProps,
} from "./PlatformSettingContainer";

describe("PlatformSettingContainer", () => {
  const propsWithData: PlatformSettingContainerProps = {
    title: "Application",
    fields: SETTING_FIELDS_APPLICATION,
    data: SETTING_DATA_APPLICATION,
  };

  const propsWithEmptyData: PlatformSettingContainerProps = {
    title: "Application",
    fields: [],
    data: {} as ApplicationSettingData,
  };

  const renderPlatformSettingContainer = (
    props: PlatformSettingContainerProps,
  ) =>
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ isDarkTheme, toggleTheme }) => (
            <>
              <PlatformSettingContainer {...props} />
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

  it("match snapshot", () => {
    const { container } = renderPlatformSettingContainer(propsWithData);

    expect(container).toMatchSnapshot();
  });

  it("Should render ApplicationSetting in case empty data", () => {
    const { queryByTestId } =
      renderPlatformSettingContainer(propsWithEmptyData);

    expect(queryByTestId("platformSettingContainer")).toBeNull();
  });

  it("Handle click dark theme", () => {
    const { getByTestId } = renderPlatformSettingContainer(propsWithData);

    const themeButton = getByTestId("toggle-theme");

    fireEvent.click(themeButton);
    expect(themeButton.textContent).toBe("isDarkTheme to true");
  });

  it("Handle click light theme", () => {
    const { getByTestId } = renderPlatformSettingContainer(propsWithData);

    const themeButton = getByTestId("toggle-theme");

    fireEvent.click(themeButton);
    expect(themeButton.textContent).toBe("isDarkTheme to false");
  });
});
