import { render } from "@testing-library/react";

// Components
import NoPermissionContent from "./NoPermissionContent";

describe("NoPermissionContent Testing", () => {
  it("Should match snapshot", () => {
    const component = render(<NoPermissionContent />);
    expect(component).toMatchSnapshot();
  });
});
