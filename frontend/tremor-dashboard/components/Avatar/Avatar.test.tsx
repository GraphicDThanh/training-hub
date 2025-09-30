import { render } from "@testing-library/react";

// Components
import Avatar from "./Avatar";

// Constants
import { AVATAR_IMAGE } from "@/constants";

describe("Testing avatar component", () => {
  const propsDefault = {
    alt: "Avatar Default",
    src: AVATAR_IMAGE.MD,
    height: 48,
    width: 48,
    className: "w-[48px] h-[48px]",
  };

  it("Should match snapshot", () => {
    const { container } = render(<Avatar {...propsDefault} />);

    expect(container).toMatchSnapshot();
  });
});
