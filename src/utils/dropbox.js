/**
 * Turns a Dropbox share link into a direct (raw) file URL. Other URLs (e.g.
 * bundled assets) pass through unchanged; null stays null so the UI can show
 * a placeholder.
 */
export const dropboxRaw = (url) =>
  url && url.includes("dropbox.com")
    ? url
        .replace(/[?&]dl=[01]/, "")
        .concat(url.includes("?") ? "&raw=1" : "?raw=1")
    : url ?? null;
