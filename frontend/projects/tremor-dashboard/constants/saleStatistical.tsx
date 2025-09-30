import { ReactNode } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdLeaderboard, MdStore, MdWeekend } from "react-icons/md";

interface Icon {
  bgIcon: string;
  icon: ReactNode;
}

interface Sale {
  [key: string]: Icon;
}

export const SALE_STATISTICAL: Sale = {
  bookings: {
    bgIcon: "bg-gradient-arsenic",
    icon: <MdWeekend color="white" size="24px" />,
  },
  todayUser: {
    bgIcon: "bg-gradient-secondary",
    icon: <MdLeaderboard color="white" size="24px" />,
  },
  revenue: {
    bgIcon: "bg-gradient-elementary",
    icon: <MdStore color="white" size="24px" />,
  },
  followers: {
    bgIcon: "bg-gradient-few",
    icon: <IoMdPersonAdd color="white" size="24px" />,
  },
};
