// Quick test script to inspect Dome SDK
// Run with: node scripts/test-dome.js

const { DomeClient } = require('@dome-api/sdk');

// Use a test key (will fail but shows structure)
const client = new DomeClient({
  apiKey: process.env.DOME || 'test_key',
});

console.log('\n=== Dome Client Structure ===');
console.log('Client keys:', Object.keys(client));
console.log('Client type:', typeof client);

console.log('\n=== Polymarket ===');
console.log('polymarket type:', typeof client.polymarket);
if (client.polymarket) {
  console.log('polymarket keys:', Object.keys(client.polymarket));
  console.log('polymarket methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client.polymarket)));
}

console.log('\n=== Kalshi ===');
console.log('kalshi type:', typeof client.kalshi);
if (client.kalshi) {
  console.log('kalshi keys:', Object.keys(client.kalshi));
  console.log('kalshi methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client.kalshi)));
}

console.log('\n=== Matching Markets ===');
console.log('matchingMarkets type:', typeof client.matchingMarkets);
if (client.matchingMarkets) {
  console.log('matchingMarkets keys:', Object.keys(client.matchingMarkets));
}

