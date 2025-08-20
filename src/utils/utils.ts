
export function urlParser(link: string) {
  let path = "";
  let baseUrl = "";
  try {
    const urlObj = new URL(link);
    const segments = urlObj.pathname.split("/");
    path = segments.pop() || segments.pop() || "";
    baseUrl = urlObj.origin;
    return { baseUrl: baseUrl, path: path}
  } catch {
    return { baseUrl: "", path: link}

  }
}

export const US_STATE_CODES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
] as const;

export type USStateCode = typeof US_STATE_CODES[number];