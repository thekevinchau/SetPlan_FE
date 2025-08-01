import EventShortcutListing from "./EventShortcutListing";
import FavoritedEventsShortcut from "./FavoritedEventsShortcut";

export default function Shortcuts() {
  return (
    <div className="mt-3 h-[calc(100%-theme('spacing.4')-theme('spacing.16'))] overflow-y-auto rounded-lg bg-gray-800/50 border border-gray-600/20 text-white">
      <h2 className="p-2 sm:p-4 text-white font-medium text-lg sm:text-xl">Shortcuts</h2>
      <FavoritedEventsShortcut/>
      <EventShortcutListing/>
    </div>
  );
}
