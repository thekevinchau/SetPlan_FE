import type { profileExternalLink } from "@/types/userTypes";
import { CiYoutube } from "react-icons/ci";
import { AiOutlineSpotify } from "react-icons/ai";
import { TfiInstagram } from "react-icons/tfi";
import { RiTwitterXFill } from "react-icons/ri";

interface ExternalLinksProps {
  externalLinks: profileExternalLink[] | undefined | null;
  isEditMode: boolean
}

interface ExternalLinkProps {
  link: profileExternalLink;
  isEditMode: boolean
}

export function ExternalLink({ link }: ExternalLinkProps) {
  const iconMappings = new Map();
  iconMappings.set("YouTube", <CiYoutube className="text-red-500" />);
  iconMappings.set("Spotify", <AiOutlineSpotify className="text-green-500" />);
  iconMappings.set("Instagram", <TfiInstagram className="text-pink-400"/>);
  iconMappings.set("Twitter", <RiTwitterXFill />);

  return (
    <div className="flex items-center justify-between w-1/2">
      <a href={link.link}> {iconMappings.get(link.platform)}</a>
    </div>
  );
}

export default function ExternalLinksListing({ externalLinks }: ExternalLinksProps) {
  return (
    <div className="mb-8 text-white text-3xl">
      <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
        Socials
      </h3>
      <div className="flex justify-evenly w-2/5">
        {externalLinks?.map((link: profileExternalLink, idx: number) => (
          <ExternalLink key={idx} link={link} />
        ))}
      </div>
    </div>
  );
}
