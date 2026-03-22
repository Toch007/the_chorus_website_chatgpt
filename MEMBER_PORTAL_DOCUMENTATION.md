# Member Portal System Documentation

## Overview
A complete member management system for choir members to signup, login, access rehearsal materials, view announcements, and for admins to manage the entire system.

## Features Implemented

### 1. Member Signup & Authentication
**Location:** `/app/members/signup/page.tsx`

**Features:**
- Firebase email/password authentication
- Email verification requirement
- Form validation (password strength, email format, etc.)
- Voice part selection (Soprano, Alto, Tenor, Bass, Instrumentalist, Other)
- Phone number collection
- Auto-redirect to login after successful signup

**Flow:**
1. User fills signup form
2. Firebase Auth creates account
3. Email verification sent
4. Member account created in Firestore with `status: "pending"`
5. Auto-redirect to login page after 3 seconds

### 2. Member Login
**Location:** `/app/members/login/page.tsx`

**Three-Gate Security System:**
1. **Firebase Authentication** - Email/password verification
2. **Email Verification Check** - Blocks unverified emails
3. **Account Status Check** - Only approved members can access portal

**Access Control:**
- `pending` status → Blocked with "awaiting admin approval" message
- `rejected` status → Blocked with rejection message
- `approved` status → Full portal access granted

### 3. Member Portal Dashboard
**Location:** `/app/members/portal/page.tsx`

**Features:**
- Welcome section with member's name and voice part
- Attendance rate display (0% initially, to be calculated)
- Quick action cards:
  - Rehearsal Materials
  - Announcements
  - Profile (coming soon)
  - Next Rehearsal (coming soon)
- Latest materials preview
- Latest announcements preview
- Join date and last login display
- Logout functionality

### 4. Rehearsal Materials Library
**Location:** `/app/members/portal/materials/page.tsx`

**Features:**
- Search functionality (searches title and description)
- Category filter: All, Sheet Music, Audio Recordings, Learning Resources, Concert Materials
- Materials grid with cards showing:
  - File type icon (PDF, Audio, Video)
  - Category badge
  - Title and description
  - Upload date
  - Download button
- Empty state handling

**Material Types:**
- **PDF** (FileText icon, red) - Sheet music, lyrics, etc.
- **Audio** (Volume2 icon, purple) - Practice tracks, recordings
- **Other** (File icon, blue) - Videos, documents

### 5. Announcements Feed
**Location:** `/app/members/portal/announcements/page.tsx`

**Features:**
- Priority-based filtering (All, High, Medium, Low)
- Color-coded priority system:
  - **High Priority** (Red, AlertCircle icon) - Urgent announcements
  - **Medium Priority** (Yellow, Info icon) - Important info
  - **Low Priority** (Green, CheckCircle icon) - General updates
- Announcement cards with:
  - Title and content
  - Post date and author
  - Priority badge
- Help section explaining priority levels

### 6. Admin Members Portal
**Location:** `/app/admin/members-portal/page.tsx`

**Three Main Tabs:**

#### Tab 1: Member Accounts Management
- View all member accounts in a table
- See member details: name, email, voice part, status, join date
- Color-coded status badges (pending=yellow, approved=green, rejected=red)
- Quick actions:
  - **Approve** button (UserCheck icon) - Changes status to "approved"
  - **Reject** button (UserX icon) - Changes status to "rejected"
- Refresh button to reload member list

#### Tab 2: Upload Materials
- Form to upload rehearsal materials
- Fields:
  - Title (required)
  - Description (required)
  - Category dropdown (Sheet Music, Audio Recordings, Learning Resources, Concert Materials)
  - File Type (PDF, Audio, Video)
  - File URL (upload to Firebase Storage or external host, paste URL)
- Auto-captures upload date and uploader email
- Success confirmation after upload

#### Tab 3: Post Announcements
- Form to create announcements
- Fields:
  - Title (required)
  - Content (required, textarea for longer messages)
  - Priority selector (Low, Medium, High)
- Auto-captures post date and poster email
- Success confirmation after posting

## API Endpoints

### Member APIs

