// Dashboard data types matching the UI structure

export type Venue = "POLY" | "KAL";

export type SmartSide = "YES" | "NO";

export type SignalTag = "PRE-MOVE" | "ANOMALY" | "NORMAL";

export interface SharpAlignmentBreakdown {
  yesCount: number;
  noCount: number;
  totalSharps: number;
}

export interface WalletCounts {
  yesSharps: number;
  noSharps: number;
}

export interface MarketRow {
  id: string;
  question: string;
  venue: Venue;
  price: number; // Current YES probability (0-1)
  smartSide: SmartSide;
  sharpAlignment: number; // 0-1
  sharpAlignmentBreakdown: SharpAlignmentBreakdown;
  walletCounts: WalletCounts;
  netFlow: string; // e.g., "+6 wallets / 2h"
  signalTag: SignalTag;
}

export interface SharpWalletPosition {
  walletAddress: string;
  side: SmartSide;
  tier: "S" | "A" | "B" | "C";
  positionSize?: number;
  pnl?: number;
}

export interface MarketDetail extends MarketRow {
  sharpWalletPositions: {
    yes: SharpWalletPosition[];
    no: SharpWalletPosition[];
  };
}

export interface SignalEvent {
  time: string; // e.g., "13:07:12"
  text: string; // e.g., "SHARP POSITION"
  detail: string; // e.g., " / POLY-ETH-VOL / "
  highlight?: string; // e.g., "+$47K"
  color: string; // e.g., "#4a9eb8"
  highlightColor?: string; // e.g., "#ff8800"
}

export interface DashboardData {
  markets: MarketRow[];
  signalEvents: SignalEvent[];
}

