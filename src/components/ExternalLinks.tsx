import type { profileExternalLink } from "@/types/userTypes";
import { ExternalLink } from "./ExternalLink";
interface ExternalLinksProps {
  externalLinks: profileExternalLink[] | undefined | null;
  isEditMode: boolean;
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
