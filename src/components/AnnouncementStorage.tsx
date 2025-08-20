import { FaBullhorn } from "react-icons/fa";
import { createAnnouncement, getAnnouncements } from "../api/announcements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AnnouncementDetails,
  AnnouncementPayload,
  AnnouncementResponse,
} from "../types/announcementTypes";
import Announcement from "./Announcement";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoCreateOutline } from "react-icons/io5";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

interface AnnouncementCreationProps {
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}
function AnnouncementCreationModal({
  isOpen,
  setModalOpen,
}: AnnouncementCreationProps) {
  const queryClient = useQueryClient();
  const [header, setHeader] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: AnnouncementPayload = { header: header, content: content };
    await createAnnouncement(payload);
    queryClient.invalidateQueries({
      queryKey: ["announcements"] as const,
    });
    setHeader("");
    setContent("");
    setModalOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => setModalOpen(!isOpen)}>
      <DialogTrigger className="flex items-center cursor-pointer hover:text-green-500 transition duration-300 text-sm">
        Add Announcement <IoCreateOutline className="ml-2 text-xl" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Announcement</DialogTitle>
          <DialogDescription>
            Create an announcement for any site updates or new features!
          </DialogDescription>
          <form className="flex flex-col" onSubmit={submitForm}>
            <Label className="mb-1">Header</Label>
            <Input
              type="text"
              className="mb-2"
              id="announcementHeader"
              required
              value={header}
              onChange={(event) => setHeader(event.target.value)}
            />

            <Label className="mb-1">Content</Label>
            <Input
              type="text"
              className="mb-3"
              id="announcementContent"
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <Button
              className="bg-blue-500 text-white hover:bg-green-500 cursor-pointer"
              type="submit"
            >
              Create
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

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
