"use client";

import { memo, useCallback } from "react";

// Components
import { Flex, Text } from "@tremor/react";
import Button from "@/components/Button/Button";
import Avatar from "@/components/Avatar/Avatar";

import { AVATAR_IMAGE } from "@/constants/images";

import { ConversationGroupExtend } from "@/hooks/useConversationGroups";

const UserConversationHistory = ({
  lastConversation,
  conversationUser,
  id,
  onOpenConversationModal,
}: ConversationGroupExtend & {
  onOpenConversationModal: (groupId: string) => void;
}) => {
  const { avatar, name } = conversationUser;

  const handleOpenConversation = useCallback(() => {
    onOpenConversationModal(id);
  }, [id, onOpenConversationModal]);

  return (
    <Flex className="mb-2 py-2 xs:flex-nowrap max-w-[100%]" as="li">
      <Flex
        justifyContent="start"
        className="w-[calc(100%-40px)] sm:w-[calc(100%-70px)]">
        <Avatar
          src={avatar ?? AVATAR_IMAGE.MD}
          width={48}
          height={48}
          className="w-[48px] h-[48px] min-w-[48px]"
          alt={name}
        />
        <div className="max-w-[calc(100%-40px)] sm:max-w-[calc(100%-70px)] font-medium dark:text-white pl-4">
          <Text className="text-sm text-primary dark:text-dark-primary font-semibold">
            {name}
          </Text>
          <Text className="text-xs text-tertiary font-light dark:text-dark-romance line-clamp-2 break-all">
            {lastConversation}
          </Text>
        </div>
      </Flex>
      <Button
        additionalClass="min-w-[64px] m-0 border-0 hover:bg-[none] bg-transparent dark:bg-transparent dark:hover:bg-[none] box-shadow-transparent"
        onClick={handleOpenConversation}
        data-testid="conversation-reply-btn">
        <Text className="text-primary text-xs text-center font-bold uppercase leading-[17px] tracking-wide">
          Reply
        </Text>
      </Button>
    </Flex>
  );
};

export default memo(UserConversationHistory);
