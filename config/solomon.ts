/**
 * SOLOMON EVENT STATUS TOGGLE
 *
 * Use this to quickly switch between "BEFORE" and "AFTER" concert modes
 *
 * BEFORE CONCERT: Show ticket sales, countdown, urgency
 * AFTER CONCERT: Show thank you message, redirect to gratitude page
 */

// ============================================
// CONFIGURATION
// ============================================

export const SOLOMON_EVENT_CONFIG = {
  // Toggle this to switch modes
  EVENT_COMPLETE: false, // Set to TRUE after concert on Nov 16

  // Event details
  EVENT_DATE: "2025-11-16T18:00:00",
  EVENT_NAME: "Handel's Solomon",

  // Ticket inventory (update as tickets sell)
  TICKETS: {
    bronze: { remaining: 5, total: 100 },
    silver: { remaining: 10, total: 50 },
    gold: { remaining: 10, total: 30 },
    diamond: { remaining: 15, total: 20 },
  },

  // Post-event statistics (update after concert)
  POST_EVENT_STATS: {
    attendees: 500, // Update with actual count
    duration: "2.5 Hours",
    performers: 60,
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get total remaining tickets
 */
export function getTotalRemainingTickets() {
  const { TICKETS } = SOLOMON_EVENT_CONFIG;
  return (
    TICKETS.bronze.remaining +
    TICKETS.silver.remaining +
    TICKETS.gold.remaining +
    TICKETS.diamond.remaining
  );
}

/**
 * Get ticket with lowest availability (for urgency messaging)
 */
export function getLowestAvailabilityTicket() {
  const { TICKETS } = SOLOMON_EVENT_CONFIG;
  const tickets = [
    { name: "Bronze", remaining: TICKETS.bronze.remaining },
    { name: "Silver", remaining: TICKETS.silver.remaining },
    { name: "Gold", remaining: TICKETS.gold.remaining },
    { name: "Diamond", remaining: TICKETS.diamond.remaining },
  ];

  return tickets.reduce((lowest, current) =>
    current.remaining < lowest.remaining ? current : lowest
  );
}

/**
 * Get urgency message based on remaining tickets
 */
export function getUrgencyMessage() {
  const total = getTotalRemainingTickets();
  const lowest = getLowestAvailabilityTicket();

  if (total === 0) {
    return "🎉 SOLD OUT! Thank you for your support!";
  }

  if (total < 10) {
    return `🔥 FINAL ${total} TICKETS! Last chance to secure your seat!`;
  }

  if (total < 20) {
    return `⚡ Only ${total} tickets left! ${lowest.name} selling fast - just ${lowest.remaining} remaining!`;
  }

  if (total < 50) {
    return `⚡ Only ${total} tickets remaining! ${lowest.name} selling fast - just ${lowest.remaining} left!`;
  }

  return `Limited tickets available! Get yours before they're gone!`;
}

/**
 * Check if event should show thank you page
 */
export function shouldShowThankYouPage() {
  const { EVENT_COMPLETE, EVENT_DATE } = SOLOMON_EVENT_CONFIG;

  // Manual override
  if (EVENT_COMPLETE) return true;

  // Auto-check if event date has passed
  const eventDate = new Date(EVENT_DATE);
  const now = new Date();

  return now > eventDate;
}

// ============================================
// QUICK REFERENCE
// ============================================

/**
 * HOW TO USE:
 *
 * 1. DURING TICKET SALES (Before Nov 16):
 *    - Keep EVENT_COMPLETE: false
 *    - Update TICKETS.*.remaining as tickets sell
 *    - Use getTotalRemainingTickets() for messaging
 *
 * 2. AFTER CONCERT (Nov 16+):
 *    - Set EVENT_COMPLETE: true
 *    - Update POST_EVENT_STATS with actual numbers
 *    - Solomon page will auto-redirect to thank you
 *
 * 3. IMPORT IN COMPONENTS:
 *    import { SOLOMON_EVENT_CONFIG, getUrgencyMessage } from '@/config/solomon';
 *
 *    const message = getUrgencyMessage();
 *    const isComplete = shouldShowThankYouPage();
 */

export default SOLOMON_EVENT_CONFIG;
