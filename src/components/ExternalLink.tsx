import { updateExternalLink } from "@/api/users";
import { updateSocialLink } from "@/redux/currentUserSlice";
import type { RootState } from "@/redux/store";
import type { profileExternalLink } from "@/types/userTypes";
import { debounce } from "lodash";
import { useMemo, useState, type JSX } from "react";
import { AiOutlineSpotify } from "react-icons/ai";
import { CiYoutube } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { TfiInstagram } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";

interface ExternalLinkProps {
  link: profileExternalLink;
  isEditMode: boolean;
}

const iconMappings: Record<string, JSX.Element> = {
  YouTube: <CiYoutube className="text-red-500" />,
  Spotify: <AiOutlineSpotify className="text-green-500" />,
  Instagram: <TfiInstagram className="text-pink-400" />,
  Twitter: <RiTwitterXFill />,
};

export function ExternalLink({ link, isEditMode }: ExternalLinkProps) {
  let handle = "";
  let baseUrl = "";
  try {
    const urlObj = new URL(link.link);
    const segments = urlObj.pathname.split("/");
    handle = segments.pop() || segments.pop() || "";
    baseUrl = urlObj.origin;
  } catch {
    handle = link.link; // fallback
    baseUrl = "";
  }
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userProfile?.id
  );
  const [currentHandle, setCurrentHandle] = useState<string>(handle ?? "");
  const [status, setStatus] = useState<string>("");
  const dispatch = useDispatch();

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
        if (val === "") {
          setCurrentHandle(String(handle));
          setStatus("");
        } else {
          const updatedLink = {
            ...link,
            link: baseUrl + "/" + val,
          };
          if (
            currentUserId === "" ||
            currentUserId === undefined ||
            currentUserId === null
          ) {
            return;
          }
          updateExternalLink(currentUserId, updatedLink);
          dispatch(updateSocialLink(updatedLink));
          setStatus("Saved");
        }
      }, 2000),
    [dispatch, handle, link, baseUrl, currentUserId]
  );

  if (isEditMode) {
    return (
      <div className="mb-1 flex items-center">
        <p className="mr-1"> {iconMappings[link.platform]}</p>
        <p className="text-sm mr-2 flex items-center">
          {baseUrl}/
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
