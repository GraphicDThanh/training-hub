"use server";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { cookies } from "next/headers";

import { db } from "@/config/firebase.config";

import {
  ADMIN_ID,
  CONVERSATION_ORDERS,
  CONVERSATION_QUERYS,
  CONVERSATION_TABLES,
  DIRECTION,
  UID_KEY,
  WHERE_FILTER_OP,
} from "@/constants";

import { ConversationGroupExtend } from "@/hooks/useConversationGroups";

import { getUserById } from "./user";

const { GROUPS, CHATS } = CONVERSATION_TABLES;
const { USER_IDS } = CONVERSATION_QUERYS;
const { UPDATED_AT } = CONVERSATION_ORDERS;

export async function createGroupChat(userIds: number[], message: string) {
  const docRef = await addDoc(collection(db, GROUPS), {
    userIds,
    updatedAt: new Date().toISOString(),
    lastConversation: message,
  });

  await addDoc(collection(db, GROUPS, docRef.id, CHATS), {
    // current user always is first items
    userId: userIds[0],
    createdAt: new Date().toISOString(),
    message,
  });

  return docRef.id;
}

export async function handleChat(message: string, groupId: string) {
  const userId = parseInt(cookies().get(UID_KEY)?.value ?? "", 10);

  await addDoc(collection(db, GROUPS, groupId, CHATS), {
    message,
    userId,
    createdAt: new Date().toISOString(),
  });

  await updateDoc(doc(db, GROUPS, groupId), {
    updatedAt: new Date().toISOString(),
    lastConversation: message,
  });
}

/**
 *
 * @param groupId: string
 * @param userId: number
 * @returns Promise<ConversationGroupExtend>
 */
export const getConversationGroupById = async (
  groupId: string,
  userId: number,
): Promise<ConversationGroupExtend> => {
  const snapshot = await getDoc(doc(db, GROUPS, groupId));

  const group = { id: groupId, ...snapshot.data() } as ConversationGroupExtend;
  const [conversationUserId] = group.userIds.filter(id => id !== userId);

  const conversationUser = await getUserById(conversationUserId);

  return {
    ...group,
    conversationUser,
  };
};

export const getConversationGroupByUserId = async (
  userId: number,
): Promise<ConversationGroupExtend> => {
  const queryRef = query(
    collection(db, GROUPS),
    where(USER_IDS, WHERE_FILTER_OP.ARRAY_CONTAINS, userId),
    limit(1),
  );

  const snapshot = await getDocs(queryRef);
  const doc = snapshot.docs[0];

  const conversationUser = await getUserById(ADMIN_ID);

  return {
    conversationUser,
    ...(doc && { id: doc.id, ...doc.data() }),
  } as ConversationGroupExtend;
};

export const getLatestConversationGroup = async (
  userId: number,
): Promise<ConversationGroupExtend | null> => {
  const queryRef = query(
    collection(db, GROUPS),
    where(USER_IDS, WHERE_FILTER_OP.ARRAY_CONTAINS, userId),
    orderBy(UPDATED_AT, DIRECTION.DESC),
    limit(1),
  );

  const snapshot = await getDocs(queryRef);
  const doc = snapshot.docs[0];

  if (!doc) return null;

  const group = doc.data() as ConversationGroupExtend;
  const conversationUserId = group.userIds.find(id => id !== userId)!;
  const conversationUser = await getUserById(conversationUserId);

  return {
    conversationUser,
    id: doc.id,
    ...doc.data(),
  } as ConversationGroupExtend;
};
