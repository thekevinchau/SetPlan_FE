import type { Event } from "src/types/eventTypes.ts"
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import type { RootState } from "@/redux/store";
import { favoriteEvent, unfavoriteEvent } from "@/api/events";
import { unfavoriteEventRedux } from "@/redux/favoriteEventSlice";
import { FaHeart } from "react-icons/fa";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const startDate: Date = new Date(event.details.startDate);
  const endDate: Date = new Date(event.details.endDate);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const favoriteEvents: Event[] | null = useSelector(
    (state: RootState) => state.favoriteEvents.favoriteEvents
  );
  const isIncluded: boolean = favoriteEvents?.some(
    (favoriteEvent: Event) => favoriteEvent.id === event.id
  );
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );

  const favoriteEventFn = async () => {
    try {
      await favoriteEvent(event.id);
      queryClient.invalidateQueries({
        queryKey: ["favorited-events"] as const,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const unfavoriteEventFn = async () => {
    try {
      await unfavoriteEvent(event.id);
      queryClient.invalidateQueries({
        queryKey: ["favorited-events"] as const,
      });
      dispatch(unfavoriteEventRedux(event.id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Link to={`/events/${event.id}`}>
      <div className="mr-1 p-2 flex flex-col justify-between transition duration-300 rounded-md hover:scale-103 transform h-98 w-66 hover:bg-white/15">
        <img
          src={event.imageUrls.avatarUrl}
          className=" flex-1 mb-2 rounded-md object-cover shadow-2xl shadow-blue-900/70"
        />
        <div className="font-semibold text-white flex items-center justify-between">
          <h2 className="w-full truncate">{event.details.eventName} </h2>
          {isLoggedIn && (
            <div>
              {isIncluded ? (
                <FaHeart
                  className="text-base sm:text-xl md:text-2xl text-blue-500 cursor-pointer hover:bg-white/20 p-1 rounded-sm"
                  onClick={(e) => {
                    e.preventDefault(); // prevents <Link> navigation
                    e.stopPropagation(); // stops bubbling to parent
                    unfavoriteEventFn();
                  }}
                />
              ) : (
                <CiHeart
                  className="text-base sm:text-xl md:text-2xl hover:text-blue-500 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    favoriteEventFn();
                  }}
                />
              )}
            </div>
          )}
        </div>

        <div>
          <p className="sm:text-xs text-gray-400 group-hover:text-gray-300 truncate flex items-center">
            <HiOutlineCalendarDateRange className="mr-[0.45rem]" />
            {startDate.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              weekday: "short",
            })}{" "}
            -{" "}
            {endDate.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              weekday: "short",
            })}
          </p>

          <p className="sm:text-xs text-gray-400 group-hover:text-gray-300 truncate flex items-center mt-1">
            <GrMapLocation className="mr-2" />
            {event.location.city}, {event.location.state}
          </p>
        </div>
      </div>
    </Link>
  );
}
