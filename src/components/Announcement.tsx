import { Link } from "react-router-dom";
import type {
  AnnouncementComment,
  AnnouncementDetails,
} from "../types/announcementTypes";
import { useState } from "react";
import { isWithinWeek, getWeeksBetweenDates } from "../utils/dateUtils";
import { useQuery} from "@tanstack/react-query";
import {
  getCommentsByAnnouncement,
} from "../api/announcements";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CommentListing from "./CommentListing";
import AnnouncementEditModal from "./AnnouncementEditModal";

interface AnnouncementProps {
  announcement: AnnouncementDetails;
}


export default function Announcement({ announcement }: AnnouncementProps) {
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const isAnnouncer: boolean =
    useSelector((state: RootState) => state.currentUser.userProfile?.id) ===
    announcement.announcer.id;
  const { data } = useQuery({
    queryKey: ["announcementComments", announcement.id],
    queryFn: () => getCommentsByAnnouncement(announcement.id),
    refetchOnMount: true,
  });
  const comments: AnnouncementComment[] | undefined = data;

  return (
    <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 flex flex-col p-3 rounded-lg mb-4 bg-gray-900/80">
      <div className="border-b-1 border-b-gray-700">
        <div id="header" className="mb-2 flex items-center justify-between">
          <div className="flex">
            <Link to={"/users"} className="flex items-center gap-3">
              <img
                className="w-7 h-7 rounded-full mr-2"
                src={announcement.announcer.avatarUrl ?? ""}
                alt={`${announcement.announcer.name} avatar`}
              />
            </Link>
            <div className="text-[0.75rem]">
              <p>{announcement.announcer.name}</p>
              {isWithinWeek(new Date(), new Date(announcement.createdAt)) ? (
                <p className="text-gray-400 pb-[0.1rem]">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                  {announcement.updatedAt !== null && " (Edited)"}
                </p>
              ) : (
                <p className="text-gray-400 pb-[0.1rem]">
                  {getWeeksBetweenDates(
                    new Date(),
                    new Date(announcement.createdAt)
                  )}
                  w
                </p>
              )}
            </div>
          </div>
          <div>
            {isAnnouncer && (
              <AnnouncementEditModal
                announcement={announcement}
                isOpen={isEditModalOpen}
                setIsOpen={setEditModalOpen}
              />
            )}
          </div>
        </div>
        <h2 className="font-extrabold text-gray-100 mb-2">
          {" "}
          {announcement.header}
        </h2>
        <p id="content" className="text-sm font-light text-gray-300 mb-3">
          {" "}
          {announcement.content}
        </p>
      </div>
      <CommentListing comments={comments} announcement={announcement} />
    </div>
  );
}
