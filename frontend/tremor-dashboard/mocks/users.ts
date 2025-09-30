// Types
import { ADMIN_ID } from "@/constants";
import { BirthDay, USER_ROLE, User } from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: ADMIN_ID,
    name: "user1",
    email: "user1@gmail.com",
    password: "user@123123",
    remember: true,
    agreeTerms: true,
    pinCode: "118791",
    role: USER_ROLE.ADMIN,
    gender: 0,
    location: "112 Nguyen Thi Dinh, Da Nang",
    phoneNumber: "(+84)763651133",
    birthday: "2024-04-02T04:38:38.648",
    language: "English",
    skills: ["0", "1"],
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/black-chair.b2719b4f.jpeg",
    createdAt: "2023-11-22T04:01:46+00:00",
    bio: "This is description",
    facebookUrl: "facebook.com",
    instagramUrl: "instagram.com",
    twitterUrl: "twitter.com",
  },
  {
    id: 2,
    name: "user2",
    email: "user2@gmail.com",
    password: "user2",
    remember: false,
    agreeTerms: false,
    role: USER_ROLE.NORMAL,
    gender: 0,
    location: "112 Nguyen Thi Dinh, Da Nang",
    phoneNumber: "(+84)763651133",
    birthday: "2024-04-02T04:38:38.648",
    language: "English",
    skills: ["0", "1"],
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/chair-pink.686a7ae1.jpeg",
    createdAt: "2023-08-08T23:55:34+00:00",
    bio: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
  },
];

export const MOCK_USER_BIRTHDAY: BirthDay = {
  date: 1,
  months: 1,
  years: 1990,
};

export const MOCK_EMAIL_OPTIONS = [
  {
    option: "tremor+100@gmail.com",
    value: "1",
  },
  {
    option: "tremor+200@gmail.com",
    value: "2",
  },
  {
    option: "tremor+300@gmail.com",
    value: "3",
  },
];
