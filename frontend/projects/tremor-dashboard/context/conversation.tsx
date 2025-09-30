"use client";

import dynamic from "next/dynamic";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { VARIANT_BUTTON } from "@/constants/common";
import { ADMIN_ID } from "@/constants/conversation";

import Button from "@/components/Button/Button";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const ChatMessageModal = dynamic(
  () =>
    import("@/features/profile/ChatMessage/ChatMessageModal/ChatMessageModal"),
);

import { useSession } from "./session";
import { ConversationGroupExtend } from "@/hooks/useConversationGroups";

import { USER_ROLE } from "@/types";

import {
  createGroupChat,
  getConversationGroupById,
  getConversationGroupByUserId,
  getLatestConversationGroup,
  handleChat,
} from "@/services";

interface IConversationContext {
  onOpenConversationModal: (groupId?: string) => void;
  group: ConversationGroupExtend;
  setGroup: Dispatch<SetStateAction<ConversationGroupExtend>>;
}

const initialContext: IConversationContext = {
  onOpenConversationModal: () => {},
  setGroup: () => {},
  group: {} as ConversationGroupExtend,
};

const ConversationContext = createContext<IConversationContext>(initialContext);

const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [group, setGroup] = useState<ConversationGroupExtend>(
    initialContext.group,
  );
  const [isShowConversationModal, setIsShowConversationModal] = useState(false);

  const { user: currentUser } = useSession();

  const { id: currentUserId, role = USER_ROLE.NORMAL } = currentUser || {};

  useEffect(() => {
    if (!currentUserId) return;

    const getDefaultGroup = async () => {
      const group = await (role === USER_ROLE.NORMAL
        ? getConversationGroupByUserId
        : getLatestConversationGroup)(currentUserId);

      group && setGroup(group);
    };

    getDefaultGroup();
  }, [currentUserId, role]);

  const { id: currentGroupId } = group;

  const handleOpenConversationModal = useCallback(
    async (groupId?: string) => {
      if (!currentUserId) return;

      if (typeof groupId === "string") {
        let group: ConversationGroupExtend;

        if (currentGroupId !== groupId) {
          group = await getConversationGroupById(groupId, currentUserId);
          setGroup(group);
        }
      }

      setIsShowConversationModal(true);
    },
    [currentGroupId, currentUserId],
  );

  const handleHiddenConversationModal = useCallback(() => {
    setIsShowConversationModal(false);
  }, []);

  const handleChatMessage = useCallback(
    async (message: string) => {
      if (!currentUserId) return;

      // Normal User send for ADMIN
      // TODO: Update later when API get admin info ready
      if (!currentGroupId) {
        const groupId = await createGroupChat(
          [currentUserId, ADMIN_ID],
          message,
        );
        const group = await getConversationGroupById(groupId, currentUserId);
        setGroup(group);
        return;
      }

      await handleChat(message, currentGroupId);
    },
    [currentUserId, currentGroupId],
  );

  const values: IConversationContext = useMemo(
    () => ({
      onOpenConversationModal: handleOpenConversationModal,
      group,
      setGroup,
    }),
    [group, handleOpenConversationModal],
  );

  const { name, avatar } = group?.conversationUser || {};

  return (
    <ConversationContext.Provider value={values}>
      {children}
      {!isShowConversationModal && (
        <div className="fixed z-50 chat-message-icon print:hidden">
          <Button
            variant={VARIANT_BUTTON.SECONDARY}
            data-testid="conversation-btn"
            additionalClass="bg-white border-0 p-4 hover:bg-white dark:bg-dark-tremor-primary dark:hover:bg-dark-tremor-primary hover:opacity-1"
            onClick={handleOpenConversationModal}
            aria-label="Conversation Button">
            <IoChatbubbleEllipsesSharp className="text-xl text-primary dark:text-white" />
          </Button>
        </div>
      )}
      {isShowConversationModal && (
        <ChatMessageModal
          name={name}
          avatar={avatar}
          onClose={handleHiddenConversationModal}
          onSendMessage={handleChatMessage}
        />
      )}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;

export const useConversation = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "useConversation hooks should using inside ConversationProvider!",
    );
  }

  return context;
};
