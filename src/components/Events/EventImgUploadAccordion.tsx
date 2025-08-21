import type { ChangeEvent } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


type EventImgUploadProps = {
    handleAvatarFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleBannerFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function EventImgUploadAccordion(
    {handleAvatarFileChange
        ,handleBannerFileChange}: EventImgUploadProps ){
  return (
    <AccordionItem value="item-3">
      <AccordionTrigger className="text-lg font-semibold">
        Event Images
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-6 p-4">
        <Label>Avatar</Label>
        <Input type="file" onChange={handleAvatarFileChange}/>

        <Label>Banner</Label>
        <Input type="file" onChange={handleBannerFileChange} />
      </AccordionContent>
    </AccordionItem>
  );
}