#### 1. Create Account
**Endpoint:** `POST /api/members/create-account`
**Purpose:** Creates member document in Firestore after Firebase Auth signup
**Request Body:**
```json
{
  "uid": "firebase-user-id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "voicePart": "Tenor",
  "phone": "+1234567890"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Member account created successfully"
}
```

#### 2. Check Status
**Endpoint:** `GET /api/members/check-status?uid=<firebase-uid>`
**Purpose:** Verify member exists and check approval status
**Response:**
```json
{
  "exists": true,
  "status": "approved",
  "memberData": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "voicePart": "Tenor",
    "attendanceRate": 0,
    "joinDate": "2024-01-15T10:00:00.000Z",
    "lastLogin": "2024-01-20T15:30:00.000Z"
  }
}
```

#### 3. Get Materials
**Endpoint:** `GET /api/members/materials`
**Purpose:** Fetch all rehearsal materials
**Response:**
```json
{
  "success": true,
  "materials": [
    {
      "title": "Hallelujah Chorus",
      "description": "Sheet music for soprano part",
      "category": "Sheet Music",
      "fileUrl": "https://...",
      "fileType": "pdf",
      "uploadDate": "2024-01-15T10:00:00.000Z",
      "uploadedBy": "admin@chorus.com"
    }
  ]
}
```

#### 4. Get Announcements
**Endpoint:** `GET /api/members/announcements`
**Purpose:** Fetch all announcements
**Response:**
```json
{
  "success": true,
  "announcements": [
    {
      "title": "Rehearsal Cancelled",
      "content": "Due to weather conditions...",
      "priority": "high",
      "date": "2024-01-15T10:00:00.000Z",
      "postedBy": "admin@chorus.com"
    }
  ]
}
```

### Admin APIs

#### 1. Get Members
**Endpoint:** `GET /api/admin/members-portal/members`
**Auth Required:** Bearer token with admin claim
**Purpose:** Fetch all member accounts for admin review
**Response:**
```json
{
  "success": true,
  "members": [
    {
      "uid": "firebase-user-id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "voicePart": "Tenor",
      "phone": "+1234567890",
      "status": "pending",
      "joinDate": "2024-01-15T10:00:00.000Z",
      "lastLogin": null
    }
  ]
}
```

#### 2. Update Member Status
**Endpoint:** `POST /api/admin/members-portal/update-member`
**Auth Required:** Bearer token with admin claim
**Request Body:**
```json
{
  "uid": "firebase-user-id",
  "status": "approved"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Member status updated"
}
```

#### 3. Upload Material
**Endpoint:** `POST /api/admin/members-portal/upload-material`
**Auth Required:** Bearer token with admin claim
**Request Body:**
```json
{
  "title": "Hallelujah Chorus",
  "description": "Sheet music for all parts",
  "category": "Sheet Music",
  "fileUrl": "https://...",
  "fileType": "pdf",
  "uploadDate": "2024-01-15T10:00:00.000Z",
  "uploadedBy": "admin@chorus.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Material uploaded successfully"
}
```

#### 4. Post Announcement
**Endpoint:** `POST /api/admin/members-portal/post-announcement`
**Auth Required:** Bearer token with admin claim
**Request Body:**
```json
{
  "title": "Important Update",
  "content": "Please arrive 30 minutes early...",
  "priority": "high",
  "date": "2024-01-15T10:00:00.000Z",
  "postedBy": "admin@chorus.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Announcement posted successfully"
}
```

## Firestore Schema

### Collection: `member_accounts`
```typescript
{
  uid: string;              // Firebase Auth UID
  fullName: string;         // Member's full name
  email: string;            // Email address
  voicePart: string;        // Soprano, Alto, Tenor, Bass, etc.
  phone: string;            // Phone number
  status: string;           // pending, approved, rejected, inactive
  joinDate: string;         // ISO timestamp of signup
  lastLogin: string | null; // ISO timestamp of last login
  attendanceRate: number;   // 0-100 percentage
  role: string;             // member, admin
  createdAt: string;        // ISO timestamp
  updatedAt?: string;       // ISO timestamp of last update
}
```

