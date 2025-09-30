export type User = {
  id: string;
  name: string;
  avatar?: string;
  isCurrent?: boolean;
}

export type Message = {
  id: string;
  author: User;
  content: string;
}

export type StoreState = {
  messages: Message[];
  users: User[];
  loading: string[];
  error: object;
  modal: any;
  auth: any;
};

export type Action = {
  type: string;
}

export type Account = {
  email: string;
  password: string;
}