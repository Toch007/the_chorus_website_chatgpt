/**
 * Script to clean up seeded/fake donation data from Firebase
 *
 * This script will:
 * 1. List all donations in Firebase
 * 2. Show you which ones look like test/seeded data
 * 3. Optionally delete them
 *
 * Run with: npx tsx scripts/cleanDonations.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
import admin from "firebase-admin";
import readline from "readline";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

// Initialize Firebase Admin
if (!admin.apps || admin.apps.length === 0) {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    console.error("❌ FIREBASE_PRIVATE_KEY is missing in env!");
    console.error(
      "Available env keys:",
      Object.keys(process.env).filter((k) => k.includes("FIREBASE"))
    );
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

interface Donation {
  id: string;
  amount: number;
  email: string;
  reference: string;
  createdAt: any;
  name?: string;
}

// Helper to create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

async function listAllDonations() {
  console.log("\n🔍 Fetching all donations from Firebase...\n");

  const snapshot = await db
    .collection("donations")
    .orderBy("createdAt", "desc")
    .get();

  const donations: Donation[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      amount: data.amount || 0,
      email: data.email || "",
      reference: data.reference || "",
      createdAt: data.createdAt?.toDate?.() || new Date(),
      name: data.name || "Anonymous",
    };
  });

  return donations;
}

function identifyTestDonations(donations: Donation[]) {
  // Common patterns for test/seeded data
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
  ];

  const suspicious: Donation[] = [];
  const real: Donation[] = [];

  donations.forEach((donation) => {
    const emailMatch = testPatterns.some((pattern) =>
      pattern.test(donation.email)
    );
    const nameMatch = testPatterns.some((pattern) =>
      pattern.test(donation.name || "")
    );
    const refMatch = testPatterns.some((pattern) =>
      pattern.test(donation.reference)
    );

    // Also check for very old donations (might be seeded)
    const isOld =
      new Date().getTime() - donation.createdAt.getTime() >
      365 * 24 * 60 * 60 * 1000; // older than 1 year

    if (emailMatch || nameMatch || refMatch) {
      suspicious.push(donation);
    } else {
      real.push(donation);
    }
  });

  return { suspicious, real };
}

function displayDonations(donations: Donation[], title: string) {
  console.log(`\n${"=".repeat(80)}`);
  console.log(`${title} (${donations.length} donations)`);
  console.log("=".repeat(80));

  if (donations.length === 0) {
    console.log("  (none)");
    return;
  }

  donations.forEach((donation, index) => {
    console.log(`\n  ${index + 1}. ID: ${donation.id}`);
    console.log(`     Name: ${donation.name}`);
    console.log(`     Email: ${donation.email}`);
    console.log(`     Amount: ₦${donation.amount.toLocaleString()}`);
    console.log(`     Reference: ${donation.reference}`);
    console.log(`     Date: ${donation.createdAt.toLocaleString()}`);
  });

  console.log("\n");
}

async function deleteSelectedDonations(donationIds: string[]) {
  console.log(`\n🗑️  Deleting ${donationIds.length} donations...`);

  const batch = db.batch();
  donationIds.forEach((id) => {
    const docRef = db.collection("donations").doc(id);
    batch.delete(docRef);
  });

  await batch.commit();
  console.log("✅ Donations deleted successfully!");
}

async function main() {
  try {
    // Fetch all donations
    const allDonations = await listAllDonations();

    if (allDonations.length === 0) {
      console.log("✅ No donations found in Firebase. Database is clean!");
      rl.close();
      process.exit(0);
    }

    console.log(`📊 Total donations in database: ${allDonations.length}\n`);

    // Identify test donations
    const { suspicious, real } = identifyTestDonations(allDonations);

    // Display results
    displayDonations(real, "✅ REAL DONATIONS (Keep these)");
    displayDonations(
      suspicious,
      "⚠️  SUSPICIOUS/TEST DONATIONS (Consider deleting)"
    );

    // Ask what to do
    console.log("\n" + "=".repeat(80));
    console.log("OPTIONS:");
    console.log("=".repeat(80));
    console.log("1. Delete all suspicious donations");
    console.log("2. Delete ALL donations (clean database completely)");
    console.log(
      "3. Show me all donations with their IDs (for manual deletion)"
    );
    console.log("4. Exit without changes");
    console.log("=".repeat(80) + "\n");

    const choice = await askQuestion("Enter your choice (1-4): ");

    switch (choice.trim()) {
      case "1":
        if (suspicious.length === 0) {
          console.log("✅ No suspicious donations to delete!");
        } else {
          const confirm = await askQuestion(
            `⚠️  This will delete ${suspicious.length} donations. Are you sure? (yes/no): `
          );
          if (confirm.toLowerCase() === "yes") {
            await deleteSelectedDonations(suspicious.map((d) => d.id));
          } else {
            console.log("❌ Cancelled.");
          }
        }
        break;

      case "2":
        const confirmAll = await askQuestion(
          `⚠️  ⚠️  ⚠️  This will delete ALL ${allDonations.length} donations! Are you ABSOLUTELY sure? (type 'DELETE ALL'): `
        );
        if (confirmAll === "DELETE ALL") {
          await deleteSelectedDonations(allDonations.map((d) => d.id));
        } else {
          console.log("❌ Cancelled.");
        }
        break;

      case "3":
        console.log("\n📋 All Donations with IDs:");
        allDonations.forEach((d, i) => {
          console.log(
            `${i + 1}. ${d.id} - ${d.name} (${d.email}) - ₦${d.amount.toLocaleString()}`
          );
        });
        console.log(
          "\nTo delete specific donations, use Firebase Console or modify this script."
        );
        break;

      case "4":
        console.log("👋 Exiting without changes.");
        break;

      default:
        console.log("❌ Invalid choice.");
    }

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    rl.close();
    process.exit(1);
  }
}

main();
