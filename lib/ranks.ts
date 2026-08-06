export interface RankLevel {
  days: number;
  name: string;
  abbreviation: string;
  icon: string;
}

export const ranks: RankLevel[] = [
  {
    days: 0,
    name: "Civilian",
    abbreviation: "CIV",
    icon: "⭕",
  },
  {
    days: 1,
    name: "Recruit",
    abbreviation: "RCT",
    icon: "🆕",
  },
  {
    days: 7,
    name: "Private",
    abbreviation: "PV1",
    icon: "⚪",
  },
  {
    days: 14,
    name: "Private",
    abbreviation: "PV2",
    icon: "🔹",
  },
  {
    days: 21,
    name: "Private First Class",
    abbreviation: "PFC",
    icon: "🟢",
  },
  {
    days: 30,
    name: "Specialist",
    abbreviation: "SPC",
    icon: "💪",
  },
  {
    days: 45,
    name: "Corporal",
    abbreviation: "CPL",
    icon: "🎯",
  },
  {
    days: 60,
    name: "Sergeant",
    abbreviation: "SGT",
    icon: "🪖",
  },
  {
    days: 90,
    name: "Staff Sergeant",
    abbreviation: "SSG",
    icon: "⚔️",
  },
  {
    days: 120,
    name: "Sergeant First Class",
    abbreviation: "SFC",
    icon: "🔥",
  },
  {
    days: 150,
    name: "Master Sergeant",
    abbreviation: "MSG",
    icon: "🛡️",
  },
  {
    days: 180,
    name: "First Sergeant",
    abbreviation: "1SG",
    icon: "⭐",
  },
  {
    days: 210,
    name: "Sergeant Major",
    abbreviation: "SGM",
    icon: "🏅",
  },
  {
    days: 240,
    name: "Command Sergeant Major",
    abbreviation: "CSM",
    icon: "🦅",
  },
  {
    days: 270,
    name: "Sergeant Major of the Army",
    abbreviation: "SMA",
    icon: "👑",
  },
  {
    days: 300,
    name: "Warrant Officer 1",
    abbreviation: "WO1",
    icon: "🪶",
  },
  {
    days: 330,
    name: "Chief Warrant Officer 2",
    abbreviation: "CW2",
    icon: "⚙️",
  },
  {
    days: 360,
    name: "Chief Warrant Officer 3",
    abbreviation: "CW3",
    icon: "🔧",
  },
  {
    days: 390,
    name: "Chief Warrant Officer 4",
    abbreviation: "CW4",
    icon: "🛠️",
  },
  {
    days: 420,
    name: "Chief Warrant Officer 5",
    abbreviation: "CW5",
    icon: "⚜️",
  },
  {
    days: 450,
    name: "Second Lieutenant",
    abbreviation: "2LT",
    icon: "🥉",
  },
  {
    days: 480,
    name: "First Lieutenant",
    abbreviation: "1LT",
    icon: "🥈",
  },
  {
    days: 510,
    name: "Captain",
    abbreviation: "CPT",
    icon: "🎖️",
  },
  {
    days: 540,
    name: "Major",
    abbreviation: "MAJ",
    icon: "⭐",
  },
  {
    days: 570,
    name: "Lieutenant Colonel",
    abbreviation: "LTC",
    icon: "🦅",
  },
  {
    days: 600,
    name: "Colonel",
    abbreviation: "COL",
    icon: "👑",
  },
  {
    days: 630,
    name: "Brigadier General",
    abbreviation: "BG",
    icon: "🌟",
  },
  {
    days: 660,
    name: "Major General",
    abbreviation: "MG",
    icon: "🌟🌟",
  },
  {
    days: 690,
    name: "Lieutenant General",
    abbreviation: "LTG",
    icon: "🌟🌟🌟",
  },
  {
    days: 730,
    name: "General",
    abbreviation: "GEN",
    icon: "🌟🌟🌟🌟",
  },
  {
    days: 800,
    name: "General of the Army",
    abbreviation: "GOA",
    icon: "⭐⭐⭐⭐⭐",
  },
];