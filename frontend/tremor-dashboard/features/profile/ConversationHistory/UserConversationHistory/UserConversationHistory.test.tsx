import { fireEvent, render } from "@testing-library/react";
import UserConversationHistory from "./UserConversationHistory";
import { MOCKS_CONVERSATION_GROUP } from "@/mocks";

const mockHandleOpenConversationModal = jest.fn();

const mockConversationGroup = MOCKS_CONVERSATION_GROUP[0];

describe("UserConversationHistory", () => {
  const setup = (
    props?: Partial<Parameters<typeof UserConversationHistory>[0]>,
  ) =>
    render(
      <UserConversationHistory
        {...mockConversationGroup}
        onOpenConversationModal={mockHandleOpenConversationModal}
        {...props}
      />,
    );

  it("Should render correctly", () => {
    const overrideUser = {
      ...mockConversationGroup.conversationUser,
      avatar: undefined,
    };
    const { container } = setup({ conversationUser: overrideUser as any });
    expect(container).toMatchSnapshot();
  });

  it("Should render correctly", () => {
    const { getByText } = setup();
    const replyButton = getByText("Reply");
    fireEvent.click(replyButton);
    expect(mockHandleOpenConversationModal).toHaveBeenNthCalledWith(
      1,
      mockConversationGroup.id,
    );
  });
});
