import SideBarEvent from "./SideBarEvent";
import type { SimpleEvent } from '@/types/eventTypes';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';


export default function FavoritedEventsShortcut(){
  const userFavoritedEvents: SimpleEvent[] | null | undefined = useSelector((state: RootState ) => state.currentUser.userProfile?.favoriteEvents )
    return (
        <div className="mb-2">
            <div className="px-2 sm:px-4">
                <h3 className="text-xs text-white mb-1">Favorited Events</h3>
                {userFavoritedEvents && userFavoritedEvents?.length > 0 ? (
                    userFavoritedEvents?.map((event) => (
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