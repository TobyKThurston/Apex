# Architecture Documentation

## Overview

This document explains the technical architecture of Apex Terminal, designed to help developers understand how the system works.

## System Architecture

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ HTTP Request
         ▼
┌─────────────────────────────────┐
│      Next.js App Router         │
│  ┌───────────────────────────┐  │
│  │   Server Components       │  │
│  │   (app/dashboard/page.tsx)│  │
│  └───────────┬───────────────┘  │
│              │                   │
│              │ Calls             │
│              ▼                   │
│  ┌───────────────────────────┐  │
│  │   Data Layer              │  │
│  │   (lib/dashboard-data.ts) │  │
│  └───────────┬───────────────┘  │
└──────────────┼──────────────────┘
               │
               │ API Calls
               ▼
┌──────────────────────────────┐
│      Dome API                │
│  (External Service)          │
└──────────────────────────────┘
```

## Component Architecture

### Server Components vs Client Components

**Server Components** (`app/dashboard/page.tsx`):
- Run on the server (Node.js)
- Can directly access environment variables
- Can make API calls without exposing keys
- Cannot use browser APIs (useState, useEffect, etc.)
- Faster initial page load

**Client Components** (`app/dashboard/dashboard-client.tsx`):
- Run in the browser
- Can use React hooks (useState, useEffect)
- Can handle user interactions
- Cannot access environment variables directly
- Receive data as props from server components

### Data Flow

1. **User visits `/dashboard`**
   - Browser requests the page
   - Next.js renders server component

2. **Server Component fetches data**
   - Calls `getDashboardData()`
   - Fetches markets from Dome API
   - Fetches prices for each market
   - Computes analytics

3. **Data passed to Client Component**
   - Server component passes data as props
   - Client component receives initial data
   - Client component handles UI interactions

4. **Auto-refresh**
   - Client component uses `useEffect` to refresh
   - Makes new request every 15 seconds
   - Updates UI with new data

## Key Concepts

### TypeScript Types

TypeScript provides type safety. Example:

```typescript
interface MarketRow {
  id: string;
  price: number;
  venue: Venue; // "POLY" | "KAL"
}
```

This ensures:
- `id` is always a string
- `price` is always a number
- `venue` can only be "POLY" or "KAL"

### Async/Await

JavaScript's way of handling asynchronous operations:

```typescript
// Old way (callbacks)
fetchData((error, data) => {
  if (error) {
    // handle error
  } else {
    // use data
  }
});

// Modern way (async/await)
try {
  const data = await fetchData();
  // use data
} catch (error) {
  // handle error
}
```

### Promise.all()

Runs multiple async operations in parallel:

```typescript
// Sequential (slow)
const market1 = await fetchMarket(1);
const market2 = await fetchMarket(2);
const market3 = await fetchMarket(3);

// Parallel (fast)
const [market1, market2, market3] = await Promise.all([
  fetchMarket(1),
  fetchMarket(2),
  fetchMarket(3)
]);
```

## File Structure Explained

### `/app` - Next.js App Router

- **`app/page.tsx`**: Homepage (landing page)
- **`app/dashboard/page.tsx`**: Server component for dashboard
- **`app/dashboard/dashboard-client.tsx`**: Client component for dashboard UI
- **`app/api/`**: API routes (endpoints)

### `/lib` - Core Logic

- **`lib/dashboard-data.ts`**: Main data fetching and processing
- **`lib/dome.ts`**: Dome API client setup
- **`lib/types.ts`**: TypeScript type definitions
- **`lib/supabase.ts`**: Supabase client (optional)

### `/public` - Static Assets

- Images, icons, fonts
- Served directly by Next.js
- Accessible at `/filename.svg`

## API Integration

### Dome API Client

Located in `lib/dome.ts`:

```typescript
// Creates a singleton client instance
export const domeClient = new DomeClient({
  apiKey: domeApiKey,
});
```

**Why singleton?**
- Reuses connection
- More efficient
- Single source of truth

### Error Handling

Three levels of error handling:

1. **Try/Catch blocks**: Catch errors in async functions
2. **Fallback values**: Use defaults when API fails
3. **User feedback**: Show "DATA FEED OFFLINE" message

## Performance Optimizations

### 1. Server-Side Rendering (SSR)

- Data fetched on server
- HTML sent to browser immediately
- Faster initial load

### 2. Parallel API Calls

```typescript
// Fetch all prices in parallel
await Promise.all(
  markets.map(market => fetchPrice(market))
);
```

### 3. Filtering

- Only fetch prices for markets we'll show
- Filter out invalid data early
- Reduce processing

### 4. Memoization

- React.memo for components
- useMemo for expensive calculations
- Prevents unnecessary re-renders

## Security Considerations

### Environment Variables

- Never commit `.env.local` to git
- API keys only on server
- Client never sees API keys

### API Rate Limiting

- Dome API has rate limits
- Free tier: 1 request/second
- Consider implementing queuing

### Input Validation

- Validate API responses
- Handle unexpected data shapes
- Type checking with TypeScript

## Future Improvements

1. **Caching**: Cache API responses
2. **Error Recovery**: Retry failed requests
3. **Loading States**: Better UX during fetches
4. **WebSockets**: Real-time updates
5. **Database**: Store historical data
