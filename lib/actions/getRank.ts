export function getRank(streak: number): string {
  if (streak >= 800) return "General of the Army";
  if (streak >= 730) return "General";
  if (streak >= 690) return "Lieutenant General";
  if (streak >= 660) return "Major General";
  if (streak >= 630) return "Brigadier General";
  if (streak >= 600) return "Colonel";
  if (streak >= 570) return "Lieutenant Colonel";
  if (streak >= 540) return "Major";
  if (streak >= 510) return "Captain";
  if (streak >= 480) return "First Lieutenant";
  if (streak >= 450) return "Second Lieutenant";
  if (streak >= 420) return "Chief Warrant Officer 5";
  if (streak >= 390) return "Chief Warrant Officer 4";
  if (streak >= 360) return "Chief Warrant Officer 3";
  if (streak >= 330) return "Chief Warrant Officer 2";
  if (streak >= 300) return "Warrant Officer 1";
  if (streak >= 270) return "Sergeant Major of the Army";
  if (streak >= 240) return "Command Sergeant Major";
  if (streak >= 210) return "Sergeant Major";
  if (streak >= 180) return "First Sergeant";
  if (streak >= 150) return "Master Sergeant";
  if (streak >= 120) return "Sergeant First Class";
  if (streak >= 90) return "Staff Sergeant";
  if (streak >= 60) return "Sergeant";
  if (streak >= 45) return "Corporal";
  if (streak >= 30) return "Specialist";
  if (streak >= 21) return "Private First Class";
  if (streak >= 14) return "Private (PV2)";
  if (streak >= 7) return "Private (PV1)";
  if (streak >= 1) return "Recruit";

  return "Civilian";
}