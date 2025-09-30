import { render } from "@testing-library/react";

// Components
import ChatMessageModal from "./ChatMessageModal";

import { MOCKS_CONVERSATION_GROUP } from "@/mocks";

describe("ChatMessageModal", () => {
  const mockHandleClose = jest.fn();
  const mockHandleSendMessage = jest.fn();

  const renderComponent = () =>
    render(
      <ChatMessageModal
        onClose={mockHandleClose}
        onSendMessage={mockHandleSendMessage}
        {...MOCKS_CONVERSATION_GROUP[0]}
      />,
    );

  it("Match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
