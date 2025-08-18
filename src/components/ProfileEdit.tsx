import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CiLogout } from "react-icons/ci";

import { Button } from "./ui/button";
import type { profileExternalLink, UserProfile } from "@/types/userTypes";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Input } from "./ui/input";
import type { Event } from "@/types/eventTypes";
import FavoriteEvents from "./FavoriteEvents";
import ExternalLinks from "./ExternalLinks";
import { useState } from "react";

interface ProfileComponentProps {
  currentUser: UserProfile | null;
  setEditMode: () => void;
  isEditMode: boolean;
}

export default function ProfileEdit({
  currentUser,
  setEditMode,
  isEditMode,
}: ProfileComponentProps) {
  const currentUserAvatar: string | undefined | null = useSelector(
    (state: RootState) => state.currentUser.userProfile?.avatarUrl
  );
  const favoriteEvents: Event[] = useSelector(
    (state: RootState) => state.favoriteEvents.favoriteEvents
  );
  const externalLinks: profileExternalLink[] | null | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.externalLinks
  );
  const [biography, setBiography] = useState<string>(currentUser?.bio ?? "");
  if (!currentUser) {
    return (
      <div className="h-[95.75vh] rounded-lg mt-4 bg-gray-900/70 border border-gray-700/20 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="h-[95.75vh] rounded-lg mt-4 bg-gray-900/70 border border-gray-700/20 p-6 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            {currentUserAvatar ? (
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage
                  src={currentUserAvatar}
                  className="rounded-full object-cover w-full h-full border-2 border-white/20"
                />
              </Avatar>
            ) : (
              <div className="w-24 h-24 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-full border-2 border-white/20 shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {currentUser.displayName?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
            )}

            <h1 className="text-2xl font-bold text-white mb-2">
              {currentUser.displayName}
            </h1>
          </div>

          {currentUser.bio && (
            <div>
              <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
                Biography
              </h3>
              <p className="text-gray-100 text-sm leading-relaxed">
                <Input className="mb-6" value={biography} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBiography(e.target.value)} />
              </p>
            </div>
          )}

          <ExternalLinks externalLinks={externalLinks} isEditMode={isEditMode} />

          <FavoriteEvents
            favoriteEvents={favoriteEvents}
            isEditMode={isEditMode}
          />
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 text-gray-300 hover:text-red-400 hover:bg-red-500/10 border border-white/10 transition-colors"
              onClick={setEditMode}
            >
              <CiLogout className="mr-2 h-4 w-4" />
              Exit Edit Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
