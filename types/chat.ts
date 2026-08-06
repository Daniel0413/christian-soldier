export interface ChatMessage {
  id: number;
  user: string;
  rank: string;
  streak: number;
  status: "Victory" | "Defeat" | "Awaiting";
  message: string;
  time: string;
}