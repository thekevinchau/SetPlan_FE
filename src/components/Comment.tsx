import type { AnnouncementComment } from "../types/announcementTypes";

interface AnnouncementCommentProps {
  comment: AnnouncementComment;
}

export default function Comment({ comment }: AnnouncementCommentProps) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-md p-3 shadow-sm hover:bg-gray-700 transition-colors duration-200">
      <p className="font-semibold text-gray-100 mb-1">{comment.commenter.name || "Unknown User"}</p>
      <p className="text-sm text-gray-300 break-words whitespace-pre-wrap">{comment.content || "No content"}</p>
    </div>
  );
}
