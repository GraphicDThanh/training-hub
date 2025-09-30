export enum USER_ROLE {
  ADMIN = 1,
  NORMAL = 0,
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  remember: boolean;
  agreeTerms: boolean;
  pinCode?: string;
  avatar: string;
  role: USER_ROLE;
  gender: number;
  location: string;
  phoneNumber: string;
  birthday: string;
  language: string;
  skills: string[];
  createdAt: string;
  bio: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
}

export interface EditUserData
  extends Omit<User, "birthday" | "createdAt" | "id" | "remember" | "role"> {
  confirmPassword: string;
  birthday: BirthDay;
}

export interface UserResponse {
  results: User[];
  total: number;
  skip: number;
  avatar?: string;
}

export interface BirthDay {
  months: number | string;
  date: number;
  years: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export interface IEditUserForm extends Omit<User, "skills" | "birthday"> {
  skills: string[];
  confirmationEmail?: string;
  birthday: BirthDay;
}

export interface UserAddPayLoad extends Omit<UserData, "confirmPassword"> {
  agreeTerms?: boolean;
  language?: string;
}

export interface UserData {
  name: string;
  email: string;
  birthday: string;
  phoneNumber: string;
  gender: number;
  password: string;
  confirmPassword?: string;
  avatar: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  bio: string;
  skills: string[];
  location: string;
  agreeTerms?: boolean;
  language?: string;
}

export interface UserForm
  extends Omit<
    EditUserData,
    | "password"
    | "termsAndConditions"
    | "pinCode"
    | "confirmPassword"
    | "birthday"
  > {
  birthday: string;
}

export interface UserBasicInfo
  extends Pick<
    EditUserData,
    | "name"
    | "email"
    | "phoneNumber"
    | "gender"
    | "password"
    | "location"
    | "skills"
    | "confirmPassword"
    | "birthday"
    | "bio"
  > {}
