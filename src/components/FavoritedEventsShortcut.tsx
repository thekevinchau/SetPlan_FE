import SideBarEvent from "./SideBarEvent";
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useQuery } from "@tanstack/react-query";
import { getUserFavoriteEvents } from "@/api/events";


export default function FavoritedEventsShortcut(){
  const currentUserId: string | null | undefined = useSelector((state: RootState ) => state.currentUser.userProfile?.id )
  const { data, isPending } = useQuery({
    queryKey: ["favorited-events"],
    queryFn: () => getUserFavoriteEvents(currentUserId != null ? currentUserId : '')
  })
    return (
        <div className="mb-2">
            <div className="px-2 sm:px-4">
                <h3 className="text-xs text-white mb-1">Favorited Events</h3>
                {isPending ? <p>Loading....</p> : data && data?.length > 0 ? (
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