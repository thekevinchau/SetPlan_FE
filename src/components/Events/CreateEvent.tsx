import type { EventDetails, EventLocation } from "@/types/eventTypes";
import { useState } from "react";
import { Accordion } from "../ui/accordion";
import EventDetailsAccordionItem from "./EventDetailsAccordionItem";
import EventLocationAccordionItem from "./EventLocationAccordionItem";

/*
TODO LIST FOR EVENT CREATION

1. Create an accordion that opens up each component when they're clicked
    - Event Details should by default, be open, and the rest closed
2. Create each component
    - One for event details and event location and eventually imageURLs
3. Effectively manage the state for each section and then combine them together
into a request object to send to our backend

*/
export default function CreateEvent() {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    eventName: "",
    description: "",
    eventType: "",
    startDate: "",
    endDate: "",
  });
  const [eventLocation, setEventLocation] = useState<EventLocation>({
    venueName: "",
    address: "",
    city: "",
    state: "",
    zipcode: 0,
  });

  return (
    <div className="w-full h-[95.75vh] rounded-lg mt-4 text-white bg-gray-900/70 border border-gray-700/50 p-3 overflow-scroll">
      <div className="border w-1/2 h-full flex flex-col items-center p-2">
        <h1>Create New Event</h1>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <EventDetailsAccordionItem
            eventDetails={eventDetails}
            setEventDetails={setEventDetails}
          />
          <EventLocationAccordionItem
            location={eventLocation}
            setEventLocation={setEventLocation}
          />
        </Accordion>

        <div></div>
      </div>
    </div>
  );
}
