# Fixing 401 Unauthorized Error

## The Problem
You're getting `401 Unauthorized - Invalid bearer token` even though your API key is correct.

## The Solution
Next.js caches environment variables. When you change `.env.local`, you need to clear the cache.

## Steps to Fix

1. **Stop your dev server** (Ctrl+C)

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

4. **Check the logs** - you should now see:
   ```
   [Dome] API Key loaded: 36 chars, prefix: 1e31480f-cbf4-4...
   [Dome] Response status: 200 OK
   ```

## Why This Happens
Next.js compiles and caches your code including environment variables. When you update `.env.local`, the old cached values are still being used until you clear the `.next` folder.

## Verify It's Working
After restarting, visit `/dashboard` and check:
- Server logs show `200 OK` responses
- Markets appear in the dashboard
- No more 401 errors

If you still see 401 errors after clearing cache and restarting, check:
- `.env.local` has `DOME_API_KEY=1e31480f-cbf4-4267-926f-b5ef36af0392` (no quotes)
- No extra spaces or newlines
- Server was fully stopped before restarting

