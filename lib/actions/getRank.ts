import { ranks } from "@/lib/ranks";

export function getRank(streak: number): string {
  const currentRank = [...ranks]
    .reverse()
    .find((rank) => streak >= rank.days);

  return currentRank?.name ?? "Civilian";
}

export function getCurrentRank(streak: number) {
  return (
    [...ranks]
      .reverse()
      .find((rank) => streak >= rank.days) ?? ranks[0]
  );
}

export function getNextRank(streak: number) {
  return ranks.find((rank) => rank.days > streak) ?? null;
}

export function getRankProgress(streak: number) {
  const currentRank = getCurrentRank(streak);
  const nextRank = getNextRank(streak);

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progress: 100,
      daysRemaining: 0,
    };
  }

  const requiredRange =
    nextRank.days - currentRank.days;

  const completed =
    streak - currentRank.days;

  const progress =
    requiredRange <= 0
      ? 100
      : Math.min(
          100,
          Math.max(
            0,
            Math.round((completed / requiredRange) * 100)
          )
        );

  return {
    currentRank,
    nextRank,
    progress,
    daysRemaining: nextRank.days - streak,
  };
}