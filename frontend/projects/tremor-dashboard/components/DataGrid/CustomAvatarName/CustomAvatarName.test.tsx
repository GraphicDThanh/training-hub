import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Constants
import { AVATAR_IMAGE } from "@/constants";

// Components
import CustomAvatarName from "./CustomAvatarName";

describe("CustomAvatarName", () => {
  const props = {
    text: "John Doe",
    href: "",
  };

  const renderCustomAvatarName = () =>
    render(<CustomAvatarName avatar={AVATAR_IMAGE.XS} {...props} />);

  it("should match snapshot", () => {
    const { container } = renderCustomAvatarName();

    expect(container).toMatchSnapshot();
  });

  it("renders the correct src", () => {
    const { getByRole } = render(<CustomAvatarName {...props} />);

    const image = getByRole("img");
    const urlImage = image.getAttribute("src");
    expect(urlImage).toBeTruthy();
  });
});
