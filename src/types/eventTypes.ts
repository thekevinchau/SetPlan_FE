type eventLocation = {
    venueName: string,
    address: string,
    city: string,
    state: string,
    zipcode: number
}

type details = {
    eventName: string,
    description: string,
    eventType: string,
    startDate: string,
    endDate: string
}


export type Event = {
    id: string,
    location: eventLocation,
    details: details,
    imageUrls: {
        bannerUrl: string,
        avatarUrl: string
    }
}

export type AllEventsResponse = {
    events: Event[]
}