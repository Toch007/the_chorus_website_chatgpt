# Test Newsletter Email

## Quick Test Instructions

1. **Login to Admin Panel**
   - Go to: https://your-site.vercel.app/admin/login
   - Login with your credentials

2. **Navigate to Newsletter**
   - Go to: https://your-site.vercel.app/admin/newsletter/send

3. **Enable Test Mode**
   - Check the "Test Mode" checkbox
   - Enter your email: `tochukwu.uche1@gmail.com`

4. **Copy This Test Email Content**

**Subject:**

```
Test Newsletter - The Chorus Abuja Updates
```

**Content (HTML):**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
        color: white;
        padding: 30px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .content {
        background: #ffffff;
        padding: 30px;
        border: 1px solid #e5e7eb;
      }
      .footer {
        background: #f9fafb;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #6b7280;
        border-radius: 0 0 10px 10px;
      }
      .button {
        background: #1e40af;
        color: white;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎵 The Chorus Abuja</h1>
        <p>Newsletter Test - Making Music That Matters</p>
      </div>

      <div class="content">
        <h2>Hello from The Chorus Abuja! 👋</h2>

        <p>
          This is a <strong>test newsletter</strong> to verify that our email
          system is working correctly.
        </p>

        <p>If you're seeing this email, it means:</p>
        <ul>
          <li>✅ The newsletter system is configured properly</li>
          <li>✅ Resend API is working</li>
          <li>✅ Email delivery is successful</li>
          <li>✅ HTML formatting is rendering correctly</li>
        </ul>

        <h3>📅 Upcoming Events</h3>
        <p>
          Stay tuned for announcements about our next concert! We're working on
          something special for our community.
        </p>

        <h3>🎤 Join Our Choir</h3>
        <p>
          Are you passionate about music? We're always looking for talented
          individuals to join our growing family.
        </p>

        <a href="https://thechorusabuja.com/join" class="button"
          >Explore Opportunities</a
        >

        <h3>💙 Support Our Mission</h3>
        <p>
          Your support helps us continue creating beautiful music and building
          community through the arts.
        </p>

        <p style="margin-top: 30px;">
          Thank you for being part of The Chorus Abuja family!
        </p>

        <p>
          <strong>The Chorus Abuja Team</strong><br />
          Making Abuja Sing 🎶
        </p>
      </div>

      <div class="footer">
        <p>The Chorus Abuja - Abuja, Nigeria</p>
        <p>
          <a href="https://thechorusabuja.com" style="color: #3b82f6;"
            >Visit our website</a
          >
          |
          <a href="https://thechorusabuja.com/contact" style="color: #3b82f6;"
            >Contact us</a
          >
        </p>
      </div>
    </div>
  </body>
</html>
```

5. **Click "Send Test Email"**
   - The system will send to `tochukwu.uche1@gmail.com`
   - Check your inbox (and spam folder)

---

## What to Check in the Email

When you receive the test email, verify:

1. ✅ **Subject line** appears correctly
2. ✅ **HTML formatting** renders properly
3. ✅ **Images and styling** display correctly
4. ✅ **Links** are clickable
5. ✅ **Unsubscribe footer** is automatically appended at the bottom
6. ✅ **Unsubscribe link** format: `/unsubscribe?email=tochukwu.uche1@gmail.com`

---

## Simple Plain Text Test (Alternative)

If you prefer a simpler test:

**Subject:**

```
Test Newsletter from The Chorus Abuja
```

**Content:**

```html
<h1>Hello! 👋</h1>

<p>This is a test email from The Chorus Abuja newsletter system.</p>

<p>If you're reading this, the email was delivered successfully!</p>

<h2>Features Tested:</h2>
<ul>
  <li>Email delivery</li>
  <li>HTML rendering</li>
  <li>Resend API integration</li>
</ul>

<p><strong>Thank you!</strong><br />The Chorus Abuja Team</p>
```

---

## Expected Result

You should receive an email at `tochukwu.uche1@gmail.com` with:

- ✅ Subject: "[TEST] Test Newsletter - The Chorus Abuja Updates"
- ✅ Formatted HTML content
- ✅ Automatic unsubscribe footer at bottom
- ✅ From: "The Chorus Abuja <newsletter@thechorusabuja.com>"

**Note:** The subject will have "[TEST]" prefix when sent in test mode.

---

## Troubleshooting

### Email not received?

1. Check spam/junk folder
2. Wait 2-3 minutes for delivery
3. Verify test email address is correct
4. Check Resend dashboard for delivery status

### Error when sending?

1. Make sure you're logged in to admin panel
2. Verify both subject and content are filled
3. Check browser console for errors
4. Verify RESEND_API_KEY environment variable is set

### Unsubscribe link not working?

- Make sure NEXT_PUBLIC_BASE_URL is set in environment variables
- Should point to: https://your-production-url.vercel.app

---

## After Testing

Once you confirm the test email works:

1. ✅ Uncheck "Test Mode"
2. ✅ Compose your real newsletter
3. ✅ Send to all subscribers

The system will:

- Send individual emails (not BCC)
- Add personalized unsubscribe links
- Handle rate limiting automatically
- Report success/error counts
