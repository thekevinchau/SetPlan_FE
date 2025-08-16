import type { Event } from "../types/eventTypes";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const startDate: Date = new Date(event.details.startDate);
  const endDate: Date = new Date(event.details.endDate);
  return (
    <Link to={`/events/${event.id}`}>
      <div className="mr-1 p-2 flex flex-col justify-between transition duration-300 rounded-md hover:scale-103 transform h-98 w-66 hover:bg-white/15">
        <img
          src={event.imageUrls.avatarUrl}
          className=" flex-1 mb-2 rounded-md object-cover shadow-2xl shadow-blue-900/70"
        />
        <div className="font-semibold text-white flex items-center justify-between">
          <h2 className="w-full truncate">{event.details.eventName} </h2>
          <CiHeart className="text-2xl hover:scale-135 hover:text-pink-400 transition duration-300" />
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
