import { useSelector } from "react-redux";
import EventShortcutListing from "./EventShortcutListing";
import FavoritedEventsShortcut from "./FavoritedEventsShortcut";
import type { RootState } from "@/redux/store";

export default function Shortcuts() {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );
  return (
    <div className="mt-3 h-[calc(100vh-14.5rem)] flex flex-col rounded-lg bg-gray-900/70 border border-gray-700/20 text-white">
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
