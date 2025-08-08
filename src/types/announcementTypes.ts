import type { PageMetadata } from "./page";
import type { SimpleUserProfile } from "./userTypes";

export type AnnouncementDetails = {
  id: string;
  announcer: SimpleUserProfile
  header: string;
  content: string;
  createdAt: string; // or Date if you plan to parse it
  updatedAt: string; // or Date
};

export type AnnouncementResponse = {
  content: AnnouncementDetails[];
  page: PageMetadata;
};

export type AnnouncementComment = {
    id: string,
    announcementId: string,
    commenter: SimpleUserProfile,
    content: string,
    createdAt: string 
}

export type AnnouncementCommentResponse = {
    content: AnnouncementComment[];
}