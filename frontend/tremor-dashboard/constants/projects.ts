import { ImageProject, User } from "@/types";

export const TOOL_ICON_OPTION: ImageProject[] = [
  {
    name: "SlackBot",
    id: 0,
  },
  {
    name: "Spotify",
    id: 1,
  },
  {
    name: "Yahoo",
    id: 2,
  },
  {
    name: "Zalo",
    id: 3,
  },
  {
    name: "Twitter",
    id: 4,
  },
];

export const PARTICIPANTS_PROJECTS = [
  {
    id: 0,
    name: "Jessica",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-das…oard-pro//_next/static/media/logo-xd.4ef94f7b.svg",
  },
  {
    id: 9,
    name: "Kali",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-das…oard-pro//_next/static/media/logo-xd.4ef94f7b.svg",
  },
  {
    id: 5,
    name: "Henry ",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-das…oard-pro//_next/static/media/logo-xd.4ef94f7b.svg",
  },
  {
    id: 6,
    name: "John",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-das…oard-pro//_next/static/media/logo-xd.4ef94f7b.svg",
  },
  {
    id: 4,
    name: "June",
    avatar:
      "https://demos.creative-tim.com/nextjs-material-das…oard-pro//_next/static/media/logo-xd.4ef94f7b.svg",
  },
] as User[];

// Max should is 10 for all screen.
export const PARTICIPANTS_NUMBER_PROJECT = 10;
