import type { SimpleEvent } from "./eventTypes";

export const emptyProfile: UserProfile = {
    id: null,
    displayName: null,
    gender: null,
    bio: null,
    admin: false,
    personalDetails: null,
    favoriteEvents: null,
    externalLinks: null,
    createdAt: null,
    updatedAt:null

}

export interface UserRegistration {
  email: string,
  password: string,
  displayName: string,
  birthday: string,
  phoneNumber: string
}

export type SimpleUserProfile = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

interface personalDetailsDTO {
  birthday: string,
  phoneNumber: string
}

interface profileExternalLink {
  id: string,
  platform: string,
  link: string,
}

export type UserProfile = {
  id: string | null,
  displayName: string | null,
  gender: string | null,
  bio: string | null,
  avatarUrl: string | null | undefined
  personalDetails: personalDetailsDTO | null,
  favoriteEvents: SimpleEvent[] | null,
  admin: boolean,
  externalLinks: profileExternalLink | null,
  createdAt: string | null,
  updatedAt: string | null
}