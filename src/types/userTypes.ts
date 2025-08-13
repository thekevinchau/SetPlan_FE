import type { SimpleEvent } from "./eventTypes";

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
  personalDetails: personalDetailsDTO | null,
  favoriteEvents: SimpleEvent[] | null,
  externalLinks: profileExternalLink | null,
  createdAt: string | null,
  updatedAt: string | null
}