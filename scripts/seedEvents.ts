import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔐 Use your actual Firebase config here
const firebaseConfig = {
   apiKey: "AIzaSyCfiM0xnrYTZkJXvWAscOM9dD34tKITBRs",
  authDomain: "the-chorus-project.firebaseapp.com",
  projectId: "the-chorus-project",
  storageBucket: "the-chorus-project.firebasestorage.app",
  messagingSenderId: "581997206429",
  appId: "1:581997206429:web:f52457364c73c7ddf72d74",
  measurementId: "G-4J4K2KHZ3Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✨ All your events (copy-pasted from the canvas)
const events = [
  {
    title: "Solomon",
    date: "Saturday October, 2025",
    location: "To be announced",
    description: "Upcoming major concert for the year – Handel’s Solomon.",
    image: "/images/solomon.jpg",
    details:
      "Our next major concert: Handel’s \"Solomon\" is set for October 2025. Expect regal choruses, rich orchestration, and a dramatic retelling of the biblical story of Solomon.",
    status: "upcoming",
  },
  {
    title: "Christmas Concert",
    date: "December 2025",
    location: "To be announced",
    description: "Stay tuned for our 2025 Christmas concert – details coming soon.",
    image: "/images/christmasconcert.jpg",
    details:
      "We’re planning a special Christmas concert for December 2025. Stay tuned for updates on the selected cantata and venue.",
    status: "upcoming",
  },
  {
    title: "Creation",
    date: "Sunday November 28, 2021",
    location: "St. Matthias House, Gudu District, Abuja",
    description: "A grand oratorio by Joseph Haydn celebrating the beauty of creation.",
    image: "/images/Hadyn's Creation.jpeg",
    details:
      "Joseph Haydn's oratorio \"Creation\" was performed at St. Matthias House, Gudu District, Abuja on Sunday November 28, 2021. It marked a strong start in our concert journey with powerful choruses, solos and orchestral interludes celebrating the wonder of creation.",
    status: "concluded",
  },
  {
    title: "Mozart's 12th Mass",
    date: "Sunday September 11, 2022",
    location: "St Matthews Ang. Church, Maitama, Abuja",
    description: "A sacred mass attributed to Wenzel Müller, historically tied to Mozart's influence.",
    image: "/images/12th Mass.jpg",
    details:
      "This sacred mass, long associated with Mozart, was performed at St Matthews Anglican Church Maitama on September 11, 2022. The concert showcased the grandeur and solemnity of liturgical choral music.",
    status: "concluded",
  },
  {
    title: "Christ is Born",
    date: "Saturday December 17, 2022",
    location: "No. 3, Ruvuma Street, Maitama, Abuja",
    description: "A festive Christmas concert featuring music by John Peterson.",
    image: "/images/Christ is born.jpeg",
    details:
      "Held on Saturday December 17, 2022, this Christmas concert featured selections from John Peterson's \"Christ is Born\" cantata. The event brought warmth and joy to the season with solos, choruses, and traditional carols.",
    status: "concluded",
  },
  {
    title: "The Resurrection",
    date: "Sunday April 30, 2023",
    location: "First Baptist Church, Plot 688, Port Harcourt Crescent, Area 11, Garki, Abuja",
    description: "An Easter-themed cantata by James A. Dasher.",
    image: "/images/Resurrection original.jpeg",
    details:
      "Performed at First Baptist Church Garki on Sunday April 30th, 2023, \"The Resurrection\" explored the triumph of Christ's resurrection with a deeply spiritual and emotional presentation.",
    status: "concluded",
  },
  {
    title: "Israel In Egypt",
    date: "Saturday December 3, 2023",
    location: "St Matthews Ang. Church, Maitama, Abuja",
    description: "A powerful oratorio by Handel recounting the story of the Exodus.",
    image: "/images/Israel in egypt.jpeg",
    details:
      "\"Israel in Egypt\" by G.F. Handel was performed on December 3, 2023 at St Matthews Anglican Church. The oratorio brought together dramatic choruses and vivid storytelling from the Old Testament.",
    status: "concluded",
  },
  {
    title: "The Crucifixion",
    date: "Saturday March 29, 2024",
    location: "Live streamed",
    description: "A meditative cantata by John Stainer reflecting on the Passion.",
    image: "/images/crucifixion.jpeg",
    details:
      "John Stainer's \"The Crucifixion\" was live-streamed on March 29, 2024. It featured haunting solos and expressive choral writing recounting the events of Good Friday.",
    status: "concluded",
  },
  {
    title: "Elijah",
    date: "Saturday November 3, 2024",
    location: "Nigeria Society of Engineers Hall, 101 Sani Abacha Way, Labour House Road, CBD, Abuja",
    description: "Felix Mendelssohn’s dramatic oratorio based on the life of the prophet Elijah.",
    image: "/images/elijah.jpeg",
    details:
      "\"Elijah\" was presented on Saturday November 3, 2024 at the Nigeria Society of Engineers Hall. The performance brought Mendelssohn’s vision of the prophet to life with stirring choruses and thrilling solos.",
    status: "concluded",
  },
  {
    title: "Christ On Mount Olives",
    date: "Saturday April 13, 2025",
    location: "All Saints Church, Wuse Zone 5, Abuja",
    description: "Beethoven's rarely performed oratorio depicting Christ’s agony in Gethsemane.",
    image: "/images/christmountolives.jpeg",
    details:
      "On April 13, 2025, Beethoven’s \"Christ On Mount Olives\" was performed at All Saints Church, Wuse. The concert offered a deeply emotional and dramatic portrayal of Christ’s final hours before his arrest.",
    status: "concluded",
  }
];

const seedEvents = async () => {
  const colRef = collection(db, "events");

  for (const event of events) {
    try {
      await addDoc(colRef, event);
      console.log(`✅ Added: ${event.title}`);
    } catch (err) {
      console.error(`❌ Failed to add ${event.title}:`, err);
    }
  }
};

seedEvents().then(() => {
  console.log("🎉 Seeding complete");
  process.exit();
});
