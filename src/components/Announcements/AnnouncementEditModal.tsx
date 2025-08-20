import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "../ui/button";
import type {
  AnnouncementDetails,
  AnnouncementPayload,
} from "@/types/announcementTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { deleteAnnouncement, editAnnouncement } from "@/api/announcements";

interface AnnouncementEditProps {
  announcement: AnnouncementDetails;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function AnnouncementEditModal({
  announcement,
  isOpen,
  setIsOpen,
}: AnnouncementEditProps) {
  const [newHeader, setNewHeader] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const queryClient = useQueryClient();
  const deleteAnnouncementFn = async () => {
    await deleteAnnouncement(announcement.id);
    queryClient.invalidateQueries({
      queryKey: ["announcements"] as const,
    });
    setIsOpen(false);
  };
  const saveAnnouncement = async () => {
    try {
      const edits: AnnouncementPayload = {
        header: newHeader === "" ? announcement.header : newHeader,
        content: newContent === "" ? announcement.content : newContent,
      };
      await editAnnouncement(announcement.id, edits);
      queryClient.invalidateQueries({
        queryKey: ["announcements"] as const,
      });
      setIsOpen(false);
      setNewHeader("");
      setNewContent("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
      <DialogTrigger className="hover:text-blue-500 transition duration-300 cursor-pointer">
        <FaPencilAlt className="text-xl" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogDescription>
            Edit your announcement or delete it here!
          </DialogDescription>
          <Label>Header</Label>
          <Input
            type="text"
            placeholder={announcement.header}
            value={newHeader}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewHeader(e.target.value)
            }
          />
          <Label>Content</Label>
          <Input
            type="text"
            placeholder={announcement.content}
            value={newContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewContent(e.target.value)
            }
          />
          <div className="flex items-center justify-between">
            <Button
              className="bg-green-500 hover:text-green-500 hover:bg-white hover:border hover:border-green-500 transition duration-300 cursor-pointer w-1/4"
              onClick={saveAnnouncement}
              disabled={!newHeader && !newContent}
            >
              Save
            </Button>
            <Button
              className="bg-red-500 hover:text-red-500 hover:bg-white hover:border hover:border-red-500 transition duration-300 cursor-pointer w-1/4"
              onClick={deleteAnnouncementFn}
            >
              <FaRegTrashCan />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
