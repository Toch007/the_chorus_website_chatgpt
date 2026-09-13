/**
 * Cleans up bot-spam applications from join_choir, join_volunteer,
 * join_media, join_tech.
 *
 * A document is classified as "bot" if it fails the SAME required-field
 * validation the live website form enforces before it would ever let a
 * real visitor submit (missing required fields, invalid phone/email format,
 * or required consent/declaration checkboxes not set to true). Since the
 * bots wrote directly to Firestore (bypassing the form's client-side
 * validation), spam documents overwhelmingly fail these checks while real
 * submissions pass them.
 *
 * Safety: this script ONLY prints a report by default. Nothing is deleted
 * unless you re-run it with --execute AND then type DELETE to confirm.
 *
 * Run with: npx tsx scripts/cleanupBotApplications.ts        (dry run)
 *           npx tsx scripts/cleanupBotApplications.ts --execute
 */

import { config } from "dotenv";
import { resolve } from "path";
import admin from "firebase-admin";
import readline from "readline";

config({ path: resolve(process.cwd(), ".env.local") });

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

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}
function isValidEmail(v: unknown): boolean {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhoneLoose(v: unknown): boolean {
  return typeof v === "string" && /^\+?\d{10,15}$/.test(v);
}
function isValidPhoneDigitsOnly(v: unknown): boolean {
  return typeof v === "string" && /^[0-9]{10,15}$/.test(v);
}

// The bots here fake valid-looking emails/phones and tick every consent
// box, but still submit randomly-generated gibberish names (single word,
// odd internal capitalization, unnatural vowel ratio). Real applicants
// almost always type "First Last" with normal spelling. This is the
// decisive signal — verified against the dry-run output before use.
function looksLikeRealName(name: unknown): boolean {
  if (typeof name !== "string") return false;
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  if (!trimmed.includes(" ")) return false; // needs first + last name
  if (/[0-9@#$%^&*_+=<>]/.test(trimmed)) return false;

  const letters = trimmed.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return false;
  const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length;
  if (vowels / letters.length < 0.25) return false; // gibberish consonant strings

  // Reject unnatural mid-word capitalization, e.g. "hvIotWcNbdncvYxDL".
  // ALL-CAPS, all-lowercase, and normal "Title Case" are all legitimate —
  // only scattered/random casing within a word is treated as gibberish.
  for (const word of trimmed.split(/\s+/)) {
    const letters = word.replace(/[^a-zA-Z]/g, "");
    if (!letters) continue;
    const isAllCaps = /^[A-Z]+$/.test(letters);
    const isAllLower = /^[a-z]+$/.test(letters);
    const isTitleCase = /^[A-Z][a-z]+$/.test(letters);
    if (!isAllCaps && !isAllLower && !isTitleCase) return false;
  }
  return true;
}

// Mirrors app/join/choir/page.tsx validate()
function isLegitChoir(d: Record<string, any>): boolean {
  return (
    looksLikeRealName(d.fullName) &&
    isNonEmptyString(d.dob) &&
    isNonEmptyString(d.gender) &&
    isValidPhoneLoose(d.phone) &&
    (!d.email || isValidEmail(d.email)) &&
    isNonEmptyString(d.voicePart) &&
    d.availableForRehearsals === true &&
    d.willingToPerform === true &&
    d.photoConsent === true &&
    d.declaration === true
  );
}

// Mirrors app/join/volunteer/page.tsx validate()
function isLegitVolunteer(d: Record<string, any>): boolean {
  return (
    looksLikeRealName(d.fullName) &&
    Number(d.age) > 0 &&
    isNonEmptyString(d.gender) &&
    isValidPhoneDigitsOnly(String(d.phone ?? "")) &&
    isNonEmptyString(d.area) &&
    isNonEmptyString(d.availability) &&
    d.commitment === true &&
    d.declaration === true
  );
}

// Media/tech forms only strictly require declaration client-side; add a
// baseline sanity check (real name + real email) on top of that.
function isLegitMediaOrTech(d: Record<string, any>): boolean {
  return (
    looksLikeRealName(d.fullName) &&
    isValidEmail(d.email) &&
    d.declaration === true
  );
}

const COLLECTIONS: {
  name: string;
  isLegit: (d: Record<string, any>) => boolean;
}[] = [
  { name: "join_choir", isLegit: isLegitChoir },
  { name: "join_volunteer", isLegit: isLegitVolunteer },
  { name: "join_media", isLegit: isLegitMediaOrTech },
  { name: "join_tech", isLegit: isLegitMediaOrTech },
];

async function deleteInBatches(refs: FirebaseFirestore.DocumentReference[]) {
  const BATCH_SIZE = 450;
  for (let i = 0; i < refs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    for (const ref of refs.slice(i, i + BATCH_SIZE)) {
      batch.delete(ref);
    }
    await batch.commit();
    console.log(
      `  Deleted ${Math.min(i + BATCH_SIZE, refs.length)}/${refs.length}`,
    );
  }
}

async function main() {
  const execute = process.argv.includes("--execute");
  const toDelete: FirebaseFirestore.DocumentReference[] = [];

  console.log(
    execute
      ? "Running in EXECUTE mode (will ask for confirmation before deleting)\n"
      : "Running in DRY-RUN mode (nothing will be deleted)\n",
  );

  for (const { name, isLegit } of COLLECTIONS) {
    const snap = await db.collection(name).get();
    const bot = snap.docs.filter((doc) => !isLegit(doc.data()));
    const legit = snap.docs.filter((doc) => isLegit(doc.data()));

    console.log(`${name}: ${snap.size} total → ${bot.length} bot-like, ${legit.length} look legit`);

    if (bot.length > 0) {
      console.log(`  Sample of docs that would be DELETED:`);
      for (const doc of bot.slice(0, 3)) {
        const d = doc.data();
        console.log(
          `   - ${doc.id}: fullName=${JSON.stringify(d.fullName)} email=${JSON.stringify(d.email)} phone=${JSON.stringify(d.phone)}`,
        );
      }
    }
    if (legit.length > 0) {
      console.log(`  Sample of docs that would be KEPT:`);
      for (const doc of legit.slice(0, 3)) {
        const d = doc.data();
        console.log(
          `   - ${doc.id}: fullName=${JSON.stringify(d.fullName)} email=${JSON.stringify(d.email)} phone=${JSON.stringify(d.phone)}`,
        );
      }
    }
    console.log("");

    toDelete.push(...bot.map((doc) => doc.ref));

    // Diagnostic: flag any "bot" doc whose name still looks plausible
    // (has a space) so we can manually sanity-check it wasn't rejected
    // only because of some other field (e.g. email format), which would
    // mean a real applicant is at risk of being deleted.
    const suspicious = bot.filter((doc) => {
      const fn = doc.data().fullName;
      return typeof fn === "string" && fn.trim().includes(" ");
    });
    if (suspicious.length > 0) {
      console.log(
        `  ⚠ ${suspicious.length} doc(s) marked for deletion but have a space in the name — review these:`,
      );
      for (const doc of suspicious) {
        console.log(`   - ${doc.id}:`, JSON.stringify(doc.data()));
      }
    }
  }

  console.log(`TOTAL to delete across all 4 collections: ${toDelete.length}`);

  if (!execute) {
    console.log("\nDry run only — re-run with --execute to actually delete.");
    process.exit(0);
  }

  if (toDelete.length === 0) {
    console.log("Nothing to delete.");
    process.exit(0);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `\nType DELETE to permanently remove these ${toDelete.length} documents: `,
    async (answer) => {
      rl.close();
      if (answer.trim() !== "DELETE") {
        console.log("Aborted — nothing was deleted.");
        process.exit(0);
      }
      console.log("Deleting...");
      await deleteInBatches(toDelete);
      console.log("Done.");
      process.exit(0);
    },
  );
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
