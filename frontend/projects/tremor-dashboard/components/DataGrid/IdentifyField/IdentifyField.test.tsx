import { render } from "@testing-library/react";

// Constants
import { ROUTES } from "@/constants";

// Components
import IdentifyField from "./IdentifyField";

describe("IdentifyField component", () => {
  it("should render snapshot correctly", () => {
    const { container } = render(
      <IdentifyField id={1} link={`${ROUTES.PRODUCTS}/${1}`} />,
    );

    expect(container).toMatchSnapshot();
  });
});
