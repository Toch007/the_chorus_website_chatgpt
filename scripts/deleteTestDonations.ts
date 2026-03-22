/**
 * Script to automatically delete test/fake donation data from Firebase
 * Run with: npx tsx scripts/deleteTestDonations.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
import admin from "firebase-admin";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

// Initialize Firebase Admin
if (!admin.apps || admin.apps.length === 0) {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("❌ FIREBASE_PRIVATE_KEY is missing in env!");
  }

  privateKey = privateKey.replace(/\\n/g, "\n").replace(/"/g, "");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

const db = admin.firestore();

async function deleteTestDonations() {
  console.log("\n🔍 Scanning for test/fake donations...\n");

  const snapshot = await db.collection("donations").get();

  // Patterns that indicate test/fake data
  const testPatterns = [
    /test/i,
    /fake/i,
    /demo/i,
    /example/i,
    /seed/i,
    /@test/i,
    /@fake/i,
    /@example/i,
    /dummy/i,
    /john.*doe/i,
    /jane.*doe/i,
  ];

  const toDelete: { id: string; email: string; name: string }[] = [];

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const email = data.email || "";
    const name = data.name || "";
    const reference = data.reference || "";

    const isTest = testPatterns.some(
      (pattern) =>
        pattern.test(email) || pattern.test(name) || pattern.test(reference)
    );

    if (isTest) {
      toDelete.push({
        id: doc.id,
        email: email,
        name: name,
      });
    }
  });

  if (toDelete.length === 0) {
    console.log("✅ No test donations found! Database is clean.\n");
    return;
  }

  console.log(`⚠️  Found ${toDelete.length} test donations:\n`);
  toDelete.forEach((d, i) => {
    console.log(`  ${i + 1}. ${d.name} (${d.email}) - ID: ${d.id}`);
  });

  console.log(`\n🗑️  Deleting ${toDelete.length} test donations...\n`);

  const batch = db.batch();
  toDelete.forEach((d) => {
    const docRef = db.collection("donations").doc(d.id);
    batch.delete(docRef);
  });

  await batch.commit();

  console.log("✅ Successfully deleted all test donations!\n");
  console.log("📊 Summary:");
  console.log(`   - Deleted: ${toDelete.length} test donations`);
  console.log(
    `   - Remaining: ${snapshot.docs.length - toDelete.length} real donations\n`
  );
}

deleteTestDonations()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
