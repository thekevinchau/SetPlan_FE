import { unfavoriteEvent } from "@/api/events";
import type { Event } from "@/types/eventTypes";
import { useQueryClient } from "@tanstack/react-query";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

interface FavoriteEventsProps {
  favoriteEvents: Event[];
  isEditMode: boolean;
}

export default function FavoriteEvents({
  favoriteEvents,
  isEditMode,
}: FavoriteEventsProps) {
  const queryClient = useQueryClient();

  const unfavoriteEventFn = async (id: string) => {
    try {
      await unfavoriteEvent(id);
      queryClient.invalidateQueries({
        queryKey: ["favorited-events"] as const,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-3">
        Favorite Festivals
      </h3>

      {!favoriteEvents?.length ? (
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">No favorite events yet</p>
          <p className="text-gray-500 text-xs mt-1">
            Start exploring festivals to add favorites!
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {favoriteEvents.map((event: Event, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-xs text-gray-100 truncate flex-1">
                {event.details.eventName}
              </span>

              <div className="flex items-center gap-2">
                <Link
                  to={`/schedules/${event.id}`}
                  className="p-1 hover:text-blue-400 transition-colors"
                >
                  {isEditMode === false && (
                    <RiCalendarScheduleLine className="w-4 h-4 text-gray-400" />
                  )}
                </Link>

                {isEditMode === true && (
                  <button
                    onClick={() => unfavoriteEventFn(event.id)}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <FaRegTrashCan className="w-4 h-4 text-gray-400 cursor-pointer" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
