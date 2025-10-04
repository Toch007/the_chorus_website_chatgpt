// scripts/seedApplications.ts

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample choir applications
const choirApplications = [
  {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+2348012345678",
    dob: "1995-05-15",
    gender: "Female",
    address: "123 Music Street, Abuja",
    voicePart: "Soprano",
    readsMusic: "yes",
    choirExperience:
      "I sang in my church choir for 3 years and participated in several community concerts.",
    instrument: "Piano (intermediate level)",
    preferredDays: ["Tuesday", "Saturday"],
    heardAboutUs: "Friend recommendation",
    availableForRehearsals: true,
    willingToPerform: true,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-10-01T10:30:00Z"),
  },
  {
    fullName: "Michael Okafor",
    email: "michael.okafor@email.com",
    phone: "+2348087654321",
    dob: "1988-12-03",
    gender: "Male",
    address: "456 Harmony Avenue, Abuja",
    voicePart: "Bass",
    readsMusic: "basic",
    choirExperience:
      "I'm new to formal choir singing but have always loved music and sing at home.",
    instrument: "Guitar (beginner)",
    preferredDays: ["Wednesday", "Sunday"],
    heardAboutUs: "Social media",
    availableForRehearsals: true,
    willingToPerform: true,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-10-02T14:15:00Z"),
  },
  {
    fullName: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+2348098765432",
    dob: "1992-08-20",
    gender: "Female",
    address: "789 Melody Lane, Abuja",
    voicePart: "Alto",
    readsMusic: "yes",
    choirExperience:
      "Performed with university choir and have 5 years of vocal training.",
    instrument: "Violin (advanced)",
    preferredDays: ["Tuesday", "Thursday", "Saturday"],
    heardAboutUs: "Website",
    availableForRehearsals: true,
    willingToPerform: true,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-10-03T09:45:00Z"),
  },
];

// Sample volunteer applications
const volunteerApplications = [
  {
    fullName: "David Adebayo",
    email: "david.adebayo@email.com",
    phone: "+2348076543210",
    age: "28",
    occupation: "Marketing Professional",
    address: "321 Service Road, Abuja",
    volunteerArea: "Event Coordination",
    experience:
      "I have organized several corporate events and community programs.",
    availability: "Weekends and evenings",
    skills: "Project management, communication, social media",
    motivation:
      "I want to contribute to the community and support musical arts.",
    hasTransport: true,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-09-28T16:20:00Z"),
  },
  {
    fullName: "Grace Okwu",
    email: "grace.okwu@email.com",
    phone: "+2348065432109",
    age: "24",
    occupation: "Student",
    address: "654 Helper Street, Abuja",
    volunteerArea: "Hospitality & Guest Services",
    experience: "I work part-time in customer service and love helping people.",
    availability: "Flexible, mostly weekends",
    skills: "Customer service, languages (English, Igbo, Hausa), organization",
    motivation:
      "Music has always been important to me, and I want to help others experience its joy.",
    hasTransport: false,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-09-30T11:10:00Z"),
  },
];

// Sample media team applications
const mediaApplications = [
  {
    fullName: "Joshua Ibrahim",
    email: "joshua.ibrahim@email.com",
    phone: "+2348054321098",
    age: "26",
    occupation: "Freelance Photographer",
    address: "987 Creative Hub, Abuja",
    mediaSkills: ["Photography", "Video Editing", "Social Media"],
    experience:
      "Professional photographer for 4 years, specializing in events and portraits.",
    equipment: "DSLR camera, editing software, lighting equipment",
    portfolio: "instagram.com/joshua_captures",
    availability: "Very flexible, including weekends",
    willingToTravel: true,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-09-29T13:30:00Z"),
  },
];

// Sample tech team applications
const techApplications = [
  {
    fullName: "Samuel Nkomo",
    email: "samuel.nkomo@email.com",
    phone: "+2348043210987",
    age: "30",
    occupation: "Sound Engineer",
    address: "147 Tech Valley, Abuja",
    techSkills: ["Sound Engineering", "Audio Mixing", "Equipment Setup"],
    experience: "8 years in live sound production for concerts and events.",
    equipment: "Mixing console, microphones, various audio gear",
    certifications: "Audio Engineering Certificate, Live Sound Certification",
    availability: "Weekends and selected weekdays",
    willingToTravel: true,
    photoConsent: true,
    declaration: true,
    submittedAt: new Date("2024-10-01T08:15:00Z"),
  },
];

async function seedApplications() {
  try {
    console.log("🌱 Starting to seed applications...");

    // Seed choir applications
    console.log("📝 Seeding choir applications...");
    for (const app of choirApplications) {
      await addDoc(collection(db, "join_choir"), {
        ...app,
        submittedAt: serverTimestamp(),
      });
    }

    // Seed volunteer applications
    console.log("🙋 Seeding volunteer applications...");
    for (const app of volunteerApplications) {
      await addDoc(collection(db, "join_volunteer"), {
        ...app,
        submittedAt: serverTimestamp(),
      });
    }

    // Seed media applications
    console.log("🎥 Seeding media team applications...");
    for (const app of mediaApplications) {
      await addDoc(collection(db, "join_media"), {
        ...app,
        submittedAt: serverTimestamp(),
      });
    }

    // Seed tech applications
    console.log("🛠️ Seeding tech team applications...");
    for (const app of techApplications) {
      await addDoc(collection(db, "join_tech"), {
        ...app,
        submittedAt: serverTimestamp(),
      });
    }

    console.log("✅ Successfully seeded all applications!");
    console.log(`📊 Total applications created:`);
    console.log(`   Choir: ${choirApplications.length}`);
    console.log(`   Volunteer: ${volunteerApplications.length}`);
    console.log(`   Media: ${mediaApplications.length}`);
    console.log(`   Tech: ${techApplications.length}`);
  } catch (error) {
    console.error("❌ Error seeding applications:", error);
    process.exit(1);
  }
}

seedApplications();
