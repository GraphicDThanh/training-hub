import {
  DocumentChange,
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Conversation } from "@/types";

import {
  CONVERSATION_ORDERS,
  CONVERSATION_STATUS,
  CONVERSATION_TABLES,
  DOCUMENT_CHANGE_TYPE,
  DIRECTION,
} from "@/constants";

import { db } from "@/config/firebase.config";
import { debounce } from "@/helpers";

import { useConversation } from "@/context/conversation";

const { GROUPS, CHATS } = CONVERSATION_TABLES;

const { FETCHED, INITIAL } = CONVERSATION_STATUS;
const { CREATED_AT } = CONVERSATION_ORDERS;

export const useConversationChats = () => {
  const [chats, setChats] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { group } = useConversation();
  const [status, setStatus] = useState<CONVERSATION_STATUS>(INITIAL);

  const { id: groupId } = group;

  useEffect(() => {
    if (groupId) {
      const queryRef = query(
        collection(db, GROUPS, groupId, CHATS),
        orderBy(CREATED_AT, DIRECTION.ASC),
      );

      const handleMapDocChanges = async (
        docChange: DocumentChange<DocumentData, DocumentData>,
      ) => {
        let newMessage: Conversation;

        switch (docChange.type) {
          case DOCUMENT_CHANGE_TYPE.ADDED:
            if (status === INITIAL) setIsLoading(true);

            newMessage = {
              ...docChange.doc.data(),
              id: docChange.doc.id,
            } as Conversation;

            setChats(prev => [...prev, newMessage]);
            break;

          default:
            break;
        }

        debounce(() => {
          setIsLoading(false);
          setStatus(FETCHED);
        })();
      };

      const unConversationSub = onSnapshot(queryRef, snapshot => {
        snapshot.docChanges().map(handleMapDocChanges);
      });

      return () => {
        unConversationSub();
      };
    }

    debounce(() => {
      setIsLoading(false);
      setStatus(FETCHED);
    })();
  }, [groupId]);

  return { chats, isLoading: isLoading && status === INITIAL, setChats };
};
