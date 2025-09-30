import { renderHook, waitFor, act } from "@testing-library/react";

import { useConversationChats } from "../useConversationChats";

import {
  MOCKS_CONVERSATION_GROUP,
  MOCK_USERS,
  mockGetDoc,
  mockGetDocs,
  mockUseConversation,
  mockUseSession,
  mockOnSnapshot,
  renderChatData,
  renderGroupData,
} from "@/mocks";

jest.mock("firebase/firestore");
jest.mock("@/context/session");
jest.mock("@/context/conversation");

const mockNormalUser = MOCK_USERS[1];
const mockAdminUser = MOCK_USERS[0];
const mockUseConversationGroup = MOCKS_CONVERSATION_GROUP[0];

beforeEach(() => {
  const mockJson = jest
    .fn()
    .mockReturnValue(Promise.resolve(MOCKS_CONVERSATION_GROUP[0]));
  const mockFetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: mockJson,
      ok: true,
    }),
  );

  global.fetch = mockFetch;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useConversationChats Tests", () => {
  it("Should return empty when not found user", async () => {
    mockUseConversation();
    mockUseSession();
    const { result } = renderHook(() => useConversationChats());
    await waitFor(() => expect(result.current.chats).toHaveLength(0));
  });

  it("Should return empty when currentUser is normal User and yet start conversation with admin", async () => {
    mockUseSession({
      ...mockNormalUser,
      id: 999, // new user
    });
    mockUseConversation();
    mockGetDocs(renderGroupData);
    mockOnSnapshot(renderChatData);

    const { result } = renderHook(() => useConversationChats());
    await waitFor(() => expect(result.current.chats).toHaveLength(0));
  });

  it("Should return all chats when user is normal user and has conversation ", async () => {
    mockUseSession(mockNormalUser);
    mockUseConversation(mockUseConversationGroup);
    mockGetDoc(renderGroupData);
    mockGetDocs(renderGroupData);
    mockOnSnapshot(renderChatData);

    const { result } = renderHook(() => useConversationChats());

    expect(result.current.isLoading).toEqual(true);
    await act(() => {
      expect(result.current.chats).toHaveLength(3);
      waitFor(() => expect(result.current.isLoading).toEqual(false));
    });
  });

  it("Should return all chats when user is admin", async () => {
    mockUseSession(mockAdminUser);
    mockUseConversation(mockUseConversationGroup);
    mockGetDoc(renderGroupData);
    mockGetDocs(renderGroupData);
    mockOnSnapshot(renderChatData);

    const { result } = renderHook(() => useConversationChats());
    await act(() => {
      expect(result.current.chats).toHaveLength(3);
    });
  });

  it("Should return all chats when user is admin and have conversation", async () => {
    mockUseSession(mockAdminUser);
    mockUseConversation(mockUseConversationGroup);
    mockGetDoc(renderGroupData);
    mockGetDocs(renderGroupData);
    mockOnSnapshot(renderChatData);

    const { result } = renderHook(() => useConversationChats());
    await act(() => {
      expect(result.current.chats).toHaveLength(3);
    });
  });

  it("Should return all chats when user is admin and yet have conversation", async () => {
    mockUseSession(mockAdminUser);
    mockUseConversation();
    mockGetDoc(renderGroupData);
    mockGetDocs(renderGroupData);
    mockOnSnapshot(renderChatData);

    const { result } = renderHook(() => useConversationChats());
    await act(() => {
      expect(result.current.chats).toHaveLength(0);
    });
  });
});
