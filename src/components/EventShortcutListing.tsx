import { useQuery } from "@tanstack/react-query";
import SideBarEvent from "./SideBarEvent";
import {getFutureEvents } from "../api/events";
import type { Event } from "../types/eventTypes";

export default function EventShortcutListing() {
  const { data, isPending } = useQuery({
    queryKey: ["future-events"],
    queryFn: getFutureEvents,
    staleTime: 300000,
    refetchOnWindowFocus: true
  });
  const musicEvents: Event[] | undefined = data;
  return (
    <div className="mb-3 md:h-3/4">
      <div className="px-2 sm:px-4">
        <h3 className="text-xs">Upcoming Events</h3>
        {isPending ? (
          <p className="text-xs">Loading events...</p>
        ) : musicEvents && musicEvents?.length > 0 ? (
          musicEvents?.map((event: Event, index) => (
            <SideBarEvent
              key={index}
              id={event.id}
              name={event.details.eventName}
              startDate={event.details.startDate}
              endDate={event.details.endDate}
            />
          ))
        ) : (
          <p className="text-xs text-gray-500">No favorite events added!</p>
        )}
      </div>
    </div>
  );
}
