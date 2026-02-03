# Testing Dome API Integration

## Quick Test Steps

1. **Check if API key is set:**
   ```bash
   # Make sure .env.local exists and has:
   DOME_API_KEY=sk_your_api_key_here
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Check the debug endpoint:**
   Visit: http://localhost:3000/api/debug-dome
   
   This will show you:
   - Whether the API key is set
   - What methods are available on the Dome client
   - Any test results from trying to call the API

4. **Check server logs:**
   When you visit `/dashboard`, check your terminal/console for logs prefixed with `[Dome]`. These will show:
   - Which methods are being called
   - What responses are received
   - Any errors that occur

5. **Test the dashboard:**
   Visit: http://localhost:3000/dashboard
   
   You should see:
   - Markets table populated with data (if API is working)
   - "No markets available" if API calls are failing
   - "DATA FEED OFFLINE" if API key is missing

## Common Issues

### "No markets available"
- Check server logs for `[Dome]` messages
- Verify API key is correct in `.env.local`
- Check `/api/debug-dome` to see SDK structure
- The SDK methods might need adjustment in `lib/dashboard-data.ts`

### "DATA FEED OFFLINE"
- Make sure `.env.local` exists
- Make sure `DOME_API_KEY=sk_...` is set in `.env.local`
- Restart the dev server after adding the key

### Empty markets array
- The API might be returning data in a different format
- Check server logs to see the response structure
- Adjust the data extraction logic in `fetchMarketsForVenue()`

## Debugging Tips

1. **Check server console logs** - All Dome API calls are logged with `[Dome]` prefix
2. **Use the debug endpoint** - `/api/debug-dome` shows SDK structure
3. **Inspect responses** - Logs show response structure and data length
4. **Test with mock data** - If API fails, the code falls back gracefully

## Expected SDK Structure

Based on inspection, the Dome SDK has:
- `domeClient.polymarket.markets.getMarkets()`
- `domeClient.kalshi.markets.getMarkets()`

The code now uses these methods. If your SDK version differs, adjust `lib/dashboard-data.ts` accordingly.

