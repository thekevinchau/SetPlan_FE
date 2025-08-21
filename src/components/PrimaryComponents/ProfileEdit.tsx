import { CiLogout } from "react-icons/ci";
import { Button } from "../ui/button";
import type { profileExternalLink, UserProfile } from "@/types/userTypes";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { Event } from "@/types/eventTypes";
import FavoriteEvents from "../Events/FavoriteEvents";
import ExternalLinks from "../ExternalLinks";
import { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import {
  editUser,
  getUserAvatarPresignedUrl,
  uploadAvatarToS3,
} from "@/api/users";
import EditableAvatar from "./EditableAvatar";

interface ProfileComponentProps {
  currentUser: UserProfile | null;
  setEditMode: () => void;
  isEditMode: boolean;
}
/*
How to handle avatar file upload to s3.
1. Our EditableAvatar component accepts a file upload of image type
    - Via props, that will set the avatarFile.
2. Next, we generate a presigned URL from our server by including the contentType
as a query parameter. Once we get that URL from our server, we can feed it into another function
that consumes the presigned URL, as well as the file, and sends a PUT request to the S3 Endpoint.
3. Because the presigned URL code is designed to just replace the object in the bucket, we don't need
to make a separate request to the backend for the new URL.
*/

export default function ProfileEdit({
  currentUser,
  setEditMode,
  isEditMode,
}: ProfileComponentProps) {
  const favoriteEvents: Event[] = useSelector(
    (state: RootState) => state.favoriteEvents.favoriteEvents
  );
  const externalLinks: profileExternalLink[] | null | undefined =
    currentUser?.externalLinks;
  const [status, setStatus] = useState<string>("");
  const [biography, setBiography] = useState<string>(currentUser?.bio ?? "");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(event.target.value);
    setStatus("Saving...");
    if (biography !== "") {
      saveValueDebounced(event.target.value); // debounce API call / save
    }
  };

  // create a debounced save function once
  const saveValueDebounced = useMemo(
    () =>
      debounce((val: string) => {
        editUser(currentUser?.id, { biography: val });
        setStatus("Saved");
      }, 2000),
    []
  );

  const saveAvatar = async () => {
    try {
      if (!avatarFile) {
        return;
      }
      const presignedUrl = await getUserAvatarPresignedUrl(avatarFile.type);
      console.log("Got presigned URL! ", presignedUrl);

      if (presignedUrl) {
        await uploadAvatarToS3(presignedUrl, avatarFile);
        console.log("Successfully uploaded to s3!");
      }
    } catch (error) {
      setErrorMsg(String(error));
    }
  };

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
            {currentUser.avatarUrl ? (
              <EditableAvatar
                currentUserAvatar={currentUser.avatarUrl}
                setUpdatedFile={setAvatarFile}
              />
            ) : (
              <div className="w-24 h-24 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-full border-2 border-white/20 shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {currentUser.displayName?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
            )}
            {avatarFile && (
              <button className="text-white" onClick={saveAvatar}>
                Save Avatar
              </button>
            )}
            {avatarFile?.type}

            <h1 className="text-2xl font-bold text-white mb-2">
              {currentUser.displayName}
            </h1>
          </div>

          {currentUser.bio && (
            <div>
              <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
                Biography {status}
              </h3>
              <p className="text-gray-100 text-sm leading-relaxed">
                <textarea
                  className="mb-6 p-1 border w-full rounded-sm h-full"
                  value={biography}
                  onChange={handleChange}
                />
              </p>
            </div>
          )}

          <ExternalLinks
            externalLinks={externalLinks}
            isEditMode={isEditMode}
          />

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
