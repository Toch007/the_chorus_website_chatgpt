import { db } from "@/firebase/admin";

const MAX_SUBMISSIONS_PER_WINDOW = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MIN_FILL_TIME_MS = 3000; // real humans take at least a few seconds

// Bots that blindly fill every input tend to fill hidden fields too.
export function isHoneypotTripped(honeypot: unknown): boolean {
  return typeof honeypot === "string" && honeypot.trim().length > 0;
}

// Bots typically submit near-instantly after the page loads.
export function isSubmittedTooFast(formLoadedAt: unknown): boolean {
  const loadedAt = Number(formLoadedAt);
  if (!loadedAt || Number.isNaN(loadedAt)) return true;
  return Date.now() - loadedAt < MIN_FILL_TIME_MS;
}

// Simple per-IP submission cap stored in Firestore (Admin SDK, bypasses rules).
export async function isRateLimited(ip: string): Promise<boolean> {
  const ref = db.collection("_joinRateLimits").doc(ip);
  const snap = await ref.get();
  const now = Date.now();

  if (!snap.exists) {
    await ref.set({ count: 1, windowStart: now });
    return false;
  }

  const data = snap.data() as { count: number; windowStart: number };
  if (now - data.windowStart > WINDOW_MS) {
    await ref.set({ count: 1, windowStart: now });
    return false;
  }

  if (data.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return true;
  }

  await ref.update({ count: data.count + 1 });
  return false;
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
