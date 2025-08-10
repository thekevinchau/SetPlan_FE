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

export function parseDateRange(){
  
}