# Newsletter Email Not Received - Troubleshooting Guide

## 🔍 Issue: Test Email Shows Success But Not Received

### Most Common Causes:

1. **Resend Domain Not Verified** ⚠️ (Most Likely)
2. **Email in Spam/Junk Folder**
3. **Resend API Key Issue**
4. **Email Provider Blocking**

---

## ✅ Step 1: Verify Resend Domain Setup

### Check Resend Dashboard

1. Go to: https://resend.com/domains
2. Login to your Resend account
3. Check if domain is verified:
   - ✅ **Green checkmark** = Domain verified, emails will send
   - ❌ **Red X or Pending** = Domain not verified, emails blocked

### Option A: Use Resend's Free Domain (Quick Fix)

Instead of `newsletter@thechorusabuja.com`, use Resend's test domain:

**Change in code:**

```typescript
from: "The Chorus Abuja <onboarding@resend.dev>";
```

**To implement:**

1. Open: `app/api/admin/newsletter/send/route.ts`
2. Find line: `from: "The Chorus Abuja <newsletter@thechorusabuja.com>"`
3. Change to: `from: "The Chorus Abuja <onboarding@resend.dev>"`
4. Save and redeploy

**Also update:**

- `app/api/subscribe/route.ts` (welcome emails)
- Any other files using Resend

### Option B: Verify Your Domain (Recommended)

1. **Go to Resend Dashboard**
   - https://resend.com/domains
   - Click "Add Domain"

2. **Add thechorusabuja.com**
   - Enter: `thechorusabuja.com`
   - Click "Add Domain"

3. **Add DNS Records**
   Resend will give you DNS records to add. Example:

   ```
   Type: TXT
   Name: _resend
   Value: resend_verify_XXXXXX

   Type: MX
   Name: @
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10
   ```

4. **Add to Your Domain Registrar**
   - Go to your domain provider (Namecheap, GoDaddy, etc.)
   - Add the DNS records exactly as shown
   - Wait 5-60 minutes for propagation
   - Return to Resend and click "Verify"

5. **Once Verified**
   - Green checkmark appears
   - Emails will be delivered
   - Test again

---

## ✅ Step 2: Check Spam/Junk Folder

1. **Gmail:**
   - Open Gmail
   - Click "More" in left sidebar
   - Click "Spam"
   - Search for "The Chorus"

2. **If Found in Spam:**
   - Click the email
   - Click "Not Spam" button
   - Future emails will go to inbox

---

## ✅ Step 3: Check Resend API Key

### Verify Environment Variable

```powershell
# In your project directory
Get-Content .env.local | Select-String "RESEND_API_KEY"
```

**Should show:**

```
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXX
```

**If missing or wrong:**

1. Go to: https://resend.com/api-keys
2. Copy your API key
3. Update `.env.local`
4. Redeploy to Vercel

**In Vercel:**

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Check `RESEND_API_KEY` is set
4. If not, add it
5. Redeploy

---

## ✅ Step 4: Check Resend Dashboard for Delivery Status

1. **Go to Resend Emails**
   - https://resend.com/emails
   - Shows all sent emails

2. **Check Recent Emails**
   - Should see your test email
   - Status should be "Delivered" or "Sent"
3. **If Status Shows Error:**
   - Click on the email
   - Read error message
   - Common errors:
     - "Domain not verified" → Verify domain (Step 1)
     - "Invalid API key" → Update API key (Step 3)
     - "Email bounced" → Check recipient email

---

## 📧 Quick Fix: Use Resend Test Domain

**Immediate solution without domain verification:**

### Update Newsletter Send Route

File: `app/api/admin/newsletter/send/route.ts`

**Change line ~30:**

```typescript
// FROM:
from: "The Chorus Abuja <newsletter@thechorusabuja.com>",

// TO:
from: "The Chorus Abuja <onboarding@resend.dev>",
```

### Update Subscribe Route

File: `app/api/subscribe/route.ts`

**Find and replace:**

```typescript
// FROM:
from: "The Chorus Abuja <newsletter@thechorusabuja.com>",

// TO:
from: "The Chorus Abuja <onboarding@resend.dev>",
```

**After Changes:**

1. Save files
2. Commit and push
3. Redeploy: `vercel --prod`
4. Test again

**Note:** Using `onboarding@resend.dev` is only for testing. For production, verify your domain.

---

## 🎯 About Subscriber Selection

### How It Works Now:

**Test Mode (Checkbox Enabled):**

- ✅ Sends to ONE email address only
- ✅ You manually enter the test email
- ✅ Subject gets "[TEST]" prefix
- ✅ Does NOT send to subscribers

**Production Mode (Checkbox Disabled):**

- ✅ Automatically fetches ALL subscribers from Firebase
- ✅ Filters to only "subscribed" status (excludes unsubscribed)
- ✅ Sends to everyone in one batch
- ✅ No manual selection needed

### Current Behavior:

**All subscribers are automatically selected!**

- No checkbox to select individual subscribers
- Sends to everyone with `status: "subscribed"` in Firebase
- This is the standard newsletter approach

### If You Want Selective Sending:

You would need to add filtering features:

1. Send to specific categories (e.g., "VIP subscribers")
2. Send to subscribers who joined after X date
3. Manual subscriber selection

Let me know if you want this feature!

---

## 🔧 Debugging Steps

### 1. Check Server Logs

**After sending test email:**

```powershell
# In Vercel dashboard
Project → Deployments → Latest → View Function Logs
```

**Look for:**

- "Sending test email to: tochukwu.uche1@gmail.com"
- "Resend response: {...}"
- Any error messages

### 2. Test Resend Directly

**Create a test file:** `test-resend.js`

```javascript
const { Resend } = require("resend");
const resend = new Resend("YOUR_API_KEY_HERE");

resend.emails
  .send({
    from: "onboarding@resend.dev",
    to: "tochukwu.uche1@gmail.com",
    subject: "Direct Resend Test",
    html: "<h1>Hello!</h1><p>This is a direct test.</p>",
  })
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**Run:**

```powershell
node test-resend.js
```

**Expected:**

- Email delivered to Gmail
- Console shows success

---

## ✅ Checklist

- [ ] Check Resend domain verification status
- [ ] Try using `onboarding@resend.dev` as sender
- [ ] Check spam/junk folder in Gmail
- [ ] Verify `RESEND_API_KEY` in environment variables
- [ ] Check Resend dashboard for email delivery status
- [ ] Check Vercel function logs for errors
- [ ] Wait 5-10 minutes (sometimes delayed)
- [ ] Try different recipient email to test

---

## 🎯 Most Likely Solution

**95% chance the issue is:**
Domain `thechorusabuja.com` is not verified in Resend.

**Quick fix:**
Use `onboarding@resend.dev` as sender (see "Quick Fix" section above)

**Permanent fix:**
Verify your domain in Resend dashboard (see "Option B" in Step 1)

---

## Next Steps

1. **Immediate:** Change sender to `onboarding@resend.dev`
2. **Test:** Send another test email
3. **Should receive:** Email in 1-2 minutes
4. **Long-term:** Verify your domain for professional emails
