import { useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Accordion } from "../ui/accordion";
import EventDetailsAccordionItem from "./EventDetailsAccordionItem";
import EventLocationAccordionItem from "./EventLocationAccordionItem";
import EventImgUploadAccordion from "./EventImgUploadAccordion";
import {
  createEvent,
  generateEventPresignedUrl,
  uploadEventImageToS3,
} from "@/api/events";
import { cloudfront_url } from "@/config";
import type {
  EventCreation,
  EventDetails,
  EventLocation,
} from "@/types/eventTypes";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setter(e.target.files[0]);
      }
    };

  async function generatePresignedUrls(
    id: string
  ): Promise<{ avatarUrl?: string; bannerUrl?: string }> {
    const urls: { avatarUrl?: string; bannerUrl?: string } = {};

    if (avatarFile) {
      urls.avatarUrl = await generateEventPresignedUrl(id, "Avatar", avatarFile.type);
    }
    if (bannerFile) {
      urls.bannerUrl = await generateEventPresignedUrl(id, "Banner", bannerFile.type);
    }

    return urls;
  }

  async function submitEvent() {
    setIsSubmitting(true);
    setError(null);

    const id = uuidv4();

    try {
      const presignedUrls = await generatePresignedUrls(id);

      if (presignedUrls.avatarUrl && avatarFile) {
        await uploadEventImageToS3(presignedUrls.avatarUrl, avatarFile);
      }
      if (presignedUrls.bannerUrl && bannerFile) {
        await uploadEventImageToS3(presignedUrls.bannerUrl, bannerFile);
      }

      const eventRequest: EventCreation = {
        id,
        eventDetails,
        location: eventLocation,
        imageURLs: {
          avatarUrl: `${cloudfront_url}/events/avatars/${id}`,
          bannerUrl: `${cloudfront_url}/events/banners/${id}`, // ✅ fixed
        },
      };

      await createEvent(eventRequest);
    } catch (err) {
      console.error(err);
      setError("Something went wrong creating your event. Please try again.");
    } finally {
      setIsSubmitting(false);
      setModalOpen(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        defaultChecked={isModalOpen}
        className="w-full  rounded-md pl-2 pr-2"
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
          handleAvatarFileChange={handleFileChange(setAvatarFile)}
          handleBannerFileChange={handleFileChange(setBannerFile)}
        />
      </Accordion>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={submitEvent}
        disabled={isSubmitting}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
