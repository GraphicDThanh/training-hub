// Mocks
import { MOCKS_CONVERSATION_GROUP, MOCK_USERS } from "@/mocks";

// Services
import {
  handleChat,
  createGroupChat,
  getConversationGroupById,
  getConversationGroupByUserId,
  getLatestConversationGroup,
} from "@/services";

// Constants
import { ADMIN_ID } from "@/constants";

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockReturnValue({
      value: 101,
    }),
  })),
}));

const mockedAddDoc = jest.fn();
const mockedGetDoc = jest.fn();
const mockedGetDocs = jest.fn();

mockedAddDoc.mockImplementation(() =>
  Promise.resolve({
    id: "1",
  }),
);

mockedGetDoc.mockImplementation(() =>
  Promise.resolve({
    data: jest.fn().mockReturnValue(MOCKS_CONVERSATION_GROUP[0]),
  }),
);

mockedGetDocs.mockImplementation(() =>
  Promise.resolve({
    docs: [
      {
        id: 1,
        data: jest.fn().mockReturnValue(MOCKS_CONVERSATION_GROUP[0]),
      },
    ],
  }),
);

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  addDoc: () => mockedAddDoc(),
  updateDoc: () => mockedAddDoc(),
  getDoc: () => mockedGetDoc(),
  getDocs: () => mockedGetDocs(),
}));

describe("conversation of services", () => {
  it("should call mockedAddDoc if createGroupChat called", async () => {
    const docRefId = await createGroupChat([1, 2], "Message test");
    expect(mockedAddDoc).toHaveBeenCalled();
    expect(docRefId).toEqual("1");
  });

  it("should call mockedAddDoc if handleChat called", async () => {
    await handleChat("Message test", "1");
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(mockedAddDoc).toHaveBeenCalled();
  });

  it("should call mockedAddDoc if handleChat called with UID_KEY value is undefined", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn(),
      }));

    await handleChat("Message test", "1");

    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(mockedAddDoc).toHaveBeenCalled();
  });

  it("should call mockedGetDoc if getConversationGroupById called", async () => {
    const conversationRes = await getConversationGroupById("1", ADMIN_ID);
    const { id, lastConversation, userIds } = conversationRes;
    expect(mockedGetDoc).toHaveBeenCalled();
    expect(id).toEqual(MOCKS_CONVERSATION_GROUP[0].id);
    expect(lastConversation).toEqual(
      MOCKS_CONVERSATION_GROUP[0].lastConversation,
    );
    expect(userIds).toEqual(MOCKS_CONVERSATION_GROUP[0].userIds);
  });

  it("should call mockedGetDocs if getConversationGroupByUserId called", async () => {
    const conversationRes = await getConversationGroupByUserId(ADMIN_ID);
    const { id, lastConversation, userIds, conversationUser } = conversationRes;
    expect(mockedGetDoc).toHaveBeenCalled();
    expect(id).toEqual(MOCKS_CONVERSATION_GROUP[0].id);
    expect(lastConversation).toEqual(
      MOCKS_CONVERSATION_GROUP[0].lastConversation,
    );
    expect(userIds).toEqual(MOCKS_CONVERSATION_GROUP[0].userIds);
    expect(conversationUser).toEqual(MOCK_USERS[1]);
  });

  it("should call mockedGetDocs if getLatestConversationGroup called", async () => {
    const conversationRes = await getLatestConversationGroup(1);
    const { id, lastConversation, userIds, conversationUser } = conversationRes;
    expect(mockedGetDoc).toHaveBeenCalled();
    expect(id).toEqual(MOCKS_CONVERSATION_GROUP[0].id);
    expect(lastConversation).toEqual(
      MOCKS_CONVERSATION_GROUP[0].lastConversation,
    );
    expect(userIds).toEqual(MOCKS_CONVERSATION_GROUP[0].userIds);
    expect(conversationUser).toEqual(MOCK_USERS[1]);
  });

  it("should call mockedGetDocs with empty docs if getLatestConversationGroup called", async () => {
    mockedGetDocs.mockImplementation(() =>
      Promise.resolve({
        docs: [],
      }),
    );
    const conversationRes = await getLatestConversationGroup(1);
    expect(mockedGetDocs).toHaveBeenCalled();
    expect(conversationRes).toEqual(null);
  });
});
