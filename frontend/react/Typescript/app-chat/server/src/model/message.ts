import { User } from '.';

export interface Message {
  author: User;
  content: string;
  id: string;
}