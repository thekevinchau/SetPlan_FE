import { updateExternalLink } from "@/api/users";
import type { RootState } from "@/redux/store";
import type { profileExternalLink } from "@/types/userTypes";
import { debounce } from "lodash";
import { useMemo, useState, type JSX } from "react";
import { AiOutlineSpotify } from "react-icons/ai";
import { CiYoutube } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { TfiInstagram } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { urlParser } from "@/utils/utils";

interface ExternalLinkProps {
  link: profileExternalLink;
  isEditMode: boolean;
}

const iconMappings: Record<string, JSX.Element> = {
  YouTube: (
    <CiYoutube className="text-red-500 transition duration-300 hover:bg-white/60 rounded-xs" />
  ),
  Spotify: (
    <AiOutlineSpotify className="text-green-500 transition duration-300 hover:bg-white/60 rounded-xs" />
  ),
  Instagram: (
    <TfiInstagram className="text-pink-400 transition duration-300 hover:bg-white/60 p-1 rounded-xs" />
  ),
  Twitter: (
    <RiTwitterXFill className="transition duration-300 hover:bg-white/60 p-1 rounded-xs" />
  ),
};

export function ExternalLink({ link, isEditMode }: ExternalLinkProps) {
  const parsedHandle = urlParser(link.link);
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userProfile?.id
  );
  const [currentHandle, setCurrentHandle] = useState<string>(
    parsedHandle.path ?? ""
  );
  const [status, setStatus] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaces = event.target.value.replace(/\s/g, ""); // remove all spaces
    setCurrentHandle(noSpaces);
    setStatus("Saving...");
    if (currentHandle !== "") {
      saveValueDebounced(noSpaces); // debounce API call / save
    }
  };

  // create a debounced save function once
  const saveValueDebounced = useMemo(
    () =>
      debounce((val: string) => {
        //If the value is empty, set it back to whatever it was before and clear the status.
        //If the value doesn't equal the original handle, then we can fire the change :)
        const updatedLink = {
          ...link,
          link: parsedHandle.baseUrl + "/" + val,
        };
        if (
          currentUserId === "" ||
          currentUserId === undefined ||
          currentUserId === null
        ) {
          return;
        } else {
          updateExternalLink(currentUserId, updatedLink);
          setStatus("Saved");
        }
      }, 2000),
    [parsedHandle.baseUrl, link, currentUserId]
  );

  if (isEditMode) {
    return (
      <div className="mb-1 flex items-center">
        <p className="mr-1"> {iconMappings[link.platform]}</p>
        <p className="text-sm mr-2 flex items-center">
          {parsedHandle.baseUrl}/
          <Input
            className="ml-1"
            value={currentHandle}
            onChange={handleChange}
          />
        </p>
        <p className="text-xs">{status}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-1/2">
      <a href={link.link}> {iconMappings[link.platform]}</a>
    </div>
  );
}
