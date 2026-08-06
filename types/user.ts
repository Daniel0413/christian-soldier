export interface User {
  id: string;
  name: string;
  email: string;
  rank: string;
  currentStreak: number;
  bestStreak: number;
  joined: string;
  avatar: string;
  status: "Victory" | "Defeat" | "Awaiting";
  online: boolean;
  bio: string;
}