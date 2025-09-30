// Icons
import { IoPersonSharp, IoReceiptOutline } from "react-icons/io5";

// Types
import { INavigation } from "@/types";

export const NAVIGATION_SETTING: INavigation[] = [
  {
    icon: (
      <IoPersonSharp className="text-primary dark:text-white dark!:hover:text-black" />
    ),
    label: "profile",
    href: "#profile",
  },
  {
    icon: (
      <IoReceiptOutline className="text-primary dark:text-white dark!:hover:text-black" />
    ),
    label: "basic info",
    href: "#basicInfo",
  },
];
