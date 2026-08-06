// =============================
// Current Logged-in User
// =============================

export const currentUser = {
  id: "1",

  name: "Renz Danel",

  email: "renz@example.com",

  rank: "Recruit",

  currentStreak: 15,

  bestStreak: 25,

  joined: "August 2026",

  avatar: "",

  status: "Awaiting",

  online: true,

  bio: "Fight the good fight of faith.",
};

// =============================
// Leaderboard
// =============================

export const leaderboard = [
  {
    id: 1,
    name: "Genesis",
    rank: "Sergeant",
    streak: 42,
    status: "Victory",
  },
  {
    id: 2,
    name: "Timothy",
    rank: "Corporal",
    streak: 35,
    status: "Victory",
  },
  {
    id: 3,
    name: "Renz Daniel",
    rank: "Recruit",
    streak: 15,
    status: "Awaiting",
  },
  {
    id: 4,
    name: "Braver",
    rank: "Recruit",
    streak: 20,
    status: "Victory",
  },
  {
    id: 5,
    name: "Rudsan",
    rank: "Recruit",
    streak: 14,
    status: "Defeat",
  },
];

// =============================
// Chat Messages
// =============================

export const chatMessages = [
  {
    id: 1,
    user: "Genesis",
    rank: "Sergeant",
    streak: 42,
    status: "Victory" as const,
    message: "Stay faithful, brothers.",
    time: "6:05 PM",
  },
  {
    id: 2,
    user: "Timothy",
    rank: "Corporal",
    streak: 35,
    status: "Victory" as const,
    message: "Praying for everyone today.",
    time: "6:07 PM",
  },
  {
    id: 3,
    user: "Renz Daniel",
    rank: "Recruit",
    streak: 15,
    status: "Awaiting" as const,
    message: "Fight the good fight!",
    time: "6:10 PM",
  },
];
// =============================
// Orders
// =============================

export const orders = [
  {
    id: 1,
    icon: "⚔",
    title: "Daily Battle Report",
    description: "Report your victory or defeat before 6:00 PM.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: "📖",
    title: "Verse of the Day",
    description: "Today's Scripture is now available.",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: "🏅",
    title: "Promotion",
    description: "Congratulations! You have been promoted to Recruit.",
    time: "Yesterday",
  },
];

// =============================
// Verse of the Day
// =============================

export const verse = {
  reference: "1 Timothy 6:12",

  text: "Fight the good fight of the faith. Take hold of the eternal life to which you were called.",
};