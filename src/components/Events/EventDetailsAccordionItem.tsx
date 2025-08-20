import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import type { EventDetails } from "@/types/eventTypes";

interface EventDetailsAccordionProps {
  eventDetails: EventDetails;
  setEventDetails: (details: EventDetails) => void;
}

export default function EventDetailsAccordionItem({
  eventDetails,
  setEventDetails,
}: EventDetailsAccordionProps) {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>Event Details</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <Label>Event Name</Label>
        <Input
          placeholder="Event name..."
          value={eventDetails.eventName}
          onChange={(e) =>
            setEventDetails({
              ...eventDetails,
              eventName: e.target.value,
            })
          }
        />
        <Label>Event Description</Label>
        <textarea
          placeholder="Describe this awesome event!"
          className="w-full h-3/4 border rounded-md mt-2 p-2"
          value={eventDetails.description}
          onChange={(e) =>
            setEventDetails({
              ...eventDetails,
              description: e.target.value,
            })
          }
        />
        <Label>Event Type</Label>
        <div className="flex">
          <Button
            type="button"
            onClick={() =>
              setEventDetails({ ...eventDetails, eventType: "Solo" })
            }
          >
            Solo
          </Button>
          <Button
            type="button"
            onClick={() =>
              setEventDetails({ ...eventDetails, eventType: "Festival" })
            }
          >
            Festival
          </Button>
          <Button
            type="button"
            onClick={() =>
              setEventDetails({ ...eventDetails, eventType: "Tour" })
            }
          >
            Tour
          </Button>
        </div>
        <div className="flex">
          <span>
            {" "}
            <Label>Start Date</Label>
            <Input
              type="datetime-local"
              onChange={(e) =>
                setEventDetails({ ...eventDetails, startDate: e.target.value })
              }
            />
          </span>
          <span>
            <Label>End Date</Label>
            <Input
              type="datetime-local"
              onChange={(e) =>
                setEventDetails({ ...eventDetails, endDate: e.target.value })
              }
            />
          </span>
        </div>
        {eventDetails.eventName}
      </AccordionContent>
    </AccordionItem>
  );
}