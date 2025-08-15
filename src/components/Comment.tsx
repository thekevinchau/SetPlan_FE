import { Link } from "react-router-dom";
import type { AnnouncementComment } from "../types/announcementTypes";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { deleteComment } from "@/api/announcements";
import { useQueryClient } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";

interface AnnouncementCommentProps {
  comment: AnnouncementComment;
  announcementId: string;
}

export default function Comment({
  comment,
  announcementId,
}: AnnouncementCommentProps) {
  const queryClient = useQueryClient();
  const currentUserId: string | null | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.id
  );
    const isAdmin: boolean | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.admin
  );
  console.log(isAdmin);

  const deleteCommentFn = async () => {
    try {
      await deleteComment(comment.id);
      queryClient.invalidateQueries({
        queryKey: ["announcementComments", announcementId] as const,
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  return (
    <div className="bg-gray-800/60 rounded-sm p-3 shadow-sm hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between">
      <div className="flex">
        <Link to={"/users"} className="mr-2">
          <img
            className="w-8 h-8 rounded-full"
            src="src/assets/SetPlan.png"
            alt="SetPlan Logo"
          />
        </Link>
        <div>
          <p className="font-semibold text-gray-100 text-sm">
            {comment.commenter.name || "Unknown User"}
          </p>
          <p className="text-xs text-gray-300 break-words whitespace-pre-wrap">
            {comment.content || "No content"}
          </p>
        </div>
      </div>

      {(currentUserId === comment.commenter.id || isAdmin === true)&& (
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <button
              className="hover:text-red-500 transition duration-300 cursor-pointer"
              onClick={deleteCommentFn}
            >
              <FaRegTrashCan />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Comment</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
