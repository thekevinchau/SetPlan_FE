import { FaBullhorn } from "react-icons/fa";
import { getAnnouncements } from "../../api/announcements";
import { useQuery } from "@tanstack/react-query";
import type {
  AnnouncementDetails,
  AnnouncementResponse,
} from "../../types/announcementTypes";
import Announcement from "./Announcement";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import { useState } from "react";
import AnnouncementCreationModal from "./AnnouncementCreationModal";

export default function AnnouncementStorage() {
  const { data, isPending } = useQuery<AnnouncementResponse>({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });
  const isAdmin: boolean | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.admin
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const announcements: AnnouncementDetails[] | undefined = data?.content;

  return (
    <div className="w-full h-[95.75vh] rounded-lg mt-4 text-white bg-gray-900/50 border border-gray-700/20 p-3 flex flex-col">
      {/* Header section (fixed height) */}
      <div className="pb-4 border-b border-gray-600/50 space-y-4">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 mb-1 text-sm">Announcements</p>
            {isAdmin && (
              <AnnouncementCreationModal
                isOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            )}
          </div>
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
      {isPending ? (
        <div>Loading announcements...</div>
      ) : (
        // Scrollable announcement list
        <div className="mt-4 w-full overflow-y-auto flex-1 space-y-4 pr-1 flex flex-col items-center">
          {announcements?.map((announcement: AnnouncementDetails, idx) => (
            <Announcement key={idx} announcement={announcement} />
          ))}
        </div>
      )}
    </div>
  );
}
