import { render } from "@testing-library/react";

// Components
import Avatars from "./Avatars";

// Mocks
import { MOCK_PARTICIPANTS_DATA } from "@/mocks";

describe("Testing avatar component", () => {
  const propsDefault = {
    height: 48,
    width: 48,
    totalParticipantsShow: 3,
    participantsData: MOCK_PARTICIPANTS_DATA,
  };

  it("Should match snapshot", () => {
    const { container } = render(<Avatars {...propsDefault} />);

    expect(container).toMatchSnapshot();
  });
});
