"use client";

import { memo, useEffect, useRef, useState } from "react";

// Types
import { Conversation } from "@/types";

// Helpers
import { calcTime } from "@/helpers";

// Components
import { Avatar } from "@/components";
import { Flex, Text } from "@tremor/react";

interface IChatMessages {
  currentUserId: number;
  name: string;
  avatar: string;
  chats: Conversation[];
}

const ChatMessages = ({
  currentUserId: userId,
  name,
  avatar,
  chats,
}: IChatMessages) => {
  const chatRef = useRef<HTMLUListElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <ul ref={chatRef} className="h-full overflow-auto pt-3" tabIndex={0}>
      {chats.map((messageItem, index) => {
        const {
          message,
          createdAt,
          userId: prevUserId,
          id: messageId,
        } = messageItem;
        const { userId: currentUserId } = chats[index - 1] ?? {
          userId,
        };
        const showAvatar =
          prevUserId !== userId && prevUserId !== currentUserId;
        const currentTimeFormatter = calcTime(createdAt);
        const mappingColorByUser =
          prevUserId !== userId
            ? "bg-greyish text-primary dark:text-primary dark:bg-greyish"
            : "bg-primary text-white";

        const handleShowDateMessage = () => {
          setSelectedIndex(prev => (prev !== index ? index : -1));
        };

        return (
          <li key={messageId} className="flex flex-col gap-2" role="listitem">
            {selectedIndex === index && (
              <Text className="text-xs text-center dark:text-primary pb-0.5">
                {currentTimeFormatter}
              </Text>
            )}

            <Flex
              key={messageId}
              alignItems="center"
              justifyContent="start"
              flexDirection={prevUserId !== userId ? "row" : "row-reverse"}
              className="p-3 pt-0 gap-3">
              {showAvatar && (
                <Avatar
                  src={avatar}
                  width={24}
                  height={24}
                  alt={name}
                  className="w-[24px] h-[24px] min-w-[24px]"
                />
              )}
              <div className="cursor-pointer" onClick={handleShowDateMessage}>
                <Text
                  className={`max-w-48 sm:max-w-60 p-3 rounded-3xl break-all ${mappingColorByUser} ${
                    prevUserId === currentUserId ? "ml-8" : "ml-0"
                  }`}>
                  {message}
                </Text>
              </div>
            </Flex>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(ChatMessages);
