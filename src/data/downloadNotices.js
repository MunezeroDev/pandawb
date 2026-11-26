import appleLogo from "../assets/images/icons/apple-logo.png";

const AUTO_DISMISS_MS = 5000;

/** Popups shown by the download button, keyed by detected platform. */
export const DOWNLOAD_NOTICES = {
  ios: {
    iconSrc: appleLogo,
    iconAlt: "iOS",
    title: "Panda is currently not available on iOS.",
    body: "We're currently developing the iOS version. Stay tuned for updates.",
    dismissAfter: AUTO_DISMISS_MS,
  },
  desktop: {
    emoji: "💻",
    title: "Panda is designed for mobile devices.",
    body: "A desktop version will be available soon.",
    dismissAfter: AUTO_DISMISS_MS,
  },
  server: {
    emoji: "⚠️",
    title: "Seems like our servers are down.",
    body: "Try again in a minute.",
    dismissAfter: AUTO_DISMISS_MS,
  },
  android: {
    title: "Before you install",
    bullets: [
      "This file is safe. Panda is just not on the Play Store yet.",
      'You may need to allow "Install unknown apps" or "Allow from this source" when prompted.',
      "Your browser will handle the download.",
    ],
    // Stays open until the user confirms; confirming starts the download.
    requiresConfirm: true,
    dismissAfter: null,
  },
};
