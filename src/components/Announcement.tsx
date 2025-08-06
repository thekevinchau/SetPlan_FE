import { Link } from "react-router-dom";

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
    <div className="w-1/2 h-1/2 flex flex-col p-3 rounded-lg border mb-4">
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
            <p className="text-gray-400">4w</p>
          </div>
        </div>
        <h2 className="font-extrabold text-gray-100 mb-3">
          {" "}
          {announcement.header}
        </h2>
        <p id="content" className="text-sm font-light text-gray-300 mb-3">
          {" "}
          {announcement.content}
        </p>
      </div>
    </div>
  );
}
