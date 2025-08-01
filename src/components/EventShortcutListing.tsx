import SideBarEvent from "./SideBarEvent";


type MusicEvent = {
  name: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;
};

const musicEvents: MusicEvent[] = [
  {
    name: "Coachella",
    startDate: "2025-04-11",
    endDate: "2025-04-20",
  },
  {
    name: "Tomorrowland",
    startDate: "2025-07-18",
    endDate: "2025-07-27",
  },
  {
    name: "EDC Las Vegas",
    startDate: "2025-05-16",
    endDate: "2025-05-18",
  },
  {
    name: "Lollapalooza",
    startDate: "2025-08-01",
    endDate: "2025-08-04",
  },
  {
    name: "Ultra Music Festival",
    startDate: "2025-03-28",
    endDate: "2025-03-30",
  },
    {
    name: "Ultra Music Festival",
    startDate: "2025-03-28",
    endDate: "2025-03-30",
  }
];

export default function EventShortcutListing(){
    return (
        <div className="mb-3 max-h-[30vh] md:h-3/4">
            <div className="px-2 sm:px-4">
                <h3 className="text-xs">Upcoming Events</h3>
                {musicEvents.length > 0 ? (
                    musicEvents.map((event, index) => (
                        <SideBarEvent
                            key={index}
                            name={event.name}
                            startDate={event.startDate}
                            endDate={event.endDate}
                        />
                    ))
                ) : (
                    <p className="text-xs text-gray-500">No favorite events added!</p>
                )}
            </div>
        </div>
    );
}