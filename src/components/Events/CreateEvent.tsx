import type { EventDetails, EventLocation } from "@/types/eventTypes";
import { useState, type ChangeEvent } from "react";
import { Accordion } from "../ui/accordion";
import EventDetailsAccordionItem from "./EventDetailsAccordionItem";
import EventLocationAccordionItem from "./EventLocationAccordionItem";
import EventImgUploadAccordion from "./EventImgUploadAccordion";

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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(e.target.files[0]);
    }
  };
  const handleBannerFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBannerFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Accordion
        type="single"
        collapsible
        className="w-full bg-gray-800/40 rounded-md pl-2 pr-2"
      >
        <EventDetailsAccordionItem
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        <EventLocationAccordionItem
          location={eventLocation}
          setEventLocation={setEventLocation}
        />
        <EventImgUploadAccordion
          handleAvatarFileChange={handleAvatarFileChange}
          handleBannerFileChange={handleBannerFileChange}
        />
        <p>{avatarFile?.type}</p>
        <p>{bannerFile?.type}</p>
      </Accordion>
      <p>{eventDetails.description}</p>

      <div></div>
    </div>
  );
}
