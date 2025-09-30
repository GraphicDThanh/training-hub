// Libs
import { fireEvent, render, waitFor, act } from "@testing-library/react";
import dynamic from "next/dynamic";
import React from "react";

// Hooks
import * as ConversationGroups from "@/hooks/useConversationGroups";

// Components
const ConversationHistory = dynamic(
  () => import("@/features/profile/ConversationHistory/ConversationHistory"),
);

// Contexts
import ConversationProvider from "@/context/conversation";

// Mocks
import {
  MOCK_USERS,
  mockUseSession,
  mockOnSnapshot,
  renderGroupData,
  MOCKS_CONVERSATION_GROUP,
} from "@/mocks";

const mockedGetConversationGroupByUserId = jest.fn();
const mockGetLatestConversationGroup = jest.fn();
const mockSentChat = jest.fn();
const mockCreateGroupChat = jest.fn();
const mockGetConversationGroupById = jest.fn();

mockedGetConversationGroupByUserId.mockImplementation(() =>
  Promise.resolve({
    id: "2",
  }),
);

mockSentChat.mockImplementation(() =>
  Promise.resolve({
    message: "abc",
  }),
);

mockCreateGroupChat.mockImplementation(() =>
  Promise.resolve({
    message: "abc",
  }),
);

jest.mock("firebase/firestore");
jest.mock("@/context/session");
jest.mock("@/hooks/useConversationGroups");

const mockAdminUser = MOCK_USERS[0];
const mockNormalUser = MOCK_USERS[1];

jest.mock("@/services", () => ({
  getLatestConversationGroup: () => mockGetLatestConversationGroup(),
  getConversationGroupByUserId: () => mockedGetConversationGroupByUserId(),
  handleChat: () => mockSentChat(),
  createGroupChat: () => mockCreateGroupChat(),
  getConversationGroupById: () => mockGetConversationGroupById(),
}));

const Child = () => {
  return <div>Child</div>;
};

const setup = () =>
  render(
    <ConversationProvider>
      <Child />
    </ConversationProvider>,
  );

const setupUserConversationHistory = () =>
  render(
    <ConversationProvider>
      <ConversationHistory />
    </ConversationProvider>,
  );

