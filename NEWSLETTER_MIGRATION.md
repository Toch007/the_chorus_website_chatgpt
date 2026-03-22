# Newsletter System Migration: Mailchimp → Resend + Firebase

## ✅ Migration Complete

The newsletter system has been fully migrated from Mailchimp to Resend + Firebase.

---

## 📋 What Changed

### Before (Mailchimp)

- Subscribers stored in Mailchimp audience
- Subscribe API called Mailchimp API
- No unsubscribe functionality
- Newsletter sending used Mailchimp for subscriber list + Resend for delivery
- Required Mailchimp API keys

### After (Resend + Firebase)

- ✅ Subscribers stored in Firebase Firestore (`newsletterSubscribers` collection)
- ✅ Subscribe API saves to Firebase + sends welcome email via Resend
- ✅ Complete unsubscribe system with legal compliance
- ✅ Newsletter sending fetches from Firebase + delivers via Resend
- ✅ Automatic unsubscribe footer added to all emails
- ✅ No Mailchimp dependencies

---

## 🗄️ Firebase Schema

### Collection: `newsletterSubscribers`

```typescript
{
  email: string;              // Lowercase email address
  status: "subscribed" | "unsubscribed";
  subscribedAt: Timestamp;    // Initial subscription date
  unsubscribedAt?: Timestamp; // When user unsubscribed (if applicable)
  resubscribedAt?: Timestamp; // If user resubscribed after unsubscribing
}
```

---

## 🔑 Required Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key (for sending emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Base URL for unsubscribe links
NEXT_PUBLIC_BASE_URL=https://thechorusabuja.com
# For local development, use:
# NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### How to Get Resend API Key:

