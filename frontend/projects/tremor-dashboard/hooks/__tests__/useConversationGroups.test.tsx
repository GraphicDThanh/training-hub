import { renderHook, waitFor } from "@testing-library/react";

import { useConversationGroups } from "../useConversationGroups";

import {
  MOCK_USERS,
  mockOnSnapshot,
  renderGroupData,
  mockUseSession,
} from "@/mocks";

jest.mock("firebase/firestore");
jest.mock("@/context/session");

const mockAdminUser = MOCK_USERS[0];
const mockNormalUser = MOCK_USERS[1];

beforeEach(() => {
  const mockJson = jest.fn().mockReturnValue(Promise.resolve(mockAdminUser));
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
    mockUseSession();
    mockOnSnapshot(renderGroupData);
    const { result } = renderHook(() => useConversationGroups());
    await waitFor(() => expect(result.current.groups).toHaveLength(0));
  });

  it("Should return empty when user yet has conversation", async () => {
    mockUseSession(mockAdminUser);
    mockOnSnapshot();
    const { result } = renderHook(() => useConversationGroups());
    await waitFor(() => expect(result.current.groups).toHaveLength(0));
  });

  it("Should only return one group when user is normal user", async () => {
    mockUseSession(mockNormalUser);
    mockOnSnapshot(renderGroupData);
    const { result } = renderHook(() => useConversationGroups());
    await waitFor(() => expect(result.current.groups).toHaveLength(1));
  });

  it("Should return all groups when user is admin and has conversation", async () => {
    mockUseSession(mockAdminUser);
    mockOnSnapshot(renderGroupData);

    const { result } = renderHook(() => useConversationGroups());
    await waitFor(() => expect(result.current.groups).toHaveLength(4));
  });
});
