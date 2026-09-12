"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

// Redirects only allow users with admin records to continue.
// Non-admin authenticated users will be signed out and redirected to the admin login.
export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          router.push("/admin/login");
          return;
        }

        const email = user.email ?? null;
        if (!email) {
          await signOut(auth);
          router.push("/admin/login");
          return;
        }

        // Call server-side verify-admin endpoint which checks the admins collection
        const res = await fetch(
          `/api/admin/verify-admin?email=${encodeURIComponent(email)}`,
        );

        if (!res.ok) {
          await signOut(auth);
          router.push("/admin/login");
          return;
        }

        const data = await res.json();
        if (!data.isAdmin) {
          await signOut(auth);
          router.push("/admin/login");
        }
        // else: user is admin => allow to proceed
      } catch (error) {
        console.error("Error checking admin status:", error);
        try {
          await signOut(auth);
        } catch (_) {
          /* ignore */
        }
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);
}
