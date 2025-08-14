import { Link } from "react-router-dom";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import type {
  AnnouncementComment,
  AnnouncementDetails,
} from "../types/announcementTypes";
import { useState } from "react";
import React from "react";
import { isWithinWeek, getWeeksBetweenDates } from "../utils/dateUtils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commentOnPost, getCommentsByAnnouncement } from "../api/announcements";
import Comment from "./Comment";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface AnnouncementProps {
  announcement: AnnouncementDetails;
}

export default function Announcement({ announcement }: AnnouncementProps) {
  const [comment, setComment] = useState("");
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );
  const { data } = useQuery({
    queryKey: ["announcementComments", announcement.id],
    queryFn: () => getCommentsByAnnouncement(announcement.id),
    refetchOnMount: true
  });
  const queryClient = useQueryClient();
  const comments: AnnouncementComment[] | undefined = data;
  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    if (comment.trim() === "") return;

    try {
      await commentOnPost(announcement.id, { content: comment }); // wait for backend
      queryClient.invalidateQueries({
        queryKey: ["announcementComments", announcement.id] as const,
      });
      setComment(""); // clear input
      setCommentsVisible(true);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <div className="w-3/5 flex flex-col p-3 rounded-lg mb-4 border">
      <div className="border-b-1 border-b-gray-700">
        <div id="header" className="mb-2 flex">
          <Link to={"/users"} className="flex items-center gap-3">
            <img
              className="w-7 h-7 rounded-full mr-2"
              src="src/assets/SetPlan.png"
              alt="SetPlan Logo"
            />
          </Link>
          <div className="text-[0.75rem]">
            <p>{announcement.announcer.name}</p>
            {isWithinWeek(new Date(), new Date(announcement.createdAt)) ? (
              <p className="text-gray-400 pb-[0.1rem]">
                {new Date(announcement.createdAt).toLocaleDateString()}
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
        <h2 className="font-extrabold text-gray-100 mb-2">
          {" "}
          {announcement.header}
        </h2>
        <p id="content" className="text-sm font-light text-gray-300 mb-3">
          {" "}
          {announcement.content}
        </p>
      </div>

      <button
        className="flex items-center text-sm mt-3 w-1/2 mb-1 text-gray-400"
        onClick={() => setCommentsVisible(!commentsVisible)}
        disabled={comments?.length === 0}
      >
        <TfiCommentAlt className="mr-2" />

        {comments?.length === 0 && isLoggedIn ? (
          <span className="pb-1">Be the first to comment!</span>
        ) : commentsVisible ? (
          <span className="pb-1 hover:text-white transition duration-300 cursor-pointer">
            Hide comments
          </span>
        ) : (
          <span className="pb-1 hover:text-white transition duration-300 cursor-pointer">
            Show {comments?.length} comments
          </span>
        )}
      </button>

      {commentsVisible && (
        <div className="transition duration-300 ease-out">
          {comments?.length ? (
            comments.map((comment: AnnouncementComment) => (
              <Comment key={comment.id} comment={comment} announcementId={announcement.id} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet</p>
          )}
        </div>
      )}

      {isLoggedIn && (
        <div className="flex items-center gap-2 mt-2">
          <input
            className="flex-1 border border-gray-400 rounded-md p-3 text-xs"
            placeholder="Write a comment..."
            value={comment}
            onChange={handleCommentInput}
          />
          <button
            disabled={comment.trim() === ""}
            className="text-blue-500 hover:text-blue-600 transition duration-200 cursor-pointer"
            onClick={submitComment}
          >
            <IoArrowUpCircleSharp className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
}
