/** Pricing tier definitions and helpers for the launch offer.
 *
 * NOTE: La preventa escalonada ha finalizado. Mantenemos un precio de
 * lanzamiento único (25€/mes Plan Plus) para los primeros 30 publishers.
 * Cuando se completen las plazas, se cerrará y pasaremos a precio normal.
 * Sin cuenta atrás por fecha.
 */

export interface PricingTier {
  dates: string;
  price: string;
  start: Date;
  end: Date;
}

/** Launch tier — precio único para los primeros 30 publishers */
export const LAUNCH_TIER: PricingTier = {
  dates: "Precio de lanzamiento",
  price: "25",
  start: new Date("2026-01-01T00:00:00+02:00"),
  end: new Date("2099-12-31T23:59:59+02:00"),
};

/** Kept for backwards compatibility with existing imports */
export const PRICING_TIERS: PricingTier[] = [LAUNCH_TIER];
export const FOUNDERS_DEADLINE = LAUNCH_TIER.end;

export type TierStatus = "expired" | "active" | "upcoming";

export interface TierInfo {
  tier: PricingTier;
  status: TierStatus;
}

export interface PromotionState {
  isExpired: boolean;
  activeTierIndex: number;
  tiers: TierInfo[];
  countdownTarget: Date | null;
  /** Modo de la promoción: 'launch' = precio único para primeros 30 */
  mode: "launch";
  seatsTotal: number;
}

export function getPromotionState(_now: Date = new Date()): PromotionState {
  return {
    isExpired: false,
    activeTierIndex: 0,
    tiers: [{ tier: LAUNCH_TIER, status: "active" }],
    countdownTarget: null,
    mode: "launch",
    seatsTotal: 30,
  };
}
