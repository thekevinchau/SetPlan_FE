import { v4 as uuidv4 } from 'uuid';
import SideBarEvent from "./SideBarEvent";

type MusicEvent = {
  id: string;
  name: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;
};

const musicEvents: MusicEvent[] = [
  {
    id: uuidv4(),
    name: "Coachella",
    startDate: "2025-04-11",
    endDate: "2025-04-20",
  },
  {
    id: uuidv4(),
    name: "Tomorrowland",
    startDate: "2025-07-18",
    endDate: "2025-07-27",
  }
];


export default function FavoritedEventsShortcut(){
    return (
        <div className="mb-2">
            <div className="px-2 sm:px-4">
                <h3 className="text-xs text-gray-400 mb-1">Favorited Events</h3>
                {musicEvents.length > 0 ? (
                    musicEvents.map((event) => (
                        <SideBarEvent
                            key={event.id}
                            id={event.id}
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