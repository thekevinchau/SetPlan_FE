import type { profileExternalLink } from "@/types/userTypes";
import { CiYoutube } from "react-icons/ci";
import { AiOutlineSpotify } from "react-icons/ai";
import { TfiInstagram } from "react-icons/tfi";
import { RiTwitterXFill } from "react-icons/ri";
import { Input } from "./ui/input";
import { useState } from "react";

interface ExternalLinksProps {
  externalLinks: profileExternalLink[] | undefined | null;
  isEditMode: boolean;
}

interface ExternalLinkProps {
  link: profileExternalLink;
  isEditMode: boolean;
}

  const iconMappings = new Map();
  iconMappings.set("YouTube", <CiYoutube className="text-red-500" />);
  iconMappings.set("Spotify", <AiOutlineSpotify className="text-green-500" />);
  iconMappings.set("Instagram", <TfiInstagram className="text-pink-400" />);
  iconMappings.set("Twitter", <RiTwitterXFill />);

export function ExternalLink({ link, isEditMode }: ExternalLinkProps) {
  const href = link.link; // or window.location.href, etc.
  const urlObj = new URL(href); // parses the URL
  const segments = urlObj.pathname.split("/"); // splits into ["", "kevster"]
  const handle = segments.pop() || segments.pop(); // handles trailing slash
  const baseUrl = `${urlObj.origin}`; // e.g. "https://youtube.com"
  const [currentHandle, setCurrentHandle] = useState<string>(handle ?? "");

  if (isEditMode) {
    return (
      <div className="mb-1 flex items-center">
        <p className="mr-1"> {iconMappings.get(link.platform)}</p>
        <p className="text-sm mr-2 flex items-center">
          {baseUrl}/<Input className="ml-1" value={currentHandle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentHandle(e.target.value)} />
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-1/2">
      <a href={link.link}> {iconMappings.get(link.platform)}</a>
    </div>
  );
}

export default function ExternalLinksListing({
  externalLinks,
  isEditMode,
}: ExternalLinksProps) {
  return (
    <div className="mb-8 text-white text-3xl">
      <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
        Socials
      </h3>
      <div
        className={`${
          isEditMode ? "flex flex-col w-full" : "flex justify-evenly w-2/5"
        }`}
      >
        {externalLinks?.map((link: profileExternalLink, idx: number) => (
          <ExternalLink key={idx} link={link} isEditMode={isEditMode} />
        ))}
      </div>
    </div>
  );
}
