import { createAnnouncement } from "@/api/announcements";
import type { AnnouncementPayload } from "@/types/announcementTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AnnouncementCreationProps {
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}
export default function AnnouncementCreationModal({
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