describe("Conversation Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should show Conversation modal when click Conversation Button with admin user", async () => {
    mockGetConversationGroupById.mockImplementation(() =>
      Promise.resolve({
        conversationUser: {
          id: 138,
          name: "Admin Tremor",
          email: "admin@tremor.com",
          pinCode: 111111,
          gender: 0,
        },
        id: "hLc5LDptpaILlakG8TXt",
        lastConversation: "I am an user not admin.",
        updatedAt: "2024-07-10T09:40:53.137Z",
        userIds: [596, 138],
      }),
    );
    mockUseSession(mockAdminUser);
    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    expect(modal).toBeTruthy();
    expect(modal).toMatchSnapshot();
  });

  it("Should show Conversation modal when click Conversation Button with normal user", async () => {
    mockUseSession(mockNormalUser);
    mockOnSnapshot(renderGroupData);
    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    fireEvent.click(conversationBtn);

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    const btnClose = queryByTestId("conversation-close-btn");

    expect(modal).toBeTruthy();
    expect(btnClose).toBeTruthy();
  });

  it("Should close Conversation modal when Conversation modal showed and click Conversation Close Button", async () => {
    mockUseSession(mockAdminUser);
    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    const conversationCloseBtn = queryByTestId("conversation-close-btn");
    expect(modal).toBeTruthy();
    expect(conversationCloseBtn).toBeTruthy();
    fireEvent.click(conversationCloseBtn);
    modal = await waitFor(() => queryByTestId("conversation-modal"));
    expect(modal).toBeFalsy();
  });

  it("Should sent chat conversation when Conversation modal showed and click Conversation Sent Button", async () => {
    mockUseSession(mockNormalUser);
    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    const conversationSentBtn = queryByTestId("conversation-sent-btn");
    expect(modal).toBeTruthy();
    const inputChat = getByTestId("chat-message-input");
    expect(inputChat).toBeTruthy();
    act(() => {
      fireEvent.change(inputChat, { target: { value: "abc" } });
    });
    await waitFor(() => {
      expect(inputChat.value).toContain("abc");
    });
    expect(conversationSentBtn).toBeTruthy();
    await act(() => {
      fireEvent.click(conversationSentBtn);
    });
    expect(mockSentChat).toHaveBeenCalled();
  });

  it("Should not sent chat conversation when Conversation modal showed and click Conversation Sent Button with currentGroupId is empty", async () => {
    mockedGetConversationGroupByUserId.mockImplementation(() =>
      Promise.resolve({
        id: "",
      }),
    );
    mockUseSession(mockNormalUser);

    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    const conversationSentBtn = queryByTestId("conversation-sent-btn");
    expect(modal).toBeTruthy();
    const inputChat = getByTestId("chat-message-input");
    expect(inputChat).toBeTruthy();
    act(() => {
      fireEvent.change(inputChat, { target: { value: "abc" } });
    });
    await waitFor(() => {
      expect(inputChat.value).toContain("abc");
    });
    expect(conversationSentBtn).toBeTruthy();
    await act(() => {
      fireEvent.click(conversationSentBtn);
    });
    expect(mockSentChat).not.toHaveBeenCalled();
  });

  it("Should show Conversation modal when click Conversation Reply Button on Conversation history of profile", async () => {
    jest
      .spyOn(ConversationGroups, "useConversationGroups")
      .mockImplementation(() => ({
        groups: [MOCKS_CONVERSATION_GROUP[0]],
        isLoading: false,
      }));

    const { queryByTestId } = setupUserConversationHistory();
    const conversationReplyBtn = await waitFor(() =>
      queryByTestId("conversation-reply-btn"),
    );
    expect(conversationReplyBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    await act(async () => {
      await fireEvent.click(conversationReplyBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    expect(modal).toBeTruthy();
  });

  it("Should not sent chat conversation when currentUserId is undefined", async () => {
    mockUseSession(mockNormalUser);

    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });
    mockUseSession({ id: undefined });
    modal = await waitFor(() => queryByTestId("conversation-modal"));
    const conversationSentBtn = queryByTestId("conversation-sent-btn");
    expect(modal).toBeTruthy();
    const inputChat = getByTestId("chat-message-input");
    expect(inputChat).toBeTruthy();

    act(() => {
      fireEvent.change(inputChat, { target: { value: "abc123" } });
    });
    await waitFor(() => {
      expect(inputChat.value).toContain("abc123");
    });
    expect(conversationSentBtn).toBeTruthy();

    await act(() => {
      fireEvent.click(conversationSentBtn);
    });
    expect(mockSentChat).not.toHaveBeenCalled();
  });

  it("Should throw an error if useContext is undefined", async () => {
    jest.spyOn(React, "useContext").mockImplementation(() => {
      undefined;
    });

    jest.spyOn(console, "error").mockImplementation(() => null);

    mockUseSession(mockNormalUser);
    const { queryByTestId } = setup();
    const conversationBtn = await waitFor(() =>
      queryByTestId("conversation-btn"),
    );
    expect(conversationBtn).toBeTruthy();

    expect(() => fireEvent.click(conversationBtn)).toThrow();
  });

  it("Should not show Conversation modal when currentUserId is undefined", async () => {
    mockUseSession({ id: undefined });
    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    expect(modal).toBeFalsy();
  });

  it("Should not show Conversation modal when currentUser is undefined", async () => {
    mockUseSession();
    const { getByTestId, queryByTestId } = setup();
    const conversationBtn = getByTestId("conversation-btn");
    expect(conversationBtn).toBeTruthy();

    let modal = queryByTestId("conversation-modal");
    expect(modal).toBeFalsy();

    act(() => {
      fireEvent.click(conversationBtn);
    });

    modal = await waitFor(() => queryByTestId("conversation-modal"));
    expect(modal).toBeFalsy();
  });
});
