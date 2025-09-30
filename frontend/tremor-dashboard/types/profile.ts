import { USER_ROLE } from "./user";

export interface Conversation {
  id: string;
  message: string;
  createdAt: string;
  userId: number;
}

export interface ConversationGroup {
  id: string;
  lastConversation?: string;
  userIds: number[];
}

export interface PlatformSetting {
  label: string;
  field: string;
}

export interface AccountSettingData {
  [key: string]: boolean;
  emailMentions: boolean;
  emailFollowing: boolean;
  emailAnswerPost: boolean;
}

export interface ApplicationSettingData {
  [key: string]: boolean;
  newLaunchesProject: boolean;
  monthlyProductUpdate: boolean;
  subscribeToNewsletter: boolean;
}

export interface SocialLink {
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface UserProfile {
  id: number;
  created_at: string;
  name: string;
  role: USER_ROLE;
  information: string;
  account_setting: AccountSettingData;
  application_setting: ApplicationSettingData;
  phone: string;
  email: string;
  location: string;
  conversations: Conversation[];
  socials: SocialLink;
  avatar: string;
}

export interface Message {
  message: string;
}

export interface ChatBox extends Message {
  userId: number;
  messageId: string;
  time: string;
  avatar: string;
}
