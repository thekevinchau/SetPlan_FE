import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { getUserFavoriteEvents } from "@/api/events";
import { useEffect } from "react";
import { setFavoriteEvents } from "@/redux/favoriteEventSlice";
import { useQuery } from "@tanstack/react-query";
import SideBarEvent from "./SideBarEvent";
import {getFutureEvents } from "../api/events";
import type { Event } from "../types/eventTypes";

function FavoritedEventsShortcut() {
  const currentUserId: string | null | undefined = useSelector(
    (state: RootState) => state.currentUser.userProfile?.id
  );
  const dispatch = useDispatch();
  const { data, isPending } = useQuery({
    queryKey: ["favorited-events"],
    queryFn: () =>
      getUserFavoriteEvents(currentUserId != null ? currentUserId : ""),
  });
  useEffect(() => {
    dispatch(setFavoriteEvents(data ?? []));
  }, [data, dispatch]);
  return (
    <div className="mb-2">
      <div className="px-2 sm:px-4">
        <h3 className="text-xs text-white mb-1">Favorited Events</h3>
        {isPending ? (
          <p>Loading....</p>
        ) : data && data?.length > 0 ? (
          data?.map((event) => (
            <SideBarEvent
              key={event.id}
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


function EventShortcutListing() {
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


export default function Shortcuts() {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );
  return (
    <div className="mt-3 h-[calc(100vh-14.5rem)] flex flex-col rounded-lg bg-gray-900/70 border border-gray-700/50 text-white">
      <h2 className="sticky top-0 p-2 sm:p-4 text-white font-light text-lg sm:text-xl z-10">
        Shortcuts
      </h2>
      <div className="flex-1 overflow-y-auto">
        {isLoggedIn && <FavoritedEventsShortcut />}
        <EventShortcutListing />
      </div>
    </div>
  );
}
