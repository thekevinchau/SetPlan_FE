import { Link } from "react-router-dom";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoArrowUpCircleSharp } from "react-icons/io5";

type AnnouncementDetails = {
  announcer: string;
  header: string;
  content: string;
};

interface AnnouncementProps {
  announcement: AnnouncementDetails;
}

export default function Announcement({ announcement }: AnnouncementProps) {
  return (
    <div className="w-full flex flex-col p-3 rounded-lg mb-4 border-gray-600 border">
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
            <p>{announcement.announcer}</p>
            <p className="text-gray-400 pb-[0.1rem]">4w</p>
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

      <p className="flex items-center text-sm mt-3 w-1/2 text-gray-400">
        <TfiCommentAlt className="mr-2" />
        <span className="pb-1">Show 4 comments</span>
      </p>

      <div className="flex items-center gap-2 mt-2">
        <input
          className="flex-1 border border-gray-400 rounded-md p-3 text-xs"
          placeholder="Write a comment..."
        />
        <button className="text-blue-500 hover:text-blue-600 transition duration-200 cursor-pointer">
          <IoArrowUpCircleSharp className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
