// scripts/updateSolomonStatus.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfiM0xnrYTZkJXvWAscOM9dD34tKITBRs",
  authDomain: "the-chorus-project.firebaseapp.com",
  projectId: "the-chorus-project",
  storageBucket: "the-chorus-project.firebasestorage.app",
  messagingSenderId: "581997206429",
  appId: "1:581997206429:web:f52457364c73c7ddf72d74",
  measurementId: "G-4J4K2KHZ3Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updateSolomonStatus = async () => {
  try {
    console.log("🔍 Searching for Solomon event...");

    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("title", "==", "Solomon"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("❌ Solomon event not found");
      return;
    }

    for (const docSnapshot of snapshot.docs) {
      await updateDoc(doc(db, "events", docSnapshot.id), {
        status: "concluded",
      });
      console.log(`✅ Updated Solomon event status to "concluded"`);
      console.log(`   Event ID: ${docSnapshot.id}`);
    }

    console.log("🎉 Update complete!");
  } catch (error) {
    console.error("❌ Error updating event:", error);
  }

  process.exit();
};

updateSolomonStatus();
