import { GOOGLE_FORM_URL } from "../constants/links";

/** How long the registration form stays up after the event starts. */
export const FORM_VISIBLE_HOURS = 72;

/**
 * The next event people can register for. To open a new one, update
 * `startsAt` (ISO date with timezone) and `formUrl`; the form hides itself
 * FORM_VISIBLE_HOURS after `startsAt`. Set to null when nothing is planned.
 */
export const UPCOMING_EVENT = {
  title: "Panda Event Registration",
  startsAt: "2026-06-06T09:00:00+03:00",
  formUrl: GOOGLE_FORM_URL,
};
