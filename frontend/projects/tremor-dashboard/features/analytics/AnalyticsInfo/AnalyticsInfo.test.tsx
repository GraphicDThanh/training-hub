import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import AnalyticsInfo from "./AnalyticsInfo";

// Constants
import { NO_IMAGE } from "@/constants";

//Types
import { AnalyticsInfoData } from "@/types";

// Mock data
import { ANALYTIC_INFO } from "@/mocks";

describe("Testing analytics sale chart component", () => {
  it("Should match snapshot", () => {
    const component = render(<AnalyticsInfo infoData={ANALYTIC_INFO[0]} />);
    expect(component).toMatchSnapshot();
  });

  it("Should check render AnalyticsInfo with no data", () => {
    const { container } = render(
      <AnalyticsInfo infoData={{} as AnalyticsInfoData} />,
    );
    const element = container.querySelector("img");
    expect(element).toBeTruthy();
    expect(element?.getAttribute("alt")).toEqual(NO_IMAGE);
  });
});
