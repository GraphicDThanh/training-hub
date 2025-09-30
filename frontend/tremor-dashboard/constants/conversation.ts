export const CONVERSATION_TABLES = {
  GROUPS: "groups",
  CHATS: "chats",
};

export const CONVERSATION_ORDERS = {
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
};

export const CONVERSATION_QUERYS = {
  USER_IDS: "userIds",
};

export enum CONVERSATION_STATUS {
  INITIAL = "initial",
  FETCHED = "fetched",
}

export const ADMIN_ID = parseInt(process.env.NEXT_PUBLIC_ADMIN_ID!);

export enum DOCUMENT_CHANGE_TYPE {
  ADDED = "added",
  MODIFIED = "modified",
  REMOVED = "removed",
}

export enum WHERE_FILTER_OP {
  ARRAY_CONTAINS = "array-contains",
}
