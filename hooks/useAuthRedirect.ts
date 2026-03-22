"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

// Redirects only allow users with admin records to continue.
// Non-admin authenticated users will be signed out and redirected to the members login.
export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          router.push("/admin/login");
          return;
        }

        // If user has no email (unlikely), treat as non-admin
        const email = user.email ?? null;
        if (!email) {
          await signOut(auth);
          router.push("/members/login");
          return;
        }

        // Call server-side verify-admin endpoint which checks the admins collection
        const res = await fetch(
          `/api/admin/verify-admin?email=${encodeURIComponent(email)}`,
        );

        if (!res.ok) {
          // treat as not admin
          await signOut(auth);
          router.push("/members/login");
          return;
        }

        const data = await res.json();
        if (!data.isAdmin) {
          // Signed-in user is not an admin -> prevent access
          await signOut(auth);
          router.push("/members/login");
        }
        // else: user is admin => allow to proceed
      } catch (error) {
        console.error("Error checking admin status:", error);
        try {
          await signOut(auth);
        } catch (_) {
          /* ignore */
        }
        router.push("/members/login");
      }
    });

    return () => unsubscribe();
  }, [router]);
}
