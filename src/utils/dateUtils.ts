import type { Event } from "@/types/eventTypes";

export function getWeeksBetweenDates(todayDate: Date, createdDate: Date) {
  const diffInMs = Math.abs(todayDate.getTime() - createdDate.getTime());
  const msInOneWeek = 1000 * 60 * 60 * 24 * 7;
  const weeks = Math.floor(diffInMs / msInOneWeek);
  return weeks;
}

export function isWithinWeek(todayDate: Date, createdDate: Date) {
  const diffInMs = Math.abs(todayDate.getTime() - createdDate.getTime());
  const msInOneWeek = 1000 * 60 * 60 * 24 * 7;

  if (diffInMs < msInOneWeek) {
    return true;
  } else {
    return false;
  }
}

export function filterEventsByMonth(month: number, oldEvents: Event[] | undefined){
  if (oldEvents === undefined){
    return [];
  }
  return oldEvents.filter((event: Event) => {
    const eventMonth: number = new Date(event.details.startDate).getUTCMonth() + 1;
    return eventMonth === month
  })
}