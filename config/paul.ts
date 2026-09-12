/**
 * PAUL EVENT STATUS TOGGLE
 *
 * Use this to switch the site from "selling tickets" mode to "thank you" mode
 * once the concert (Mendelssohn's Paul, Sept 13, 2026) is over.
 *
 * BEFORE CONCERT: Show ticket sales, countdown, event details
 * AFTER CONCERT: Show thank you message, hide ticket CTAs
 *
 * HOW TO USE:
 *   1. Set EVENT_COMPLETE to true below (or just wait — it auto-flips once
 *      EVENT_DATE has passed).
 *   2. Deploy. /events/paul and /events/paul/tickets will redirect visitors
 *      to /events/paul/thank-you, and the sticky ticket bar / popup modal
 *      will stop appearing site-wide.
 */

export const PAUL_EVENT_CONFIG = {
  // Manual override — set to TRUE right after the concert to switch instantly
  EVENT_COMPLETE: false,

  EVENT_DATE: "2026-09-13T17:00:00",
  EVENT_NAME: "Mendelssohn's Paul",
};

/**
 * Check if the site should show thank-you mode instead of ticket sales mode.
 */
export function shouldShowThankYouPage() {
  const { EVENT_COMPLETE, EVENT_DATE } = PAUL_EVENT_CONFIG;

  // Manual override
  if (EVENT_COMPLETE) return true;

  // Auto-check if event date has passed
  const eventDate = new Date(EVENT_DATE);
  const now = new Date();

  return now > eventDate;
}

export default PAUL_EVENT_CONFIG;
