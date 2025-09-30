// Libs
import { render } from "@testing-library/react";

// Components
import SocialForm from "./SocialForm";

// Types
import { TFieldSocial } from "@/types";

export const SOCIAL_USERS_MOCK: TFieldSocial[] = [
  {
    id: "twitterUrl",
    name: "twitterUrl",
    label: "Twitter Handle",
    value: "home.vn",
  },
  {
    id: "facebookUrl",
    name: "facebookUrl",
    label: "Facebook Account",
    value: "home.vn",
  },
  {
    id: "instagramUrl",
    name: "instagramUrl",
    label: "Instagram Account",
    value: "home.vn",
  },
];

describe("Profile Form Testing", () => {
  it("should match snapshot", async () => {
    const { container } = render(
      <SocialForm
        socialUrls={SOCIAL_USERS_MOCK}
        onBack={() => {}}
        onSubmit={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
