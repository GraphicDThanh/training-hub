import * as ConversationContext from "@/context/conversation";
import { ConversationGroupExtend } from "@/hooks/useConversationGroups";

import { MOCKS_CHAT_BOX, MOCKS_CONVERSATION_GROUP } from "@/mocks";

const renderMockId = () => Math.floor(Math.random() * 100000000).toString();

export const renderChatData = () => ({
  data: () => MOCKS_CHAT_BOX[Math.abs(Math.floor(Math.random() * 10) - 5)],
  id: renderMockId(),
  exists: () => true,
});

export const renderGroupData = () => ({
  data: () =>
    MOCKS_CONVERSATION_GROUP[Math.abs(Math.floor(Math.random() * 10) - 5)],
  id: renderMockId(),
  exists: () => true,
});

export const mockUseConversation = (group = {} as ConversationGroupExtend) => {
  jest.spyOn(ConversationContext, "useConversation").mockImplementation(() => ({
    onOpenConversationModal: () => {},
    setGroup: () => {},
    group,
  }));
};
