import { domeClient } from "./dome";
import type { DashboardData, MarketRow, SignalEvent, Venue, SmartSide, SignalTag, SharpWalletPosition } from "./types";

/**
 * Fetches dashboard data from Dome API and transforms it into the format needed by the UI
 */
export async function getDashboardData(): Promise<DashboardData> {
  try {
    console.log("[Dome] Starting getDashboardData() - Polymarket only");
    const apiKey = process.env.DOME_API_KEY?.replace(/^["']|["']$/g, '').trim();
    console.log("[Dome] API key present:", !!apiKey);
    console.log("[Dome] API key prefix:", apiKey?.substring(0, Math.min(10, apiKey?.length || 0)));
    console.log("[Dome] API key length:", apiKey?.length || 0);
    
    if (apiKey === 'code' || apiKey === '"code"') {
      console.warn("[Dome] ⚠️  API key appears to be placeholder 'code'. Please replace with your actual Dome API key!");
    }
    
    // Fetch markets from Polymarket only
    let polymarketMarkets: any[] = [];
    try {
      polymarketMarkets = await fetchMarketsForVenue("polymarket", "culture");
      console.log("[Dome] Polymarket markets:", polymarketMarkets.length, "(success)");
    } catch (error: any) {
      console.warn("[Dome] Polymarket call failed:", error.message || "unknown");
      console.warn("[Dome] Falling back to sample data");
      return getSampleDashboardData();
    }

    // Tag markets with venue
    const allMarkets = polymarketMarkets.map(m => ({ ...m, _venue: "polymarket" }));
    
    console.log("[Dome] Total markets from API:", allMarkets.length);
    
    // If we have no markets but at least one call succeeded, return empty arrays
    // (don't fall back to sample data - the API just returned empty results)
    
    console.log("[Dome] Fetching prices for", allMarkets.length, "markets");
    
    // Fetch prices for all markets
    const priceMap = await fetchPricesForMarkets(domeClient, allMarkets);
    
    console.log("[Dome] Processing", allMarkets.length, "markets");
    
    // Transform to MarketRow format
    const marketRows: MarketRow[] = await Promise.all(
      allMarkets.map(async (market) => {
        // Extract market ID - try multiple fields as Polymarket and Kalshi use different shapes
        const marketId =
          market.condition_id ||
          market.id ||
          market.ticker ||
          market.slug ||
          market.market_slug ||
          market.name ||
          "unknown";
        
        const venue = (market as any)._venue || "unknown";
        
        // Get wallet analytics for this market
        const walletAnalytics = await getWalletAnalytics(marketId, venue);
        
        // Compute sharp alignment metrics
        const sharpAlignment = computeSharpAlignment(walletAnalytics);
        const smartSide = walletAnalytics.yesSharps > walletAnalytics.noSharps ? "YES" : "NO";
        const netFlow = computeNetFlow(walletAnalytics);
        const signalTag = determineSignalTag(sharpAlignment, walletAnalytics);

        // Extract market data from Dome API response
        // API structure: {market_slug, title, condition_id, side_a, side_b, price, yesPrice, probability, ...}
        const question = market.title || market.question || market.name || "Unknown Market";
        const venueCode = "POLY"; // Only Polymarket markets now
        
        // Use the price from priceMap, fallback to 0.5 if not found
        const price = priceMap[marketId] ?? 0.5;

        return {
          id: marketId,
          question,
          venue: venueCode,
          price: price,
          smartSide,
          sharpAlignment,
          sharpAlignmentBreakdown: {
            yesCount: walletAnalytics.yesSharps,
            noCount: walletAnalytics.noSharps,
            totalSharps: walletAnalytics.yesSharps + walletAnalytics.noSharps,
          },
          walletCounts: {
            yesSharps: walletAnalytics.yesSharps,
            noSharps: walletAnalytics.noSharps,
          },
          netFlow,
          signalTag,
        };
      })
    );

    // Filter out markets without valid prices (price === 0.5 means fallback/error)
    const marketsWithValidPrices = marketRows.filter(m => m.price !== 0.5);
    console.log(`[Dome] Filtered to ${marketsWithValidPrices.length} markets with valid prices (removed ${marketRows.length - marketsWithValidPrices.length} without prices)`);

    // Sort by sharp alignment (highest first)
    marketsWithValidPrices.sort((a, b) => b.sharpAlignment - a.sharpAlignment);

    // Generate signal events from market activity
    const signalEvents = generateSignalEvents(marketsWithValidPrices);

    return {
      markets: marketsWithValidPrices,
      signalEvents,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}

/**
 * Fetches markets for a specific venue and category using the DOME SDK
 */
async function fetchMarketsForVenue(venue: "polymarket" | "kalshi", category?: string): Promise<any[]> {
  try {
    console.log(`[Dome] Attempting to fetch ${category || 'all'} markets for venue: ${venue} using SDK`);
    
    // Use the DOME SDK to fetch markets
    let response: any;
    
    if (venue === "polymarket") {
      // Try different SDK method patterns
      try {
        // Pattern 1: domeClient.polymarket.markets.getMarkets()
        if (domeClient.polymarket?.markets?.getMarkets) {
          response = await domeClient.polymarket.markets.getMarkets({ limit: 100 });
        }
        // Pattern 2: domeClient.polymarket.markets.list()
        else if (domeClient.polymarket?.markets?.list) {
          response = await domeClient.polymarket.markets.list({ limit: 100 });
        }
        // Pattern 3: domeClient.polymarket.getMarkets()
        else if (domeClient.polymarket?.getMarkets) {
          response = await domeClient.polymarket.getMarkets({ limit: 100 });
        }
        else {
          throw new Error("Could not find getMarkets method on polymarket client");
        }
      } catch (sdkError: any) {
        console.error(`[Dome] SDK method error for ${venue}:`, sdkError.message);
        // Log available methods for debugging
        if (domeClient.polymarket) {
          console.log(`[Dome] Available polymarket methods:`, Object.keys(domeClient.polymarket));
          if (domeClient.polymarket.markets) {
            console.log(`[Dome] Available polymarket.markets methods:`, Object.keys(domeClient.polymarket.markets));
          }
        }
        throw sdkError;
      }
    } else if (venue === "kalshi") {
      // Try different SDK method patterns for Kalshi
      try {
        // Pattern 1: domeClient.kalshi.markets.getMarkets()
        if (domeClient.kalshi?.markets?.getMarkets) {
          response = await domeClient.kalshi.markets.getMarkets({ limit: 5 });
        }
        // Pattern 2: domeClient.kalshi.markets.list()
        else if (domeClient.kalshi?.markets?.list) {
          response = await domeClient.kalshi.markets.list({ limit: 5 });
        }
        // Pattern 3: domeClient.kalshi.getMarkets()
        else if (domeClient.kalshi?.getMarkets) {
          response = await domeClient.kalshi.getMarkets({ limit: 5 });
        }
        else {
          throw new Error("Could not find getMarkets method on kalshi client");
        }
      } catch (sdkError: any) {
        console.error(`[Dome] SDK method error for ${venue}:`, sdkError.message);
        // Log available methods for debugging
        if (domeClient.kalshi) {
          console.log(`[Dome] Available kalshi methods:`, Object.keys(domeClient.kalshi));
          if (domeClient.kalshi.markets) {
            console.log(`[Dome] Available kalshi.markets methods:`, Object.keys(domeClient.kalshi.markets));
          }
        }
        throw sdkError;
      }
    } else {
      throw new Error(`Unknown venue: ${venue}`);
    }
    
    console.log(`[Dome] SDK response from ${venue}:`, {
      hasResponse: !!response,
      responseType: typeof response,
      responseKeys: response && typeof response === 'object' ? Object.keys(response) : [],
      isArray: Array.isArray(response),
    });
    
    // SDK may return markets array directly or wrapped in an object
    let markets: any[] = [];
    if (Array.isArray(response)) {
      markets = response;
    } else if (response?.markets && Array.isArray(response.markets)) {
      markets = response.markets;
    } else if (response?.data && Array.isArray(response.data)) {
      markets = response.data;
    } else if (response && typeof response === 'object') {
      // Try to find any array property
      const arrayKeys = Object.keys(response).filter(key => Array.isArray(response[key]));
      if (arrayKeys.length > 0) {
        markets = response[arrayKeys[0]];
        console.log(`[Dome] Found markets in property: ${arrayKeys[0]}`);
      }
    }
    
    console.log(`[Dome] Extracted ${markets.length} markets from ${venue} SDK response`);
    
    // Use all markets (no category filter for now)
    const originalCount = markets.length;
    const filteredCount = originalCount;
    console.log(
      `[Dome] Using all ${filteredCount} markets for ${venue} (no category filter)`
    );
    // keep "markets" as-is, no filter
    
    console.log(`[Dome] Returning ${markets.length} markets for ${venue}${category ? ` (${category})` : ''}`);
    
    return markets;
  } catch (error: any) {
    const errorMessage = error.message || String(error);
    console.error(`[Dome] Error fetching ${venue} markets via SDK:`, {
      message: errorMessage,
      stack: error.stack,
      error: error,
    });
    
    // Provide helpful error messages
    if (errorMessage.includes('Unauthorized') || errorMessage.includes('Invalid') || errorMessage.includes('401')) {
      console.error(`[Dome] ⚠️  Authentication failed! This usually means:`);
      console.error(`[Dome]   1. Your API key is incorrect or expired`);
      console.error(`[Dome]   2. Your API key has quotes around it (remove quotes from .env.local)`);
      console.error(`[Dome]   3. Server needs restart to pick up new env variables`);
      console.error(`[Dome]   4. Check your .env.local file: DOME_API_KEY=your-api-key (no quotes)`);
      console.error(`[Dome]   Then restart your dev server: npm run dev`);
    }
    
    // Re-throw the error so Promise.allSettled can detect it
    throw error;
  }
}

// Track logged "unknown" market IDs to avoid spam
const loggedUnknownIds = new Set<string>();

/**
 * Fetches prices for markets from the Dome market-price endpoint
 * Returns a Record mapping market.id to price (0-1)
 */
async function fetchPricesForMarkets(
  domeClient: any,
  markets: any[]
): Promise<Record<string, number>> {
  if (markets.length === 0) {
    return {};
  }

  console.log(`[Dome] Fetching prices for ${markets.length} markets...`);

  const priceMap: Record<string, number> = {};

  // Fetch prices for all markets in parallel
  await Promise.all(
    markets.map(async (market) => {
      const venue = (market as any)._venue || "unknown";
      
      // Extract market ID for mapping
      const marketId =
        market.condition_id ||
        market.id ||
        market.ticker ||
        market.slug ||
        market.market_slug ||
        market.name ||
        "unknown";

      try {
        if (venue === "polymarket") {
          // For Polymarket, derive token_id from outcome token fields
          const tokenId =
            market.side_a?.id ||
            market.sideA?.id ||
            market.outcomes?.[0]?.id ||
            market.sides?.[0]?.id ||
            null;

          if (!tokenId) {
            console.log(`[Dome] No outcome token_id found for Polymarket market ${marketId}, using fallback price`);
            priceMap[marketId] = 0.5;
            return;
          }

          const tokenIdStr = String(tokenId);
          
          // Skip if token_id starts with "0x" (hex format not supported)
          if (tokenIdStr.startsWith("0x")) {
            console.log(`[Dome] Skipping hex token_id for Polymarket market ${marketId}, using fallback price`);
            priceMap[marketId] = 0.5;
            return;
          }

          // Try different SDK method patterns for getMarketPrice
          try {
            let priceResponse: any = null;
            
            if (domeClient.polymarket?.markets?.getMarketPrice) {
              priceResponse = await domeClient.polymarket.markets.getMarketPrice({ token_id: tokenIdStr });
            } else if (domeClient.polymarket?.getMarketPrice) {
              priceResponse = await domeClient.polymarket.getMarketPrice({ token_id: tokenIdStr });
            } else {
              throw new Error("getMarketPrice method not found on polymarket client");
            }

            // Extract price from response (YES probability, 0-1)
            const price =
              priceResponse?.price ??
              priceResponse?.yesPrice ??
              priceResponse?.probability ??
              priceResponse?.yes_price ??
              (typeof priceResponse === 'number' ? priceResponse : null) ??
              0.5;

            console.log(`[Dome] Fetched Polymarket price for market ${marketId} using token_id ${tokenIdStr}: ${price}`);
            priceMap[marketId] = price;
          } catch (sdkError: any) {
            console.warn(`[Dome] Error fetching Polymarket price for ${marketId} (token_id: ${tokenIdStr}):`, sdkError.message);
            priceMap[marketId] = 0.5;
          }
        } else {
          // Unknown venue (shouldn't happen since we only fetch Polymarket now)
          priceMap[marketId] = 0.5;
        }
      } catch (error: any) {
        // If any error occurs, fall back to 0.5
        console.warn(`[Dome] Error fetching price for ${venue} market ${marketId}:`, error.message);
        priceMap[marketId] = 0.5;
      }
    })
  );

  const successCount = Object.values(priceMap).filter(p => p !== 0.5).length;
  console.log(`[Dome] Successfully fetched prices for ${successCount}/${markets.length} markets`);

  return priceMap;
}

/**
 * Gets wallet analytics for a specific market
 */
async function getWalletAnalytics(marketId: string, venue: string = "unknown"): Promise<{
  yesSharps: number;
  noSharps: number;
  totalSharps: number;
  recentActivity: any[];
}> {
  try {
    // For now, return mock wallet analytics
    // TODO: Implement wallet analytics endpoint when available
    // According to docs: https://docs.domeapi.io/ - wallet endpoints exist but need market-specific calls
    
    // Only log "unknown" IDs once to reduce spam
    if (marketId === "unknown") {
      const logKey = `${venue}:${marketId}`;
      if (!loggedUnknownIds.has(logKey)) {
        console.log(`[Dome] Generating mock wallet analytics for ${venue} market ${marketId}`);
        loggedUnknownIds.add(logKey);
      }
    } else {
      console.log(`[Dome] Generating mock wallet analytics for ${venue} market ${marketId}`);
    }
    
    // Generate realistic mock data for testing
    const mockYesSharps = Math.floor(Math.random() * 10) + 1;
    const mockNoSharps = Math.floor(Math.random() * 5);
    return {
      yesSharps: mockYesSharps,
      noSharps: mockNoSharps,
      totalSharps: mockYesSharps + mockNoSharps,
      recentActivity: [],
    };
  } catch (error) {
    console.error(`Error fetching wallet analytics for ${venue} market ${marketId}:`, error);
    // Return defaults if API fails
    return {
      yesSharps: 0,
      noSharps: 0,
      totalSharps: 0,
      recentActivity: [],
    };
  }
}

/**
 * Computes sharp alignment: max(yesSharps, noSharps) / totalSharps
 */
function computeSharpAlignment(analytics: {
  yesSharps: number;
  noSharps: number;
  totalSharps: number;
}): number {
  if (analytics.totalSharps === 0) return 0;
  return Math.max(analytics.yesSharps, analytics.noSharps) / analytics.totalSharps;
}

/**
 * Computes a human-readable net flow string
 */
function computeNetFlow(analytics: {
  yesSharps: number;
  noSharps: number;
  recentActivity: any[];
}): string {
  // Calculate net change in wallets over recent period
  const netChange = analytics.yesSharps - analytics.noSharps;
  const sign = netChange >= 0 ? "+" : "";
  
  // Estimate time window from recent activity (default to 2h if no data)
  const timeWindow = analytics.recentActivity.length > 0 ? "2h" : "2h";
  
  return `${sign}${Math.abs(netChange)} wallets / ${timeWindow}`;
}

/**
 * Determines signal tag based on alignment and wallet metrics
 */
function determineSignalTag(
  alignment: number,
  analytics: { yesSharps: number; noSharps: number; recentActivity: any[] }
): SignalTag {
  if (alignment >= 0.9 && analytics.recentActivity.length > 3) {
    return "PRE-MOVE";
  }
  if (alignment < 0.7 || Math.abs(analytics.yesSharps - analytics.noSharps) <= 1) {
    return "ANOMALY";
  }
  return "NORMAL";
}

/**
 * Generates signal events from market data
 */
function generateSignalEvents(markets: MarketRow[]): SignalEvent[] {
  const events: SignalEvent[] = [];
  const now = new Date();

  // Generate events from top markets
  markets.slice(0, 5).forEach((market) => {
    if (market.sharpAlignment >= 0.9) {
      events.push({
        time: formatTime(now),
        text: "SHARP POSITION",
        detail: ` / ${market.venue}-${market.question.slice(0, 10).toUpperCase().replace(/\s/g, "-")} / `,
        highlight: `+${market.walletCounts.yesSharps + market.walletCounts.noSharps} wallets`,
        color: "#4a9eb8",
        highlightColor: "#ff8800",
      });
    }

    if (market.signalTag === "PRE-MOVE") {
      events.push({
        time: formatTime(new Date(now.getTime() - 300000)), // 5 min ago
        text: "CLUSTER EXPANSION",
        detail: ` / ${market.walletCounts.yesSharps + market.walletCounts.noSharps - 2} → ${market.walletCounts.yesSharps + market.walletCounts.noSharps} WALLETS`,
        highlight: "",
        color: "#4a9eb8",
      });
    }
  });

  // Sort by time (most recent first)
  return events.sort((a, b) => b.time.localeCompare(a.time)).slice(0, 7);
}

/**
 * Gets sharp wallet positions for a specific market
 */
export async function getSharpWalletPositions(marketId: string): Promise<{
  yes: SharpWalletPosition[];
  no: SharpWalletPosition[];
}> {
  try {
    const analytics = await getWalletAnalytics(marketId);
    
    // Generate mock wallet positions based on analytics
    // In production, you'd fetch actual wallet addresses from Dome
    const yesPositions: SharpWalletPosition[] = Array.from({ length: analytics.yesSharps }).map((_, i) => ({
      walletAddress: `${marketId.slice(0, 8).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      side: "YES" as SmartSide,
      tier: i === 0 ? "S" : i === 1 ? "A" : i === 2 ? "B" : "C",
    }));

    const noPositions: SharpWalletPosition[] = Array.from({ length: analytics.noSharps }).map((_, i) => ({
      walletAddress: `${marketId.slice(0, 8).toUpperCase()}-${String(i + 10).padStart(3, '0')}`,
      side: "NO" as SmartSide,
      tier: i === 0 ? "B" : i === 1 ? "A" : "C",
    }));

    return {
      yes: yesPositions,
      no: noPositions,
    };
  } catch (error) {
    console.error(`Error fetching wallet positions for market ${marketId}:`, error);
    return {
      yes: [],
      no: [],
    };
  }
}

/**
 * Formats time as HH:MM:SS
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Returns sample dashboard data for testing when API is not available
 */
function getSampleDashboardData(): DashboardData {
  const now = new Date();
  const sampleMarkets: MarketRow[] = [
    {
      id: "sample-1",
      question: "Will Taylor Swift win Album of the Year at 2025 Grammys?",
      venue: "POLY",
      price: 0.73,
      smartSide: "YES",
      sharpAlignment: 0.93,
      sharpAlignmentBreakdown: { yesCount: 7, noCount: 1, totalSharps: 8 },
      walletCounts: { yesSharps: 7, noSharps: 1 },
      netFlow: "+6 wallets / 2h",
      signalTag: "PRE-MOVE",
    },
    {
      id: "sample-2",
      question: "Will Dune: Part Two win Best Picture at 2025 Oscars?",
      venue: "POLY",
      price: 0.58,
      smartSide: "YES",
      sharpAlignment: 0.87,
      sharpAlignmentBreakdown: { yesCount: 5, noCount: 2, totalSharps: 7 },
      walletCounts: { yesSharps: 5, noSharps: 2 },
      netFlow: "+3 wallets / 4h",
      signalTag: "ANOMALY",
    },
    {
      id: "sample-3",
      question: "Will Stranger Things Season 5 premiere before June 2025?",
      venue: "POLY",
      price: 0.42,
      smartSide: "YES",
      sharpAlignment: 0.91,
      sharpAlignmentBreakdown: { yesCount: 8, noCount: 1, totalSharps: 9 },
      walletCounts: { yesSharps: 8, noSharps: 1 },
      netFlow: "+7 wallets / 1h",
      signalTag: "PRE-MOVE",
    },
    {
      id: "sample-4",
      question: "Will Beyoncé release a new album in 2025?",
      venue: "POLY",
      price: 0.65,
      smartSide: "YES",
      sharpAlignment: 0.82,
      sharpAlignmentBreakdown: { yesCount: 6, noCount: 2, totalSharps: 8 },
      walletCounts: { yesSharps: 6, noSharps: 2 },
      netFlow: "+4 wallets / 5h",
      signalTag: "NORMAL",
    },
  ];

  const sampleEvents: SignalEvent[] = [
    {
      time: formatTime(new Date(now.getTime() - 300000)),
      text: "SHARP POSITION",
      detail: " / POLY-ETH-VOL / ",
      highlight: "+$47K",
      color: "#4a9eb8",
      highlightColor: "#ff8800",
    },
    {
      time: formatTime(new Date(now.getTime() - 240000)),
      text: "CLUSTER EXPANSION",
      detail: " / 3 → 5 WALLETS",
      highlight: "",
      color: "#4a9eb8",
    },
    {
      time: formatTime(new Date(now.getTime() - 180000)),
      text: "WALLET SYNC DETECTED",
      detail: " / 0x2E8F… ⇄ 0x7A1B…",
      highlight: "",
      color: "#00d9ff",
    },
  ];

  return {
    markets: sampleMarkets,
    signalEvents: sampleEvents,
  };
}