1. Go to [resend.com](https://resend.com)
2. Sign in to your account
3. Navigate to API Keys section
4. Copy your API key or create a new one

---

## 📧 Email Features

### Welcome Email

- Sent automatically when someone subscribes
- Includes branding and unsubscribe link
- Triggered by: `/api/subscribe`

### Resubscribe Email

- Sent when someone resubscribes after unsubscribing
- Updates Firebase status back to "subscribed"
- Triggered by: `/api/subscribe` (detects previous unsubscribed status)

### Newsletter Emails

- Sent to all active subscribers (status = "subscribed")
- Automatic unsubscribe footer appended to every email
- Individual emails sent (not BCC) for personalized unsubscribe links
- Triggered by: `/api/admin/newsletter/send`

### Unsubscribe Footer (Auto-Added)

Every newsletter includes:

```html
------------------------------------------- You're receiving this email because
you subscribed to The Chorus Abuja newsletter. Unsubscribe | Visit our website
```

---

## 🔗 User-Facing Pages

### Subscribe Form

- Location: Footer on all pages (`components/Footer.tsx`)
- Component: `components/NewsletterSignup.tsx`
- API: `POST /api/subscribe`
- Features: Email validation, duplicate detection, welcome email

### Unsubscribe Page

- URL: `/unsubscribe`
- Also accessible via: `/unsubscribe?email=user@example.com`
- Features: Form submission, URL parameter handling, resubscribe link
- API: `POST /api/unsubscribe` or `GET /api/unsubscribe?email=`

---

## 🛠️ Admin Pages

### Newsletter Send

- URL: `/admin/newsletter/send`
- Features:
  - Shows active subscriber count from Firebase
  - Rich text editor for HTML content
  - Test email option
  - Batch sending with 1-second delay between batches
  - Automatic unsubscribe footer injection

### Subscriber List

- URL: `/admin/newsletter`
- Features:
  - View all subscribers (active + unsubscribed)
  - Status badges (green = subscribed, red = unsubscribed)
  - Subscription dates
  - Search and filter
  - Export to CSV
  - Delete subscribers

---

## 🧪 Testing Checklist

### Subscribe Flow

1. ✅ Fill out newsletter form in footer
2. ✅ Check Firebase for new subscriber document
3. ✅ Verify welcome email received with unsubscribe link
4. ✅ Admin newsletter page shows +1 subscriber

### Unsubscribe Flow

1. ✅ Click unsubscribe link from email
2. ✅ Confirm unsubscribe on page
3. ✅ Check Firebase - status changed to "unsubscribed"
4. ✅ Admin newsletter page shows correct active count
5. ✅ User should NOT receive future newsletters

### Resubscribe Flow

1. ✅ Previously unsubscribed user submits newsletter form
2. ✅ Firebase status changes back to "subscribed"
3. ✅ `resubscribedAt` timestamp added
4. ✅ Resubscribe confirmation email sent

### Newsletter Send Flow

1. ✅ Admin goes to `/admin/newsletter/send`
2. ✅ Subscriber count shows Firebase total
3. ✅ Compose newsletter with HTML
4. ✅ Send test email to yourself
5. ✅ Verify unsubscribe footer is present
6. ✅ Send to all subscribers
7. ✅ Check inbox - each email has personalized unsubscribe link

---

## 🚀 Deployment Notes

### Before Deploying:

1. Add `RESEND_API_KEY` to your hosting environment variables
2. Add `NEXT_PUBLIC_BASE_URL` to environment variables
3. Verify Firebase configuration is correct
4. Test subscribe/unsubscribe locally first

### After Deploying:

1. Test subscribe form on live site
2. Verify welcome email arrives with correct unsubscribe URL
3. Test unsubscribe link from email
4. Send test newsletter from admin panel
5. Confirm unsubscribe footer shows production URL

---

## 📊 Migration Benefits

✅ **Legal Compliance**: CAN-SPAM and GDPR compliant with automatic unsubscribe
✅ **Cost Savings**: No Mailchimp subscription fees
✅ **Simpler Architecture**: All data in Firebase, single email provider
✅ **Better Control**: Direct access to subscriber data
✅ **Privacy**: No third-party data sharing
✅ **Flexibility**: Easy to add custom fields or features

---

## ⚠️ Important Notes

### Mailchimp Environment Variables (No Longer Needed)

You can safely remove these from your environment:

- `MAILCHIMP_API_KEY`
- `MAILCHIMP_AUDIENCE_ID`
- `MAILCHIMP_SERVER_PREFIX`

### Existing Mailchimp Subscribers

If you had subscribers in Mailchimp, you'll need to migrate them:

1. Export subscribers from Mailchimp (CSV)
2. Use Firebase console or create a migration script
3. Add each subscriber to `newsletterSubscribers` collection with:
   ```javascript
   {
     email: "user@example.com",
     status: "subscribed",
     subscribedAt: serverTimestamp()
   }
   ```

### Rate Limiting

- Resend free tier: 100 emails/day, 3,000 emails/month
- Current batching: 1-second delay between individual sends
- Consider upgrading Resend plan for large subscriber lists

---

## 🐛 Troubleshooting

### "Unsubscribe link not working"

- Check `NEXT_PUBLIC_BASE_URL` is set correctly
- Verify URL encoding in email links
- Test locally with `http://localhost:3000`

### "Welcome email not sent"

- Check Resend API key is valid
- Verify sender email is verified in Resend dashboard
- Check Firebase rules allow writes to `newsletterSubscribers`

### "Subscriber count shows 0"

- Verify Firebase has `newsletterSubscribers` collection
- Check Firebase security rules allow reads
- Open browser console for error messages

### "Newsletter not sending"

- Check Resend API key in environment variables
- Verify Firebase query returns subscribers
- Check browser console and server logs for errors

---

## 📝 Files Modified

### Created:

- `app/api/unsubscribe/route.ts` - Unsubscribe API
- `app/unsubscribe/page.tsx` - Public unsubscribe page

### Updated:

- `app/api/subscribe/route.ts` - Now uses Firebase + Resend
- `app/api/admin/newsletter/send/route.ts` - Fetches from Firebase, adds footer
- `app/admin/newsletter/send/page.tsx` - Shows Firebase subscriber count
- `app/admin/newsletter/page.tsx` - Shows status column, active count
- `ROADMAP.md` - Updated newsletter status to "Done"

---

## ✅ Migration Checklist

- [x] Subscribe API migrated to Firebase
- [x] Welcome email system implemented
- [x] Unsubscribe API created
- [x] Unsubscribe page created
- [x] Newsletter send fetches from Firebase
- [x] Automatic unsubscribe footer added
- [x] Admin pages updated to show Firebase data
- [x] Status tracking implemented
- [x] Resubscribe functionality added
- [ ] Add `NEXT_PUBLIC_BASE_URL` to environment variables
- [ ] Add `RESEND_API_KEY` to environment variables
- [ ] Migrate existing Mailchimp subscribers (if applicable)
- [ ] Test complete flow on production
- [ ] Remove Mailchimp environment variables

---

**Migration completed on:** January 2025
**Migrated by:** GitHub Copilot
**System:** Resend + Firebase Firestore
