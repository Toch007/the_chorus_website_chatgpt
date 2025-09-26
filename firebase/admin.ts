import * as admin from "firebase-admin";

if (!admin.apps.length) {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("❌ FIREBASE_PRIVATE_KEY is missing in env!");
  }

  // Convert escaped newlines to actual newlines and remove surrounding quotes if any
  privateKey = privateKey.replace(/\\n/g, "\n").replace(/"/g, "");

  console.log("✅ FIREBASE_PRIVATE_KEY normalized, starts with:", privateKey.slice(0, 30));

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

export const db = admin.firestore();