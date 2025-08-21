import { FaPencilAlt } from "react-icons/fa";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useState } from "react";

interface EditableAvatarProps {
  currentUserAvatar: string;
  setUpdatedFile: (file: File) => void;
}
export default function EditableAvatar({
  currentUserAvatar,
  setUpdatedFile,
}: EditableAvatarProps) {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <div className="relative w-24 h-24 mb-4">
      <Avatar className="w-full h-full">
        <AvatarImage
          src={preview ? preview : currentUserAvatar}
          className="rounded-full object-cover w-full h-full border-2 border-white/20"
        />
      </Avatar>

      {/* Pencil overlay */}
      <label className="group absolute bottom-0 right-0 z-10 bg-white p-1 rounded-full shadow-md border border-gray-200 cursor-pointer transition duration-300 hover:bg-black">
        <FaPencilAlt className="w-4 h-4 text-black transition duration-300 group-hover:text-white" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setUpdatedFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
      </label>
    </div>
  );
}
