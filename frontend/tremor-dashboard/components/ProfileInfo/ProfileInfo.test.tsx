import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import ProfileInfo from "./ProfileInfo";

// Constants
import { AVATAR_IMAGE } from "@/constants";

// Mocking usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest
    .fn()
    .mockReturnValueOnce("/projects")
    .mockReturnValue("/products"),
}));

describe("Testing profile info component", () => {
  const propsDefault = {
    name: "Richard Davis",
    role: "CEO / Co-Founder",
    avatarUrl: AVATAR_IMAGE.LG,
  };

  const propsIncludeIsProject = {
    name: "Richard Davis",
    role: "CEO / Co-Founder",
    avatarUrl: AVATAR_IMAGE.LG,
    isProject: true,
  };

  it("Should match snapshot pathname is project", () => {
    const component = render(<ProfileInfo {...propsDefault} />);
    expect(component).toMatchSnapshot();
  });

  it("Should match snapshot another pathname", () => {
    const component = render(<ProfileInfo {...propsDefault} />);
    expect(component).toMatchSnapshot();
  });

  it("Should match snapshot with prop isProject is true", () => {
    const component = render(<ProfileInfo {...propsIncludeIsProject} />);
    expect(component).toMatchSnapshot();
  });
});
