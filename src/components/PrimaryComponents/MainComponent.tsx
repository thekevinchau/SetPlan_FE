import { Link } from "react-router-dom";
import type { Event } from "../../types/eventTypes";
import EventCard from "../Events/EventCard";
import { IoCreateOutline } from "react-icons/io5";

interface MainComponentProps {
  events: Event[] | undefined;
  isPending: boolean;
  isFuture: boolean;
}

export default function MainComponent({
  events,
  isPending,
  isFuture,
}: MainComponentProps) {
  return (
    <div className="w-full h-[95.75vh] rounded-lg mt-4 text-white bg-gray-900/70 border border-gray-700/50 p-3 overflow-scroll">
      <div className="pb-4 border-b border-gray-600/50 space-y-4">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 mb-1 text-sm">Festivals</p>
            <Link to="/events/create" className="text-sm flex hover:text-blue-500 transition duration-300">
              Create Event<IoCreateOutline className="ml-2 text-xl" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold">
            🥳 Explore {isFuture ? "new " : "past "}
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              festivals
            </span>{" "}
            here!
          </h1>
        </div>

        {isFuture ? (
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Upcoming festivals</h2>
            <p className="text-sm text-gray-400">
              Festivals will appear below once the official lineup is released.
              Artists by day and set times are added as they become available.
            </p>
            <p className="text-sm text-gray-400">
              Don't see a festival here?
              <span className="text-blue-500 cursor-pointer ml-1 hover:underline">
                Let me know!
              </span>
            </p>
          </div>
        ) : (
          <div className="1">
            <h2 className="text-xl font-semibold">Past Festivals</h2>
            <p className="text-sm text-gray-400">
              Browse through all the past festivals listed on SetPlan!
            </p>
          </div>
        )}

        <input
          type="search"
          placeholder="Search events..."
          className="border border-gray-600 rounded-md min-w-1/4 max-w-1/2 h-1/2 p-3 bg-gray-800/50 text-gray-400 text-sm placeholder-gray-400"
          name="eventSearch"
        />
      </div>
      <div className="mt-4">
        {isPending ? (
          <p>Loading</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {events?.map((event: Event) => (
              <div key={event.id} className="">
                {/* fixed width */}
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
