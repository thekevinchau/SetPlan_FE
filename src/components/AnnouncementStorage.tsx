import { FaBullhorn } from "react-icons/fa";
import Announcement from "./Announcement";

type AnnouncementDetails = {
  announcer: string;
  header: string;
  content: string;
};

const announcements: AnnouncementDetails[] = [
  {
    announcer: "kevster",
    header: "Welcome to the website",
    content:
      "Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!Awesome website!!",
  },
  {
    announcer: "kevster",
    header: "Welcome to the website",
    content:
      "Appreciate those of you who have reached out. It's been difficult for me to find time lately to update lineup data, and this will likely be true for the next few months. Haven't forgotten about this/dropped it altogether, but I'll need a bit of time before I can get back to timely lineup updates. Love you all 🫶",
  },  {
    announcer: "kevster",
    header: "Welcome to the website",
    content:
      "Appreciate those of you who have reached out. It's been difficult for me to find time lately to update lineup data, and this will likely be true for the next few months. Haven't forgotten about this/dropped it altogether, but I'll need a bit of time before I can get back to timely lineup updates. Love you all 🫶",
  },
  {
    announcer: "kevster",
    header: "Welcome to the website",
    content:
      "Appreciate those of you who have reached out. It's been difficult for me to find time lately to update lineup data, and this will likely be true for the next few months. Haven't forgotten about this/dropped it altogether, but I'll need a bit of time before I can get back to timely lineup updates. Love you all 🫶",
  },
  {
    announcer: "kevster",
    header: "Welcome to the website",
    content:
      "Appreciate those of you who have reached out. It's been difficult for me to find time lately to update lineup data, and this will likely be true for the next few months. Haven't forgotten about this/dropped it altogether, but I'll need a bit of time before I can get back to timely lineup updates. Love you all 🫶",
  }
];

export default function AnnouncementStorage() {
  return (
    <div className="w-full h-[95vh] rounded-lg mt-4 text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20 p-3 flex flex-col">
      {/* Header section (fixed height) */}
      <div className="pb-4 border-b border-gray-600/50 space-y-4">
        <div>
          <p className="text-gray-400 mb-1 text-sm">Announcements</p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex flex-wrap items-center leading-tight">
            <FaBullhorn className="mr-2 text-xl sm:text-2xl md:text-3xl inline" />
            General site
            <span className="ml-1 mr-1 bg-gradient-to-r from-yellow-500 via-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              updates
            </span>
            here!
          </h1>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Current Announcements</h2>
          <p className="text-sm text-gray-400">
            Here you will find general site updates, new features, and any
            random shits and gigs I want to post.
          </p>
        </div>
      </div>

      {/* Scrollable announcement list */}
      <div className="mt-4 overflow-y-auto flex-1 space-y-4 pr-1">
        {announcements.map((announcement: AnnouncementDetails, idx) => (
          <Announcement key={idx} announcement={announcement} />
        ))}
      </div>
    </div>
  );
}
