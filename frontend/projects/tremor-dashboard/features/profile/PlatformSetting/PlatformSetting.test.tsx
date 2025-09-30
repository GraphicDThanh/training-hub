import { render } from "@testing-library/react";

// Components
import PlatformSetting from "./PlatformSetting";

// Constants
import { SETTING_DATA_ACCOUNT, SETTING_DATA_APPLICATION } from "@/constants";

describe("PlatformSetting component", () => {
  const props = {
    applicationSettingData: SETTING_DATA_APPLICATION,
    accountSettingData: SETTING_DATA_ACCOUNT,
  };

  const platformSetting = () => {
    return render(<PlatformSetting {...props} />);
  };

  it("Should render PlatformSetting snapshot correctly", () => {
    expect(platformSetting()).toMatchSnapshot();
  });
});
