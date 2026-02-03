import { DomeClient } from '@dome-api/sdk';

// Get and clean the API key (remove quotes if present)
// IMPORTANT: Next.js caches env vars. If you change .env.local, you MUST:
// 1. Stop the dev server
// 2. Run: rm -rf .next
// 3. Restart: npm run dev
const rawApiKey = process.env.DOME_API_KEY;
export const domeApiKey = rawApiKey?.replace(/^["']|["']$/g, '').trim();

if (!domeApiKey) {
  throw new Error("Missing DOME_API_KEY environment variable. Please add DOME_API_KEY=your-api-key to your .env.local file");
}

// Debug: Log API key info (first few chars only for security)
// API key format is UUID: 1e31480f-cbf4-4267-926f-b5ef36af0392
console.log(`[Dome] API Key loaded: ${domeApiKey.length} chars, prefix: ${domeApiKey.substring(0, Math.min(15, domeApiKey.length))}...`);

// Base URL for Dome API (from docs: https://docs.domeapi.io/)
export const DOME_API_BASE_URL = "https://api.domeapi.io/v1";

// Create and export a singleton DomeClient instance
// This will be reused across all API calls
export const domeClient = new DomeClient({
  apiKey: domeApiKey,
});

console.log(`[Dome] SDK client initialized successfully`);

