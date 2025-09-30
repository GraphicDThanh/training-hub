"use client";

import dynamic from "next/dynamic";

import LoadingPage from "@/components/Loading/LoadingPage/LoadingPage";
const UserConversationHistory = dynamic(
  () =>
    import(
      "@/features/profile/ConversationHistory/UserConversationHistory/UserConversationHistory"
    ),
);

import { useConversation } from "@/context/conversation";
import { useConversationGroups } from "@/hooks/useConversationGroups";

const ConversationHistory = () => {
  const { groups, isLoading } = useConversationGroups();
  const { onOpenConversationModal } = useConversation();

  return (
    <>
      <h3 className="text-tremor-title dark:text-dark-tremor-content-title leading-relaxed font-bold tracking-[0.0075em] opacity-100 capitalize no-underline text-primary py-4">
        Conversations
      </h3>

      {isLoading ? (
        <div className="h-[280px] flex items-center">
          <LoadingPage width={10} height={10} />
        </div>
      ) : (
        <ul className="h-[280px] overflow-auto">
          {groups.map(group => (
            <UserConversationHistory
              key={group.id}
              {...group}
              onOpenConversationModal={onOpenConversationModal}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ConversationHistory;
