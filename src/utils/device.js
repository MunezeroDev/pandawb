/**
 * Rough platform detection from the user agent, used to pick which
 * download notice to show: "ios" | "desktop" | "android".
 */
export function detectPlatform(ua = navigator.userAgent) {
  if (/iPhone|iPod/i.test(ua)) return "ios";

  const isDesktop =
    /Win/i.test(ua) ||
    (/Macintosh/i.test(ua) && !/iPhone|iPad/i.test(ua)) ||
    (/Linux/i.test(ua) && !/Android/i.test(ua));

  const isTablet =
    /iPad/i.test(ua) || (/Android/i.test(ua) && !/mobile/i.test(ua));

  if (isDesktop || isTablet) return "desktop";
  return "android";
}

/** Starts a browser download of `url` saved as `filename`. */
export function downloadFile(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
