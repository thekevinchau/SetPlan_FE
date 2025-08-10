import type { Event } from "../types/eventTypes";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const startDate: Date = new Date(event.details.startDate);
  const endDate: Date = new Date(event.details.endDate);
  return (
    <div className="mr-1 p-2 hover:border flex flex-col justify-between transition duration-500 rounded-md hover:scale-103 transform hover:opacity-80 h-98 w-66">
      <img
        src="src/assets/SetPlan.png"
        className=" flex-1 mb-2 rounded-md object-fit"
      />
      <h2 className="font-semibold text-white w-full truncate">
        {event.details.eventName}
      </h2>

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
  );
}
