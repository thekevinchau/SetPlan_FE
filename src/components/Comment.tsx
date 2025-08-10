import { Link } from "react-router-dom";
import type { AnnouncementComment } from "../types/announcementTypes";

interface AnnouncementCommentProps {
  comment: AnnouncementComment;
}

export default function Comment({ comment }: AnnouncementCommentProps) {
  return (
    <div className="bg-gray-800/60 rounded-sm p-3 shadow-sm hover:bg-gray-700 transition-colors duration-200 flex items-center">
      <Link to={"/users"} className="mr-2">
        <img
          className="w-8 h-8 rounded-full"
          src="src/assets/SetPlan.png"
          alt="SetPlan Logo"
        />
      </Link>

      <div>
        <p className="font-semibold text-gray-100">
          {comment.commenter.name || "Unknown User"}
        </p>
        <p className="text-sm text-gray-300 break-words whitespace-pre-wrap">
          {comment.content || "No content"}
        </p>
      </div>
    </div>
  );
}
