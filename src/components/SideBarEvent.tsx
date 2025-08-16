import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { favoriteEvent } from "@/api/events";
import type { UserProfile } from "@/types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateUser } from "@/redux/currentUserSlice";
interface SideBarEventProps {
  id: string;
  name: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;
}

export default function SideBarEvent({
  id,
  name,
  startDate,
  endDate,
}: SideBarEventProps) {
  const startDay: Date = new Date(startDate);
  const endDay: Date = new Date(endDate);
  const dispatch = useDispatch();
  const currentUser: UserProfile | null = useSelector(
    (state: RootState) => state.currentUser.userProfile
  );
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const favoriteEventFn = async () => {
    if (!currentUser) return;
    try {
      const newProfile: UserProfile | void = await favoriteEvent(id);
      if (newProfile) {
        dispatch(updateUser(newProfile));
      }
      setIsFavorited(true);
    } catch (error) {
      console.error(error);
      setIsFavorited(false);
    }
  };
  return (
    <div className="group flex items-center gap-2 text-xs w-full transition-colors duration-300 cursor-pointer mt-1 rounded-md h-12">
      {/* Favorite Icon */}
      <div className="flex-shrink-0">
        {isFavorited ? (
          <FaHeart
            className="text-base sm:text-lg md:text-xl text-pink-500 transition-colors"
            onClick={() => setIsFavorited(false)}
          />
        ) : (
          <CiHeart
            className="text-base sm:text-lg md:text-xl hover:text-pink-500 transition-colors"
            onClick={favoriteEventFn}
          />
        )}
      </div>

      {/* Text content */}
      <Link
        to={`/events/${id}`}
        className="flex flex-col justify-center font-light flex-grow min-w-0"
      >
        <h1 className="text-xs text-gray-400 group-hover:text-white transition-colors truncate">
          {name}
        </h1>
        <p className="sm:text-xs text-gray-400 group-hover:text-gray-300 truncate">
          {startDay.toDateString()} -{" "}
          {endDay.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            weekday: "short",
          })}
        </p>
      </Link>

      {/* Arrow Icon */}
      <HiOutlineArrowLongRight className="ml-auto text-gray-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
    </div>
  );
}
