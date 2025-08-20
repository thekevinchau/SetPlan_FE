import type {
  AnnouncementComment,
  AnnouncementDetails,
} from "@/types/announcementTypes";
import { TfiCommentAlt } from "react-icons/tfi";
import Comment from "./Comment";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { useState } from "react";
import { commentOnPost } from "@/api/announcements";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface CommentListingProps {
  announcement: AnnouncementDetails;
  comments: AnnouncementComment[] | undefined;
}

export default function CommentListing({
  comments,
  announcement,
}: CommentListingProps) {
  const queryClient = useQueryClient();
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );
  const [comment, setComment] = useState("");
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
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
    <div>
      <button
        className={`flex items-center text-sm mt-3 w-1/2 mb-1 transition duration-300 ${
          comments?.length === 0
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-400 hover:text-white cursor-pointer"
        }`}
        onClick={() => setCommentsVisible(!commentsVisible)}
        disabled={comments?.length === 0}
      >
        <TfiCommentAlt className="mr-2" />

        {comments?.length === 0 ? (
          <span className="pb-1">No comments yet</span>
        ) : commentsVisible ? (
          <span className="pb-1">Hide comments</span>
        ) : (
          <span className="pb-1">Show {comments?.length} comments</span>
        )}
      </button>
      {commentsVisible && comments && (
        <div className="transition duration-300 ease-out">
          {comments?.length ? (
            comments.map((comment: AnnouncementComment) => (
              <Comment
                key={comment.id}
                comment={comment}
                announcementId={announcement.id}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet</p>
          )}
        </div>
      )}
      {isLoggedIn ? (
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
      ) : (
        <p className="text-xs text-gray-400 mt-2">
          Log in or sign up to write a comment!
        </p>
      )}
    </div>
  );
}
