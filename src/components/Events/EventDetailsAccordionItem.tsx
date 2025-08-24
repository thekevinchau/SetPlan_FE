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
      <AccordionTrigger className="text-lg font-semibold">
        Event Details
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-6 p-4">
        {/* Event Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Event Name</Label>
          <Input
            placeholder="Event name..."
            value={eventDetails.eventName}
            onChange={(e) =>
              setEventDetails({
                ...eventDetails,
                eventName: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Event Description</Label>
          <textarea
            placeholder="Describe this awesome event!"
            className="w-full min-h-[120px] rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={eventDetails.description}
            onChange={(e) =>
              setEventDetails({
                ...eventDetails,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Event Type */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Event Type</Label>
          <div className="flex justify-evenly">
            {["Solo", "Festival", "Tour"].map((type) => (
              <Button
                key={type}
                type="button"
                onClick={() =>
                  setEventDetails({ ...eventDetails, eventType: type })
                }
                className={`bg-white border-3 border-blue-500 rounded-xl px-4 py-2 text-black w-1/4 h-48 ${
                  eventDetails.eventType === type && "border border-white"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Start Date</Label>
            <Input
              type="datetime-local"
              value={
                eventDetails.startDate
                  ? eventDetails.startDate.slice(0, 16)
                  : ""
              }
              onChange={(e) => {
                const localDateTime = e.target.value; // "2025-08-27T07:18"
                const isoString = new Date(localDateTime).toISOString(); // "2025-08-27T11:18:00.000Z"
                setEventDetails({
                  ...eventDetails,
                  startDate: isoString,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">End Date</Label>
            <Input
              type="datetime-local"
              value={
                eventDetails.endDate ? eventDetails.endDate.slice(0, 16) : ""
              }
              onChange={(e) => {
                const localDateTime = e.target.value;
                const isoString = new Date(localDateTime).toISOString();
                setEventDetails({
                  ...eventDetails,
                  endDate: isoString, // ✅ fixed!
                });
              }}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
