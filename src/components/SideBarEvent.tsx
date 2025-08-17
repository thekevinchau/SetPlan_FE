import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { favoriteEvent, unfavoriteEvent } from "@/api/events";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";
import type { Event } from "@/types/eventTypes";
import { unfavoriteEventRedux } from "@/redux/favoriteEventSlice";
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
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const favoriteEvents: Event[] | null = useSelector(
    (state: RootState) => state.favoriteEvents.favoriteEvents
  );
  const isIncluded: boolean = favoriteEvents?.some(
    (event: Event) => event.id === id
  );
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );

  const favoriteEventFn = async () => {
    try {
      await favoriteEvent(id);
      queryClient.invalidateQueries({
        queryKey: ["favorited-events"] as const,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const unfavoriteEventFn = async () => {
    try {
      await unfavoriteEvent(id);
      queryClient.invalidateQueries({
        queryKey: ["favorited-events"] as const,
      });
      dispatch(unfavoriteEventRedux(id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="group flex items-center gap-2 text-xs w-full transition-colors duration-300 cursor-pointer mt-1 rounded-md h-12">
      {/* Favorite Icon */}
      {isLoggedIn && (
        <div className="flex-shrink-0">
          {isIncluded ? (
            <FaHeart
              className="text-base sm:text-md md:text-lg text-pink-500 transition-colors"
              onClick={unfavoriteEventFn}
            />
          ) : (
            <CiHeart
              className="text-base sm:text-md md:text-lg hover:text-pink-500 transition-colors"
              onClick={favoriteEventFn}
            />
          )}
        </div>
      )}

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