### Collection: `rehearsal_materials`
```typescript
{
  title: string;            // Material title
  description: string;      // Material description
  category: string;         // Sheet Music, Audio Recordings, etc.
  fileUrl: string;          // Download URL
  fileType: string;         // pdf, audio, video
  uploadDate: string;       // ISO timestamp
  uploadedBy: string;       // Email of uploader
  createdAt: string;        // ISO timestamp
}
```

### Collection: `announcements`
```typescript
{
  title: string;            // Announcement title
  content: string;          // Full announcement text
  priority: string;         // high, medium, low
  date: string;             // ISO timestamp of posting
  postedBy: string;         // Email of poster
  createdAt: string;        // ISO timestamp
}
```

## Custom Hook

### `useMemberAuth`
**Location:** `/hooks/useMemberAuth.ts`

**Purpose:** Centralized authentication management for member portal

**Features:**
- Listens to Firebase auth state changes
- Fetches member data from API
- Validates email verification
- Checks account approval status
- Auto-redirects unauthorized users to login
- Auto-signs out rejected/pending users

**Returns:**
```typescript
{
  user: User | null;           // Firebase user object
  memberData: MemberAccount | null; // Member data from Firestore
  loading: boolean;            // Loading state
}
```

**Usage in Portal Pages:**
```typescript
const { user, memberData, loading } = useMemberAuth();

if (loading) return <LoadingSpinner />;
if (!user || !memberData) return null; // Will auto-redirect
```

## User Workflows

### New Member Workflow
1. **Sign Up**
   - Go to `/members/signup`
   - Fill form with name, email, voice part, phone, password
   - Submit form
   - Receive email verification link
   - Account created with `status: "pending"`

2. **Email Verification**
   - Click verification link in email
   - Email marked as verified in Firebase

3. **Wait for Approval**
   - Admin reviews account in admin portal
   - Admin clicks "Approve" or "Reject"

4. **Login**
   - Go to `/members/login`
   - Enter email and password
   - System checks:
     - Authentication ✓
     - Email verified ✓
     - Status approved ✓
   - Redirected to `/members/portal`

5. **Access Portal**
   - View dashboard with quick actions
   - Browse rehearsal materials
   - Read announcements
   - Download resources

### Admin Workflow

#### Approve New Members
1. Go to admin dashboard (`/admin`)
2. Click "Members Portal Admin"
3. Select "Member Accounts" tab
4. Review pending members (yellow badge)
5. Click approve (✓) or reject (✗) button
6. Member receives access or rejection

#### Upload Rehearsal Material
1. Go to "Members Portal Admin"
2. Select "Upload Materials" tab
3. Fill form:
   - Title: "Ave Maria - Soprano Part"
   - Description: "Practice this for Sunday's rehearsal"
   - Category: Sheet Music
   - File Type: PDF
   - File URL: (upload PDF to Firebase Storage, paste URL)
4. Submit
5. Material appears in members' materials library

#### Post Announcement
1. Go to "Members Portal Admin"
2. Select "Post Announcements" tab
3. Fill form:
   - Title: "Rehearsal Time Change"
   - Content: "Next rehearsal starts at 6:30 PM instead of 7:00 PM"
   - Priority: High
4. Submit
5. Announcement appears in members' feed with red "High Priority" badge

## Security Features

### Multi-Layer Authentication
1. **Firebase Authentication** - Industry-standard security
2. **Email Verification** - Prevents fake accounts
3. **Admin Approval** - Manual verification layer
4. **Custom Auth Hook** - Centralized access control

### API Security
- Admin endpoints require Bearer token with `admin` claim
- Member endpoints use Firebase Admin SDK (bypasses client rules)
- All requests validated server-side
- Error messages don't expose sensitive data

### Status-Based Access Control
- **pending** → Cannot access portal, sees "awaiting approval" message
- **rejected** → Cannot access portal, sees rejection message
- **approved** → Full portal access
- **inactive** → Cannot access portal (for deactivated accounts)

## Future Enhancements

