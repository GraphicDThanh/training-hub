import {
  DocumentChange,
  DocumentData,
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase.config";

import {
  CONVERSATION_ORDERS,
  CONVERSATION_QUERYS,
  CONVERSATION_STATUS,
  CONVERSATION_TABLES,
  ADMIN_ID,
  WHERE_FILTER_OP,
  DIRECTION,
  DOCUMENT_CHANGE_TYPE,
} from "@/constants";

import { useSession } from "@/context/session";

import { getUserById } from "@/services";

import { ConversationGroup, USER_ROLE, User } from "@/types";

import { debounce } from "@/helpers";

const { FETCHED, INITIAL } = CONVERSATION_STATUS;

export interface ConversationGroupExtend extends ConversationGroup {
  conversationUser: User;
}

export const useConversationGroups = () => {
  const [groups, setGroups] = useState<ConversationGroupExtend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<CONVERSATION_STATUS>(INITIAL);

  const { user: currentUser } = useSession();

  useEffect(() => {
    if (currentUser) {
      const { id: userId, role } = currentUser;

      const queryRef = query(
        collection(db, CONVERSATION_TABLES.GROUPS),
        where(
          CONVERSATION_QUERYS.USER_IDS,
          WHERE_FILTER_OP.ARRAY_CONTAINS,
          userId,
        ),
        orderBy(CONVERSATION_ORDERS.UPDATED_AT, DIRECTION.DESC),
      );

      if (role === USER_ROLE.ADMIN) {
        const handleDocChange = async (
          docChange: DocumentChange<DocumentData, DocumentData>,
        ) => {
          let group: ConversationGroupExtend,
            conversationUser: User,
            restUserId;

          const { doc, type, newIndex } = docChange;

          switch (type) {
            case DOCUMENT_CHANGE_TYPE.ADDED:
              if (status === INITIAL) setIsLoading(true);

              group = doc.data() as ConversationGroupExtend;
              restUserId = group.userIds.find(id => id !== userId)!;

              conversationUser = await getUserById(restUserId);

              setGroups(prev => {
                const clone = [...prev];
                const newGroup = { ...group, id: doc.id, conversationUser };

                if (newIndex === 0) clone.unshift(newGroup);
                else clone.push(newGroup);

                return clone;
              });

              break;

            case DOCUMENT_CHANGE_TYPE.MODIFIED:
              setGroups(prev => {
                const clone = [...prev];

                const modifiedGroupIndex = clone.findIndex(
                  ({ id }) => id === doc.id,
                )!;

                const modifiedGroup = prev[modifiedGroupIndex] ?? {};

                Object.assign(modifiedGroup, {
                  ...modifiedGroup,
                  ...(doc.data() as ConversationGroupExtend),
                });

                return [
                  modifiedGroup,
                  ...clone.filter(({ id }) => id !== doc.id),
                ];
              });
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
          snapshot.docChanges().map(handleDocChange);
        });

        return () => {
          unConversationSub();
        };
      }

      const handleMapDocChanges = async (
        snapshot: QuerySnapshot<DocumentData, DocumentData>,
      ) => {
        if (status === INITIAL) setIsLoading(true);

        // TODO: Update later when API get admin info ready
        const userAdmin = await getUserById(ADMIN_ID);

        const doc = snapshot.docs[0];

        if (status === INITIAL)
          debounce(() => {
            setIsLoading(false);
            setStatus(FETCHED);
          })();

        setGroups(prev => {
          const clone = [...prev];
          const group = clone[0] || { conversationUser: userAdmin };
          Object.assign(group, { ...group, id: doc?.id, ...doc?.data() });
          return [group];
        });
      };

      const unSub = onSnapshot(queryRef, handleMapDocChanges);

      return () => {
        unSub();
      };
    }
  }, [currentUser]);

  return {
    groups,
    isLoading: isLoading && status === CONVERSATION_STATUS.INITIAL,
  };
};
