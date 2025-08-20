export type EventLocation = {
    venueName: string,
    address: string,
    city: string,
    state: string,
    zipcode: number
}

export type EventDetails = {
    eventName: string,
    description: string,
    eventType: string,
    startDate: string,
    endDate: string
}


export type Event = {
    id: string,
    location: EventLocation,
    details: EventDetails,
    imageUrls: {
        bannerUrl: string,
        avatarUrl: string
    }
}

export type EventCreation = {
    location: EventLocation,
    eventDetails: EventDetails,
    imageURLs: {
        bannerUrl: string,
        avatarUrl: string
    }
}
