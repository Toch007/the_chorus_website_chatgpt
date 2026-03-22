# 🎫 Solomon Concert - Ticket Inventory Tracker

**Event Date**: November 16, 2025  
**Red Carpet**: 4:00 PM | **Concert Start**: 5:00 PM  
**Venue**: Nigerian Society of Engineers Hall, Abuja  
**Last Updated**: November 13, 2025

---

## 📊 Current Ticket Availability

| Ticket Type | Price    | Remaining | Status          | Perks                 |
| ----------- | -------- | --------- | --------------- | --------------------- |
| Bronze      | ₦10,000  | **5**     | 🔴 Almost Gone! | Standard Entry        |
| Silver      | ₦30,000  | **10**    | 🟡 Selling Fast | Premium Seating       |
| Gold        | ₦50,000  | **10**    | 🟡 Selling Fast | Admits 2 Persons      |
| Diamond     | ₦100,000 | **15**    | 🟢 Available    | Admits 2 Persons, VIP |
| **TOTAL**   |          | **40**    | 8 Days to Go!   |                       |

---

## 🎯 Sales Performance

### Top Seller: **Bronze Tickets** 🏆

- Most affordable option driving sales
- **95% SOLD** - Only 5 remaining!

### Strategy Recommendation:

✅ Highlight Bronze scarcity to drive Silver/Gold upgrades  
✅ Bundle messaging: "Bronze sold out? Upgrade to Silver!"  
✅ Consider early-bird pricing for next event

---

## 📝 How to Update Ticket Counts

When tickets sell, update this file in:

**File**: `app/events/solomon/page.tsx`

```typescript
const solomonTickets: Ticket[] = [
  {
    name: "Bronze",
    price: 10000,
    perks: ["⚡ Only 5 left!"], // ← UPDATE HERE
    color: "bg-amber-500",
  },
  // ... update other tickets
];
```

**And update the countdown message** (around line 80):

```tsx
⚡ Only 40 tickets remaining! Bronze selling fast - just 5 left!
//        ↑ Total          Update this →                    ↑ Bronze count
```

---

## 🚀 Quick Update Instructions

### When a ticket type sells out:

1. Change perks to: `["🚫 SOLD OUT"]`
2. Update total count in countdown
3. Consider adding waitlist messaging

### When total < 20 tickets remain:

Update urgency message to:

```tsx
⚡ FINAL 20 TICKETS! Event in X days - Secure yours NOW!
```

### When total < 10 tickets remain:

```tsx
🔥 LAST CHANCE! Only X tickets left for this historic performance!
```

---

## 📞 Contact for Ticket Support

**Mr Raphael**: 0813 109 3319  
**Engr Samuel**: 0813 557 8298

---

## 💡 Marketing Tips

### For Bronze Buyers:

- "Most popular choice!"
- "Best value - almost sold out!"
- "Join 95+ others who've already secured Bronze"

### For Silver/Gold Buyers:

- "Premium experience - better seats"
- "Admits 2 persons - bring a friend!"
- "Exclusive seating area"

### For Diamond Buyers:

- "VIP treatment for Abuja's premier concert"
- "Support the arts at the highest level"
- "Limited to 15 exclusive patrons"

---

**Remember**: Update this file AND the website when selling tickets manually!
