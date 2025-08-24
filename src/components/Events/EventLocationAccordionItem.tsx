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
      <AccordionTrigger className="text-lg font-semibold">
        Event Location
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-6">
        {/*Venue */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Venue Name</Label>
          <Input
            placeholder="123 Main St..."
            value={location.venueName}
            onChange={(e) =>
              setEventLocation({
                ...location,
                venueName: e.target.value,
              })
            }
          />
        </div>


        {/* Address */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Address</Label>
          <Input
            placeholder="123 Main St..."
            value={location.address}
            onChange={(e) =>
              setEventLocation({
                ...location,
                address: e.target.value,
              })
            }
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">City</Label>
          <Input
            placeholder="Enter city..."
            value={location.city}
            onChange={(e) =>
              setEventLocation({
                ...location,
                city: e.target.value,
              })
            }
          />
        </div>

        {/* State + Zip in a row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">State</Label>
            <select
              value={location.state}
              onChange={(e) =>
                setEventLocation({ ...location, state: e.target.value })
              }
              className="rounded-xl border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>
                Select a state
              </option>
              {US_STATE_CODES.map((code: USStateCode) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Zip Code</Label>
            <Input
              type="number"
              placeholder="e.g. 90210"
              value={location.zipcode || ""}
              onChange={(e) =>
                setEventLocation({
                  ...location,
                  zipcode: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
