/** Pricing tier definitions and helpers for the founders promotion */

export interface PricingTier {
  dates: string;
  price: string;
  start: Date;
  end: Date;
}

export const PRICING_TIERS: PricingTier[] = [
  { dates: "10–30 abril", price: "15", start: new Date("2026-04-10T00:00:00+02:00"), end: new Date("2026-05-01T00:00:00+02:00") },
  { dates: "1–15 mayo", price: "20", start: new Date("2026-05-01T00:00:00+02:00"), end: new Date("2026-05-16T00:00:00+02:00") },
  { dates: "16–31 mayo", price: "25", start: new Date("2026-05-16T00:00:00+02:00"), end: new Date("2026-06-01T00:00:00+02:00") },
];

/** Absolute deadline: May 31 at 23:59:59 CEST */
export const FOUNDERS_DEADLINE = new Date("2026-05-31T23:59:59+02:00");

export type TierStatus = "expired" | "active" | "upcoming";

export interface TierInfo {
  tier: PricingTier;
  status: TierStatus;
}

export interface PromotionState {
  isExpired: boolean;
  activeTierIndex: number; // -1 if before first tier or all expired
  tiers: TierInfo[];
  countdownTarget: Date | null; // null when fully expired
}

export function getPromotionState(now: Date = new Date()): PromotionState {
  const nowMs = now.getTime();

  // All expired
  if (nowMs > FOUNDERS_DEADLINE.getTime()) {
    return {
      isExpired: true,
      activeTierIndex: -1,
      tiers: PRICING_TIERS.map(t => ({ tier: t, status: "expired" })),
      countdownTarget: null,
    };
  }

  // Before first tier starts — countdown to first tier
  if (nowMs < PRICING_TIERS[0].start.getTime()) {
    return {
      isExpired: false,
      activeTierIndex: 0,
      tiers: PRICING_TIERS.map((t, i) => ({
        tier: t,
        status: i === 0 ? "active" : "upcoming",
      })),
      countdownTarget: PRICING_TIERS[0].start,
    };
  }

  // Find active tier
  let activeTierIndex = -1;
  const tiers: TierInfo[] = PRICING_TIERS.map((t, i) => {
    if (nowMs >= t.end.getTime()) return { tier: t, status: "expired" as TierStatus };
    if (nowMs >= t.start.getTime() && nowMs < t.end.getTime()) {
      activeTierIndex = i;
      return { tier: t, status: "active" as TierStatus };
    }
    return { tier: t, status: "upcoming" as TierStatus };
  });

  const countdownTarget = activeTierIndex >= 0 ? PRICING_TIERS[activeTierIndex].end : null;

  return { isExpired: false, activeTierIndex, tiers, countdownTarget };
}
