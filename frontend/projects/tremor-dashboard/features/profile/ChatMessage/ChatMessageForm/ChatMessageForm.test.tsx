import { fireEvent, render, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import ChatMessageForm from "./ChatMessageForm";

const message = "Hi!";

describe("ChatMessageForm", () => {
  const mockHandleSendMessage = jest.fn();

  const renderComponent = () =>
    render(<ChatMessageForm onSendMessage={mockHandleSendMessage} />);

  it("Should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("Should not trigger onSendMessage when user yet type but submit", async () => {
    const { getByRole } = renderComponent();

    const button = getByRole("button");
    fireEvent.click(button);
    await waitFor(() => expect(mockHandleSendMessage).not.toHaveBeenCalled());
  });

  it("Should trigger onSendMessage when user type and submit", async () => {
    const { getByTestId, getByRole } = renderComponent();

    const input = getByTestId("chat-message-input");
    fireEvent.change(input, { target: { value: message } });
    expect(input).toHaveValue(message);

    const button = getByRole("button");
    fireEvent.click(button);
    await waitFor(() =>
      expect(mockHandleSendMessage).toHaveBeenNthCalledWith(1, message),
    );
  });
});
