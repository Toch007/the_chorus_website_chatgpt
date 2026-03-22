# Admin Setup Script

This script helps you add admin users to the Firestore `admins` collection.

## Option 1: Add Admin via Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Firestore Database** in the left sidebar
4. Click **Start collection**
5. Collection ID: `admins`
6. Click **Next**
7. Add your first admin document:
   - **Document ID:** Auto-ID (or use email)
   - **Fields:**
     ```
     email: "your-admin-email@example.com" (string)
     active: true (boolean)
     name: "Your Name" (string)
     createdAt: [Click "Add field" > Select "timestamp" > Use server timestamp]
     role: "super-admin" (string)
     ```
8. Click **Save**

## Option 2: Use Firebase Admin SDK Script

Create a one-time script to add admins:

```typescript
// scripts/add-admin.ts
import { adminFirestore } from "../lib/firebase-admin";

async function addAdmin(email: string, name: string) {
  try {
    await adminFirestore.collection("admins").add({
      email: email.toLowerCase(),
      name: name,
      active: true,
      role: "super-admin",
      createdAt: new Date().toISOString(),
    });
    
    console.log(`✅ Admin added successfully: ${email}`);
  } catch (error) {
    console.error("Error adding admin:", error);
  }
}

// Add your admin email here
addAdmin("your-email@example.com", "Your Name");
```

Then run:
```bash
npm install -g ts-node
ts-node scripts/add-admin.ts
```

## Option 3: Quick Manual Entry

1. Firebase Console > Firestore Database
2. Click on `admins` collection (or create it)
3. Click **Add document**
4. Use these exact fields:

| Field      | Type      | Value                          |
|------------|-----------|--------------------------------|
| email      | string    | your-admin-email@example.com   |
| active     | boolean   | true                           |
| name       | string    | Your Full Name                 |
| role       | string    | super-admin                    |
| createdAt  | timestamp | Use current timestamp          |

## Admins Collection Schema

```typescript
{
  email: string;        // Admin's email (must match Firebase Auth email)
  active: boolean;      // true = can access admin panel, false = disabled
  name: string;         // Admin's full name
  role: string;         // "super-admin", "admin", "moderator", etc.
  createdAt: string;    // ISO timestamp
}
```

## Security Rules for Admins Collection

Add these rules to Firestore to protect the admins collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admins collection - only server-side access
    match /admins/{adminId} {
      allow read, write: if false; // No client-side access
    }
    
    // Member accounts - only server-side access
    match /member_accounts/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Only via server APIs
    }
    
    // Materials - authenticated users can read
    match /rehearsal_materials/{materialId} {
      allow read: if request.auth != null;
      allow write: if false; // Only via server APIs
    }
    
    // Announcements - authenticated users can read
    match /announcements/{announcementId} {
      allow read: if request.auth != null;
      allow write: if false; // Only via server APIs
    }
  }
}
```

## Testing

After adding an admin:

1. Log out if you're currently logged in
2. Go to `/admin/login`
3. Enter the admin email and password
4. You should now have access to the admin dashboard
5. Regular members should be blocked from admin access

## Removing Admin Access

To revoke admin access:
1. Go to Firestore Database
2. Find the admin document
3. Either:
   - Set `active: false` (temporary disable)
   - Delete the document (permanent removal)
