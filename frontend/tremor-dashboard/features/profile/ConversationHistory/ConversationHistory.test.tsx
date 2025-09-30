import { render } from "@testing-library/react";
import ConversationHistory from "./ConversationHistory";
import * as ConversationGroups from "@/hooks/useConversationGroups";
import { MOCKS_CONVERSATION_GROUP } from "@/mocks";

jest.mock("@/hooks/useConversationGroups");

describe("ConversationHistory Tests", () => {
  const setup = () => render(<ConversationHistory />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly", () => {
    jest
      .spyOn(ConversationGroups, "useConversationGroups")
      .mockImplementation(() => ({
        groups: [],
        isLoading: true,
      }));
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("Should render correctly", () => {
    jest
      .spyOn(ConversationGroups, "useConversationGroups")
      .mockImplementation(() => ({
        groups: [MOCKS_CONVERSATION_GROUP[0]],
        isLoading: false,
      }));

    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
