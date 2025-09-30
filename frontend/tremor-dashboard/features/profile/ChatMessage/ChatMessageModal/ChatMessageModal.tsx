"use client";

import { memo } from "react";

// Hooks
import { useConversationChats } from "@/hooks/useConversationChats";

// Constants
import { AVATAR_IMAGE, VARIANT_BUTTON } from "@/constants";

// Context
import { useSession } from "@/context/session";

// Icons
import { MdOutlineClose } from "react-icons/md";

// Components
import { Flex, Title } from "@tremor/react";
import ChatMessages from "../ChatMessages/ChatMessages";
import { Avatar, Button, LoadingPage as Loading } from "@/components";
import ChatMessageForm from "../ChatMessageForm/ChatMessageForm";

interface IChatMessageModal {
  onClose: () => void;
  onSendMessage: (message: string) => Promise<void>;
  name?: string;
  avatar?: string;
}

const ChatMessageModal = ({
  onClose,
  onSendMessage,
  avatar = AVATAR_IMAGE.MD,
  name = "User",
}: IChatMessageModal) => {
  const { user: currentUser } = useSession();
  const { chats, isLoading } = useConversationChats();

  const currentUserId = currentUser?.id!;

  return (
    <div
      className="fixed bottom-[70px] right-10 sm:right-[70px] rounded-tremor-default overflow-auto z-50 w-[300px] sm:w-[400px] shadow-tremor-chat"
      data-testid="conversation-modal">
      <div>
        <Flex alignItems="center" className="bg-primary p-3">
          <div className="flex gap-3 items-center">
            <Avatar
              src={avatar}
              width={24}
              height={24}
              alt={name}
              className="shadow-md w-[24px] h-[24px] min-w-[24px]"
            />
            <Title className="text-white">{name}</Title>
          </div>
          <Button
            variant={VARIANT_BUTTON.SECONDARY}
            additionalClass="bg-transparent border-0 p-0 dark:bg-transparent dark:hover:bg-transparent"
            onClick={onClose}
            data-testid="conversation-close-btn">
            <MdOutlineClose className="text-white text-xl" />
          </Button>
        </Flex>
        <div className="h-[400px] sm:h-[500px] bg-white">
          {isLoading ? (
            <div className="flex items-center h-full">
              <Loading height={8} width={8} />
            </div>
          ) : (
            <ChatMessages
              avatar={avatar}
              chats={chats}
              currentUserId={currentUserId}
              name={name}
            />
          )}
        </div>
        <ChatMessageForm onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default memo(ChatMessageModal);
