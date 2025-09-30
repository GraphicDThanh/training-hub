// Types
import { OptionType } from "@/types";

export const EXCEPT_KEYS = {
  POSITIVE_INTEGER: ["e", "E", "+", "-", "."],
  POSITIVE_DOUBLE: ["e", "E", "+", "-"],
};

export enum DIRECTION {
  ASC = "asc",
  DESC = "desc",
}

// Mailto Support
export const MAILTO_SUPPORT = "support@tremor-dashboard.com";

export const REMEMBER_ME_COOKIES_KEY = "remember-me";
export const UID_KEY = "uid";
export const ROLE = "role";
export const NAME = "name";
export const AVATAR = "avatar";
export const AUTH_SESSION_COOKIES_KEY = "authjs.session-token";

export const ORDER_LIST_OPTIONS: OptionType[] = [
  { option: "Paid", value: "0" },
  { option: "Refunded", value: "2" },
  { option: "Canceled", value: "1" },
];

export const PRODUCT_LIST_OPTIONS: OptionType[] = [
  { option: "Yes", value: "true" },
  { option: "No", value: "false" },
];

export const FORMAT_DATE = {
  YEAR_MONTH_DATE_TIME: "YYYY-MM-DDTHH:mm:ss.SSS",
  MONTH_DAY_YEAR_TIME: "MMM D, YYYY h:mm A",
};

export const SEPARATOR = {
  COMMAS: ",",
  DOTS: ".",
};

export const CDN_KEY = process.env.NEXT_PUBLIC_CDN_KEY;

export const DRAG_ZONE = {
  DEFAULT: {
    TEXT: "Drag and drop your file here to begin uploading.",
    STYLE_INPUT: "border-gray-300",
    STYLE_TEXT: "text-gray-500 dark:text-gray-400",
  },
  ON_DRAG: {
    TEXT: "Release the mouse click to upload the photo",
    STYLE_INPUT: "outline outline-2 outline-[#ebeff4]",
    STYLE_TEXT: "text-gray-500 dark:text-gray-400",
  },
  ON_WRONG_FORMAT: {
    TEXT: "Invalid image file type. Please try uploading again.",
    STYLE_INPUT: "border-red-500",
    STYLE_TEXT: "text-red-500 dark:text-red-500",
  },
};

export const TRANSACTION_CLASS = {
  INCREASE: {
    buttonClasses: "text-few dark:text-few dark:hove:text-few border-few",
    textClasses: "font-semibold text-greener dark:text-few",
  },
  DECREASE: {
    buttonClasses:
      "text-attention dark:text-attention dark:hover:text-attention border-attention",
    textClasses: "font-semibold text-blood dark:text-pink",
  },
  PENDING: {
    buttonClasses:
      "text-primary dark:text-primary dark:hover:text-primary border-primary",
    textClasses:
      "font-semibold text-primary dark:text-dark-tremor-content-pending",
  },
};

export const enum VARIANT_BUTTON {
  LIGHT = "light",
  LIGHT_CARD = "lightCard",
  LIGHT_CENTER = "lightCenter",
  LIGHT_STATUS = "lightStatus",
  SECONDARY = "secondary",
  SECONDARY_SHADOW = "secondaryShadow",
  PRIMARY = "primary",
  PRIMARY_CENTER = "primaryCenter",
  SURFACE = "surface",
  DARK = "dark",
  ACTIVE = "active",
}

export const NO_IMAGE = "No Image";

export const RESULT_NOT_FOUND = "Result Not Found";

export const AMOUNT_LIMIT = 20000;
export const PRICE_LIMIT = 20000;
export const QUANTITY_LIMIT = 10000;
export const WEIGHT_LIMIT = 2000;

export const PREFIX_PHONE_NUMBER = "+1";

export const STORAGES = {
  IS_DARK_THEME: "isDarkTheme",
};

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const LOGO_TITLE = "Tremor Dashboard PRO";
