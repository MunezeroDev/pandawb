/**
 * Turns a Dropbox share link into a direct (raw) file URL.
 * Returns null for empty slots so the UI can show a placeholder.
 */
export const dropboxRaw = (url) =>
  url
    ? url
        .replace(/[?&]dl=[01]/, "")
        .concat(url.includes("?") ? "&raw=1" : "?raw=1")
    : null;

/** `n` empty media slots, filled in later with Dropbox links. */
export const emptySlots = (n) => Array(n).fill(null);
