import type { SimpleEvent } from "@/types/eventTypes";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { CiLogout, CiEdit } from "react-icons/ci";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { UserProfile } from "@/types/userTypes";
import { logout } from "@/api/users";
import { clearUser } from "@/redux/currentUserSlice";
import { useDispatch } from "react-redux";

interface ProfileComponentProps {
  currentUser: UserProfile | null;
}

export default function ProfileComponent({
  currentUser,
}: ProfileComponentProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutFn = async () => {
    await logout();
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="h-[95.75vh] rounded-lg mt-4 text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20 p-4 flex flex-col items-center justify-center">
      {/* Profile section */}
      <div className="flex flex-col justify-evenly items-center gap-6 w-full h-3/5 max-w-sm max-h-sm min-h-sm rounded-md p-5 bg-white/3 border border-white/6">
        <Avatar className="h-32 w-32">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="font-extrabold text-3xl">{currentUser?.displayName}</h1>
        <div className="flex flex-col items-center">
          <span className="mx-4 text-xs font-semibold tracking-widest text-gray-300 uppercase mb-2">
            Biography
          </span>
          <p>{currentUser?.bio}</p>
        </div>

        <div className="w-full flex flex-col items-center">
          <span className="mx-4 text-xs font-semibold tracking-widest text-gray-300 uppercase mb-2">
            Favorited Festivals
          </span>
          <div className="overflow-hidden w-full">
            {currentUser?.favoriteEvents?.map(
              (event: SimpleEvent, idx: number) => (
                <h2
                  className="flex justify-between items-center w-full"
                  key={idx}
                >
                  <p className="text-sm py-0.25">{event.name}</p>
                  <Link to="/schedules">
                    <RiCalendarScheduleLine className="text-md" />
                  </Link>
                </h2>
              )
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-between gap-3 w-full">
          <Button
            variant="ghost"
            onClick={logoutFn}
            className="cursor-pointer w-full sm:w-auto hover:text-red-500"
          >
            <CiLogout /> Sign Out
          </Button>
          <Button
            variant={"ghost"}
            className="cursor-pointer w-full sm:w-auto hover:text-blue-500"
          >
            <CiEdit />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
