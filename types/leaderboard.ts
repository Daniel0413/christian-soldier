export interface LeaderboardUser {
  id: number;
  name: string;
  rank: string;
  streak: number;
  status: "Victory" | "Defeat" | "Awaiting";
}