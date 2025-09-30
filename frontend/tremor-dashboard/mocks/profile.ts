// Types
import { Conversation } from "@/types";

// Constants
import { ADMIN_ID, AVATAR_IMAGE } from "@/constants";

import { MOCK_USERS } from "./users";

import { ConversationGroupExtend } from "@/hooks/useConversationGroups";

export const PROFILE_HEADER = {
  avatarUrl: AVATAR_IMAGE.LG,
  alt: "image",
  name: "Richard Davis",
  role: 1,
};

export const PROFILE_ITEM = {
  id: "1",
  avatar: AVATAR_IMAGE.MD,
  name: "Sophie.B",
  lastConversation: "Hi! I need more information..",
};

const mockCreatedAt = new Date("2024-03-12T00:00:00.000Z").toISOString();

export const PROFILE_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    message: "Awesome work, can you..",
    userId: 123,
    createdAt: mockCreatedAt,
  },
  {
    id: "2",
    message: "About files I can..",
    userId: 123,
    createdAt: mockCreatedAt,
  },
  {
    id: "3",
    message: "Have a great afternoon..",
    userId: 124,
    createdAt: mockCreatedAt,
  },
  {
    id: "4",
    message: "Hi! I need more information..",
    userId: 124,
    createdAt: mockCreatedAt,
  },
  {
    id: "5",
    message: "Hi! I need more information..",
    userId: 123,
    createdAt: mockCreatedAt,
  },
];

export const PROFILE_INFO = {
  description:
    "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)",
  info: [
    {
      key: "Full Name",
      value: "Alec M. Thompson",
    },
    {
      key: "Mobile",
      value: "(44) 123 1234 123",
    },
    {
      key: "Email",
      value: "alecthompson@mail.com",
    },
    {
      key: "Location",
      value: "USA",
    },
  ],
};

export const ACCOUNT_SETTINGS = {
  emailMentions: true,
  emailFollowing: true,
  emailAnswerPost: false,
};

export const APP_SETTINGS = {
  newLaunchesProject: false,
  monthlyProductUpdate: true,
  subscribeToNewsletter: false,
};

export const CONVERSATIONS = [
  {
    id: "1",
    name: "Sophie B.",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/kal-visuals-square.ed295c0d.jpg",
    lastConversation: "Hi! I need more information.",
  },
  {
    id: "2",
    name: "Anne Marie",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
    lastConversation: "Awesome work, can you.",
  },
  {
    id: "3",
    name: "Ivanna",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/ivana-square.10cb0e1f.jpg",
    lastConversation: "About files I can..",
  },
  {
    id: "4",
    name: "Peterson",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/team-4.f9d98090.jpg",
    lastConversation: "Have a great afternoon..",
  },
  {
    id: "5",
    name: "Nick Daniel",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/team-4.f9d98090.jpg",
    lastConversation: "Hi! I need more information..",
  },
];

export const MOCKS_CHAT_BOX: Conversation[] = [
  {
    message: "Hello Admin",
    createdAt: mockCreatedAt,
    userId: 324,
    id: "message_1",
  },
  {
    message: "Hi User",
    createdAt: mockCreatedAt,
    userId: ADMIN_ID,
    id: "message_2",
  },
  {
    message: "Can I help you?",
    createdAt: mockCreatedAt,
    userId: ADMIN_ID,
    id: "message_3",
  },
  {
    message: "Currently, I don't create new user",
    createdAt: mockCreatedAt,
    userId: 324,
    id: "message_4",
  },
  {
    message: "Please let me know the error",
    createdAt: mockCreatedAt,
    userId: ADMIN_ID,
    id: "message_5",
  },
  {
    message: "Not found account",
    createdAt: mockCreatedAt,
    userId: 324,
    id: "message_6",
  },
  {
    message: "And",
    createdAt: mockCreatedAt,
    userId: 324,
    id: "message_7",
  },
  {
    message: "Not Found 404",
    createdAt: mockCreatedAt,
    userId: 324,
    id: "message_8",
  },
  {
    message: "Yes. I will check it now",
    createdAt: mockCreatedAt,
    userId: ADMIN_ID,
    id: "message_9",
  },
  {
    message: "Thanks",
    createdAt: mockCreatedAt,
    userId: 324,
    id: "message_10",
  },
];

const mockFirstConversationUser = MOCK_USERS[0];
const mockSecondConversationUser = MOCK_USERS[1];

export const MOCKS_CONVERSATION_GROUP: ConversationGroupExtend[] = [
  {
    conversationUser: mockSecondConversationUser,
    id: "11",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
  {
    conversationUser: mockSecondConversationUser,
    id: "12",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
  {
    conversationUser: mockSecondConversationUser,
    id: "13",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
  {
    conversationUser: mockSecondConversationUser,
    id: "14",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
  {
    conversationUser: mockFirstConversationUser,
    id: "15",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
  {
    conversationUser: mockFirstConversationUser,
    id: "16",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
  {
    conversationUser: mockSecondConversationUser,
    id: "17",
    lastConversation: "Yes. I will check it now",
    userIds: [mockSecondConversationUser.id, mockFirstConversationUser.id],
  },
];
