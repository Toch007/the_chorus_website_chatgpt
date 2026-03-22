import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";

export function useMemberAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [memberData, setMemberData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        // Fetch member data
        try {
          const response = await fetch(
            `/api/members/check-status?uid=${currentUser.uid}`
          );
          const data = await response.json();

          if (data.exists && data.status === "approved") {
            setUser(currentUser);
            setMemberData(data.memberData);
          } else {
            // Not approved or doesn't exist
            await auth.signOut();
            router.push("/members/login");
          }
        } catch (error) {
          console.error("Error fetching member data:", error);
          await auth.signOut();
          router.push("/members/login");
        }
      } else {
        // Not logged in or email not verified
        setUser(null);
        setMemberData(null);
        router.push("/members/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { user, memberData, loading };
}
