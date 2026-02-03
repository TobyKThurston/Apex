# Dome API Integration Guide

This document explains how to adjust the Dome SDK integration based on the actual API methods available.

## Current Implementation

The dashboard data fetching code (`lib/dashboard-data.ts`) uses a flexible approach that tries multiple common SDK patterns. You may need to adjust the method calls based on your actual Dome SDK API.

## Key Files

- `lib/dome.ts` - Singleton Dome client instance
- `lib/dashboard-data.ts` - Data fetching and transformation logic
- `lib/types.ts` - TypeScript types for dashboard data
- `app/dashboard/page.tsx` - Server component that fetches data
- `app/dashboard/dashboard-client.tsx` - Client component that renders the UI

## Adjusting SDK Method Calls

### Fetching Markets

In `lib/dashboard-data.ts`, the `fetchMarketsForVenue()` function tries these patterns:

1. `domeClient.markets.list({ venue, status: "active", limit: 50 })`
2. `domeClient.getMarkets({ venue })`
3. `domeClient.listMarkets({ venue })`

**To adjust:** Update the function to use the actual method name from your Dome SDK. Check the SDK documentation or inspect `domeClient` to see available methods.

### Fetching Wallet Analytics

The `getWalletAnalytics()` function tries these patterns:

1. `domeClient.markets.analytics(marketId)`
2. `domeClient.getMarketAnalytics(marketId)`
3. `domeClient.getWalletPositions(marketId)`

**To adjust:** Update based on your SDK's actual method for getting wallet positions/analytics per market.

### Expected Response Formats

The code expects market objects with fields like:
- `id` or `marketId` or `slug`
- `question` or `title` or `name`
- `venue` or `platform`
- `price` or `yesPrice` or `probability`

The code handles multiple field name variations, but you may need to adjust based on your actual API response.

## Environment Setup

1. Add your Dome API key to `.env.local`:
   ```
   DOME_API_KEY=sk_your_api_key_here
   ```

2. The key is read server-side only (never exposed to the browser)

## Testing

1. Start the dev server: `npm run dev`
2. Visit `/dashboard`
3. Check the browser console and server logs for any SDK method errors
4. Adjust the method calls in `lib/dashboard-data.ts` based on errors

## Error Handling

- If `DOME` env var is missing, the app will show "DATA FEED OFFLINE"
- If API calls fail, markets will be empty but the UI won't crash
- Check server logs for detailed error messages

