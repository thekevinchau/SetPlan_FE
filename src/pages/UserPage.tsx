import { logout } from "@/api/users";
import MainSideBar from "@/components/MainSideBar";
import Shortcuts from "@/components/Shortcuts";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/currentUserSlice";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { CiLogout } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import type { UserProfile } from "@/types/userTypes";
import type { RootState } from "@/redux/store";
import type { SimpleEvent } from "@/types/eventTypes";
import { RiCalendarScheduleLine } from "react-icons/ri";

export default function UserPage() {
  const [selected, setSelected] = React.useState<number>(4);
  localStorage.setItem("sidebar-selected", "4");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser: UserProfile | null = useSelector(
    (state: RootState) => state.currentUser.userProfile
  );
  useEffect(() => {
    if (currentUser === null || currentUser === undefined) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const { data, isPending } = useQuery({
    queryKey: ["currentUser"],
    refetchInterval: 5 * 60 * 1000,
  });

  const logoutFn = async () => {
    await logout();
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start gap-4 p-3">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5">
        <MainSideBar selected={selected} setSelected={setSelected} />
        <Shortcuts />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full h-[95.75vh]">
        <div className="h-full rounded-lg mt-4 text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20 p-4 flex flex-col items-center justify-center">
          {/* Profile section */}
          <div className="flex flex-col justify-evenly items-center gap-6 w-full h-3/5 max-w-sm border p-3">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-extrabold text-3xl">
              {currentUser?.displayName}
            </h1>
            <p>{currentUser?.bio}</p>

            <div className="w-full flex flex-col items-center">
              <span className="mx-4 text-xs font-semibold tracking-widest text-gray-300 uppercase mb-2">
                Favorited Festivals
              </span>
              <div className="overflow-hidden w-full">
                {currentUser?.favoriteEvents?.map((event: SimpleEvent) => (
                  <h2 className="flex justify-between items-center w-full">
                    <p className="text-sm py-0.25">{event.name}</p>
                    <Link to="/schedules">
                      <RiCalendarScheduleLine className="text-md" />
                    </Link>
                  </h2>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-between gap-3 w-full">
              <Button
                onClick={logoutFn}
                className="cursor-pointer w-full sm:w-auto hover:text-red-500"
              >
                <CiLogout /> Sign Out
              </Button>
              <Button className="cursor-pointer w-full sm:w-auto hover:text-blue-500">
                <CiEdit />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
