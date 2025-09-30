// Libs
import { render } from "@testing-library/react";

// Components
import ProfileForm from "./ProfileForm";

describe("ProfileForm", () => {
  it("should match snapshot", async () => {
    const { container } = render(
      <ProfileForm onBack={() => {}} onSubmit={() => {}} />,
    );

    expect(container).toMatchSnapshot();
  });
});
