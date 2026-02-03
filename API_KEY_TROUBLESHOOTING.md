# API Key Troubleshooting

## Current Error: "Unauthorized - Invalid bearer token"

This error means the API key is being read, but it's being rejected by the Dome API.

## Common Issues & Fixes

### 1. **Quotes in .env.local** ❌
**Wrong:**
```
DOME_API_KEY="sk_abc123"
```

**Right:**
```
DOME_API_KEY=sk_abc123
```

Remove any quotes around the API key value!

### 2. **Placeholder Value** ❌
If you see `DOME_API_KEY="code"` or `DOME_API_KEY=code`, you need to replace it with your actual API key from Dome.

### 3. **Wrong Format** ❌
Dome API keys typically start with `sk_`. Make sure you're using the correct key format.

### 4. **Invalid/Expired Key** ❌
The key might be:
- Incorrect (copy-paste error)
- Expired
- Revoked
- Not activated yet

## How to Fix

1. **Check your .env.local file:**
   ```bash
   cat .env.local
   ```

2. **Make sure it looks like this (no quotes, actual key):**
   ```
   DOME_API_KEY=sk_your_actual_api_key_here
   ```

3. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

4. **Check the logs:**
   Look for `[Dome]` messages in your terminal. The code now shows:
   - API key prefix (first 10 chars)
   - API key length
   - Warnings if it detects placeholder values

## Verify Your Key

1. Visit `/api/debug-dome` to see:
   - If the key is being read
   - The key prefix (first 10 chars)
   - SDK structure

2. Check server logs for `[Dome]` messages showing what's happening

## Still Not Working?

- Double-check you copied the entire API key (no truncation)
- Verify the key is active in your Dome dashboard
- Make sure there are no extra spaces or newlines in `.env.local`
- Try regenerating the API key in your Dome account

