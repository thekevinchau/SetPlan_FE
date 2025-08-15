import { useEffect } from "react";
import { MdOutlineFestival } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SetPlanTextWhite from "../assets/SetPlanTextWhite.png";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface MainSideBarProps {
  selected?: number;
  setSelected: (value: number) => void;
}

export default function MainSideBar({
  selected,
  setSelected,
}: MainSideBarProps) {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );
  const currentUserAvatar: string | null | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.avatarUrl
  );
  const currentUserDisplayName: string | null | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.displayName
  );
  useEffect(() => {
    const savedSelected = localStorage.getItem("sidebar-selected");
    if (savedSelected) {
      setSelected(Number(savedSelected));
    }
  }, [setSelected]);

  const handleSelection = (value: number) => {
    localStorage.setItem("sidebar-selected", value.toString());
    setSelected(value);
  };

  return (
    <div className="mt-0 md:mt-4 rounded-lg text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20">
      <div className="flex justify-between items-center py-3 pr-2 border-gray-700/50">
        <Link
          to={"/"}
          className="pl-1 cursor-pointer"
          onClick={() => handleSelection(1)}
        >
          <img
            className="w-24 h-8 object-cover"
            src={SetPlanTextWhite}
            alt="SetPlan Logo"
          />
        </Link>
        {isLoggedIn ? (
          <Link to={`/users/me`}>
            {currentUserAvatar !== null ? (
              <Avatar>
                <AvatarImage
                  src={currentUserAvatar ?? undefined}
                  className="rounded-full object-cover w-8 h-8 border border-white/40"
                />
              </Avatar>
            ) : (
              <div className="border border-white/40 w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 font-bold">
                {currentUserDisplayName?.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
        ) : (
          <Link to="/login" className="text-xs">
            Log in
          </Link>
        )}
      </div>

      <div className="px-2 font-light text-sm">
        <ul className="flex flex-col gap-1 pb-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${
                selected === 1 ? "bg-gray-800" : ""
              }`}
              onClick={() => handleSelection(1)}
            >
              <MdOutlineFestival className="mr-3 text-lg" />
              <span className="text-gray-400 group-hover:text-white">
                Events
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/past-events"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${
                selected === 2 ? "bg-gray-800" : ""
              }`}
              onClick={() => handleSelection(2)}
            >
              <IoMdTime className="mr-3 text-lg" />
              <span className="text-gray-400 group-hover:text-white">
                Past Events
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/announcements"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${
                selected === 3 ? "bg-gray-800" : ""
              }`}
              onClick={() => handleSelection(3)}
            >
              <FaBullhorn className="mr-3 text-lg" />
              <span className="text-gray-400 group-hover:text-white">
                Updates
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
