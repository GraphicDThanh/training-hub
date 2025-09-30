import { PlatformSetting } from "@/types";

export const SETTING_FIELDS_ACCOUNT: PlatformSetting[] = [
  { label: "Email me when someone follows me", field: "emailMentions" },
  {
    label: "Email me when someone answers on my post",
    field: "emailFollowing",
  },
  { label: "Email me when someone mentions me", field: "emailAnswerPost" },
];

export const SETTING_FIELDS_APPLICATION: PlatformSetting[] = [
  { label: "New launches and projects", field: "newLaunchesProject" },
  { label: "Monthly product updates", field: "monthlyProductUpdate" },
  { label: "Subscribe to newsletter", field: "subscribeToNewsletter" },
];

export const SETTING_DATA_ACCOUNT = {
  emailMentions: false,
  emailFollowing: false,
  emailAnswerPost: false,
};

export const SETTING_DATA_APPLICATION = {
  newLaunchesProject: false,
  monthlyProductUpdate: false,
  subscribeToNewsletter: false,
};

// Social links
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://instagram.com",
};
