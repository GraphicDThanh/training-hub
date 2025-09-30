// Types
import { OptionType } from "@/types";

export const GENDERS: OptionType[] = [
  {
    option: "Male",
    value: "0",
  },
  {
    option: "Female",
    value: "1",
  },
];

export const SKILLS: Record<string, string | number>[] = [
  {
    value: "0",
    option: "React",
  },
  {
    value: "1",
    option: "Vue",
  },
  {
    value: "2",
    option: "Angular",
  },
  {
    value: "3",
    option: "Svelte",
  },
  {
    value: "4",
    option: "Javascript",
  },
];

export const MONTHS: OptionType[] = [
  {
    option: "January",
    value: "0",
  },
  {
    option: "February",
    value: "1",
  },
  {
    option: "March",
    value: "2",
  },
  {
    option: "April",
    value: "3",
  },
  {
    option: "May",
    value: "4",
  },
  {
    option: "June",
    value: "5",
  },
  {
    option: "July",
    value: "6",
  },
  {
    option: "August",
    value: "7",
  },
  {
    option: "September",
    value: "8",
  },
  {
    option: "October",
    value: "9",
  },
  {
    option: "November",
    value: "10",
  },
  {
    option: "December",
    value: "11",
  },
];

export const ROLES = [
  {
    value: 0,
    label: "User",
  },
  {
    value: 1,
    label: "Admin",
  },
];
