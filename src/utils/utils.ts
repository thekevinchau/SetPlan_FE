
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