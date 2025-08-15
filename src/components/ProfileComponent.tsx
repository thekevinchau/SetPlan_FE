import type { SimpleEvent } from "@/types/eventTypes";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CiLogout, CiEdit } from "react-icons/ci";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { UserProfile } from "@/types/userTypes";
import { logout } from "@/api/users";
import { clearUser } from "@/redux/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface ProfileComponentProps {
  currentUser: UserProfile | null;
  setEditMode: () => void;
}

export default function ProfileComponent({
  currentUser,
  setEditMode,
}: ProfileComponentProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserAvatar: string | undefined | null = useSelector(
    (state: RootState) => state.currentUser.userProfile?.avatarUrl
  );

  const logoutFn = async () => {
    await logout();
    dispatch(clearUser());
    navigate("/");
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
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
          {/* Avatar Section */}
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

          {/* Biography Section */}
          {currentUser.bio && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
                Biography
              </h3>
              <p className="text-gray-100 text-sm leading-relaxed">
                {currentUser.bio}
              </p>
            </div>
          )}

          {/* Favorite Events Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
              Favorite Festivals
            </h3>

            {!currentUser.favoriteEvents?.length ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm">No favorite events yet</p>
                <p className="text-gray-500 text-xs mt-1">
                  Start exploring festivals to add favorites!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {currentUser.favoriteEvents.map(
                  (event: SimpleEvent, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xs text-gray-100 truncate flex-1">
                        {event.name}
                      </span>
                      <Link
                        to={`/schedules/${event.id}`}
                        className="ml-2 p-1 hover:text-blue-400 transition-colors"
                      >
                        <RiCalendarScheduleLine className="w-4 h-4 text-gray-400" />
                      </Link>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={logoutFn}
              className="flex-1 text-gray-300 hover:text-red-400 hover:bg-red-500/10 border border-white/10 transition-colors"
            >
              <CiLogout className="mr-2 h-4 w-4" />
              Sign Out
            </Button>

            <Button
              variant="ghost"
              className="flex-1 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 border border-white/10 transition-colors"
              onClick={setEditMode}
            >
              <CiEdit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
