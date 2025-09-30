import { fireEvent, render, waitFor } from "@testing-library/react";

// Components
import { MOCKS_CHAT_BOX } from "@/mocks";
import { ADMIN_ID, AVATAR_IMAGE } from "@/constants";
import { calcTime } from "@/helpers";

import * as React from "react";
import ChatMessages from "./ChatMessages";

describe("ChatMessageList", () => {
  const renderComponent = (
    props?: Partial<Parameters<typeof ChatMessages>[0]>,
  ) =>
    render(
      <ChatMessages
        chats={MOCKS_CHAT_BOX}
        currentUserId={324}
        avatar={AVATAR_IMAGE.MD}
        name="User 1"
        {...props}
      />,
    );

  it("Should render correctly", () => {
    const { container, getAllByRole } = renderComponent();
    expect(container).toMatchSnapshot();
    expect(getAllByRole("listitem")).toHaveLength(MOCKS_CHAT_BOX.length);
  });

  it("Should render correctly", () => {
    const { container, getAllByRole } = renderComponent({
      currentUserId: ADMIN_ID,
    });

    expect(container).toMatchSnapshot();
    expect(getAllByRole("listitem")).toHaveLength(MOCKS_CHAT_BOX.length);
  });

  it("Should render time when click message first time and hidden when click second time", async () => {
    const { message, createdAt } = MOCKS_CHAT_BOX[1];
    const { queryByText } = renderComponent();

    const messageContainer = queryByText(message)?.parentElement!;

    fireEvent.click(messageContainer);

    await waitFor(() => expect(queryByText(calcTime(createdAt))).toBeTruthy());
    fireEvent.click(messageContainer);
    await waitFor(() => expect(queryByText(calcTime(createdAt))).toBeFalsy());
  });
});
