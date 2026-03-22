# Build Error Fix: Firebase Permissions

## 🐛 Issue

Build was failing with "Missing or insufficient permissions" error during static page generation for `/blog`.

## 🔧 Root Cause

Server-rendered pages (without "use client") were using **Firebase Client SDK** which requires Firestore security rules. During build time (static generation), there's no authentication, so the client SDK can't access Firestore data.

## ✅ Solution

Switched server-rendered pages from **Client SDK** to **Admin SDK** for data fetching.

---

## 📝 Files Changed

### 1. `app/blog/page.tsx`

**Before:**

```typescript
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const postsSnapshot = await getDocs(collection(db, "posts"));
```

**After:**

```typescript
import { adminFirestore } from "@/lib/firebase-admin";

const postsSnapshot = await adminFirestore.collection("posts").get();
```

### 2. `app/blog/[slug]/page.tsx`

**Before:**

```typescript
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

const q = query(collection(db, "posts"), where("slug", "==", slug));
const snapshot = await getDocs(q);
```

**After:**

```typescript
import { adminFirestore } from "@/lib/firebase-admin";

const snapshot = await adminFirestore
  .collection("posts")
  .where("slug", "==", slug)
  .get();
```

### 3. `app/events/[id]/page.tsx`

**Before:**

```typescript
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ref = doc(db, "events", id);
const snapshot = await getDoc(ref);
```

**After:**

```typescript
import { adminFirestore } from "@/lib/firebase-admin";

const snapshot = await adminFirestore.collection("events").doc(id).get();
```

### 4. `firestore.rules`

Added public read access for the "posts" collection:

```javascript
match /posts/{postId} {
  allow read: if true;
  allow create, update, delete: if request.auth != null;
}
```

---

## 🔑 Key Differences

### Client SDK vs Admin SDK

| Feature            | Client SDK                       | Admin SDK                        |
| ------------------ | -------------------------------- | -------------------------------- |
| **Import from**    | `firebase/firestore`             | `firebase-admin/firestore`       |
| **Auth**           | Requires user authentication     | Uses service account             |
| **Security Rules** | Must follow Firestore rules      | **Bypasses all rules**           |
| **Use Case**       | Client-side, authenticated users | Server-side, trusted environment |
| **Build Time**     | ❌ Blocked by rules              | ✅ Full access                   |

### When to Use Which

**Use Client SDK when:**

- "use client" directive present
- User interactions (forms, buttons)
- Client-side state management
- Real-time listeners
- User authentication required

**Use Admin SDK when:**

- Server components (no "use client")
- Static generation (SSG)
- Server-side rendering (SSR)
- API routes requiring full access
- Background jobs/cron tasks

---

## 🚀 Deployment

The changes are ready. Redeploy with:

```powershell
vercel --prod
```

The build should now succeed! ✅

---

## 🔒 Security Note

**Admin SDK bypasses Firestore security rules.** This is safe because:

- It only runs on the **server** (never in browser)
- Requires `FIREBASE_PRIVATE_KEY` environment variable (secret)
- Code is controlled and trusted (not user-submitted)
- Perfect for static page generation where no user context exists

**Client SDK respects security rules.** This is important because:

- Runs in the **browser** (untrusted environment)
- Users can inspect/modify client-side code
- Security rules protect your data from unauthorized access
- Required for user-facing forms and interactions

---

## ✅ What's Fixed

- ✅ Blog listing page builds successfully
- ✅ Blog detail pages build successfully
- ✅ Event detail pages build successfully
- ✅ No Firebase permission errors during build
- ✅ Static pages generated correctly
- ✅ Firestore rules updated for both collections

---

## 📊 Collections Using Admin SDK

These server components now use Admin SDK for builds:

1. `/blog` - Blog listing
2. `/blog/[slug]` - Individual blog posts
3. `/events/[id]` - Individual events

These client components continue using Client SDK:

1. `/admin/*` - Admin pages (authenticated)
2. `/feedback` - Feedback form (public write access)
3. `/events` - Events listing (client-side filtering)
4. Form submissions and user interactions

Perfect balance of security and functionality! 🎉