### Pending Features
1. **Member Profile Page** (`/members/portal/profile`)
   - View/edit personal info
   - Change password
   - View attendance history
   - Manage notification preferences

2. **Attendance Tracking**
   - Admin marks attendance at rehearsals
   - Auto-calculates attendance rate
   - Display in member dashboard

3. **Firebase Storage Integration**
   - Direct file upload in admin portal
   - Automatic URL generation
   - File management (delete old files)

4. **Next Rehearsal Widget**
   - Fetch next event from events collection
   - Display in dashboard quick actions
   - Show date, time, location

5. **Notifications**
   - Email notifications for new materials
   - Email notifications for high-priority announcements
   - Push notifications (optional)

6. **Advanced Analytics**
   - Track material downloads
   - Monitor member engagement
   - Generate attendance reports

7. **Firebase Security Rules**
   ```javascript
   // Firestore Security Rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       
       // Member accounts - members can read own, admins full access
       match /member_accounts/{userId} {
         allow read: if request.auth != null && 
                     (request.auth.uid == userId || 
                      request.auth.token.admin == true);
         allow write: if request.auth.token.admin == true;
       }
       
       // Materials - all authenticated users read, admins write
       match /rehearsal_materials/{materialId} {
         allow read: if request.auth != null;
         allow write: if request.auth.token.admin == true;
       }
       
       // Announcements - all authenticated users read, admins write
       match /announcements/{announcementId} {
         allow read: if request.auth != null;
         allow write: if request.auth.token.admin == true;
       }
     }
   }
   ```

## Testing Checklist

### Member Signup & Login
- [ ] Signup form validation works
- [ ] Email verification sent
- [ ] Account created with pending status
- [ ] Cannot login without email verification
- [ ] Cannot access portal with pending status
- [ ] Can login after approval
- [ ] Redirects to portal after successful login

### Member Portal
- [ ] Dashboard displays correct member info
- [ ] Quick action cards navigate correctly
- [ ] Materials page loads and filters work
- [ ] Announcements page loads and filters work
- [ ] Download buttons work
- [ ] Logout redirects to login

### Admin Portal
- [ ] Member list displays all accounts
- [ ] Status badges show correct colors
- [ ] Approve button updates status
- [ ] Reject button updates status
- [ ] Material upload form validates
- [ ] Materials appear in member view after upload
- [ ] Announcement form validates
- [ ] Announcements appear in member view after posting

### Security
- [ ] Non-authenticated users redirected to login
- [ ] Pending members blocked from portal
- [ ] Rejected members blocked from portal
- [ ] Admin endpoints require valid token
- [ ] Admin endpoints verify admin claim

## Deployment

### Environment Variables Required
```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

### Pre-Deployment Steps
1. Set Firebase environment variables
2. Deploy Firebase security rules (see Future Enhancements)
3. Test all workflows in development
4. Create first admin user manually
5. Deploy to production

### Post-Deployment Steps
1. Test signup flow with real email
2. Test admin approval workflow
3. Upload sample materials
4. Post sample announcements
5. Verify email delivery works
6. Monitor Firebase usage and costs

## Navigation Links

### Member Portal Access
- Main website: Add link in navigation menu or footer
- Direct URL: `https://your-domain.com/members/login`
- Signup URL: `https://your-domain.com/members/signup`

### Admin Access
- Admin dashboard: Click "Members Portal Admin" card
- Direct URL: `https://your-domain.com/admin/members-portal`

## Support & Maintenance

### Common Issues

**Issue:** Member can't login after signup
**Solution:** Check email verification, check account status in admin portal

**Issue:** Materials not appearing
**Solution:** Verify file URL is publicly accessible, check Firestore console

**Issue:** Admin can't approve members
**Solution:** Verify admin custom claim is set in Firebase Auth

**Issue:** Email verification not sending
**Solution:** Check Firebase email template settings, verify sender email

### Monitoring
- Check Firebase console for auth errors
- Monitor Firestore read/write counts
- Review API endpoint error logs
- Track member signup conversion rate

---

**Created:** January 2024  
**Version:** 1.0  
**Status:** Ready for Testing
