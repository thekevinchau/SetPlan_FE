import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import type { EventLocation } from "@/types/eventTypes";
import { US_STATE_CODES, type USStateCode } from "@/utils/utils";

interface EventDetailsAccordionProps {
  location: EventLocation;
  setEventLocation: (details: EventLocation) => void;
}

export default function EventLocationAccordionItem({
  location,
  setEventLocation,
}: EventDetailsAccordionProps) {
  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>Event Location</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <Label>Event Address</Label>
        <Input
          placeholder="Event name..."
          value={location.address}
          onChange={(e) =>
            setEventLocation({
              ...location,
              address: e.target.value,
            })
          }
        />
        <Label>Event City</Label>
        <Input
          placeholder="Event name..."
          value={location.city}
          onChange={(e) =>
            setEventLocation({
              ...location,
              city: e.target.value,
            })
          }
        />
        <Label>Event State</Label>
        <select
          value={location.state}
          onChange={(e) =>
            setEventLocation({ ...location, state: e.target.value })
          }
          className="border w-1/4"
        >
          {US_STATE_CODES.map((code: USStateCode) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <span>
          <Label>Zip Code</Label>
          <Input
            type="number"
            onChange={(e) =>
              setEventLocation({ ...location, zipcode: Number(e.target.value) })
            }
          />
        </span>
      </AccordionContent>
    </AccordionItem>
  );
}
